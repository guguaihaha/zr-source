Zr.add("./zrModules/page",function(zr,$){
    var page = function(total_number, opts,dom){
        opts = $.extend({
            items_per_page:10,//每页显示多少个
            num_display_entries:5,//显示多少个翻页按钮
            current_page:0, //从第几页开始
            num_edge_entries:1,
            link_to:"javascript:;",
            first_text: "",
            last_text: "",
            prev_text:" ",
            next_text:" ",
            ellipse_text:"...",
            prev_show_always:true,//是否显示上一页
            next_show_always:true,//是否显示下一页
            page_callback:function(){return false;},
            selected_page_callback:function(){return false;},
            select_page:false,//判断是否有页数选择框，默认为false，设置为true的时候出现选择框
            jump:false, //判断是否有跳转，默认为false，设置为true的时候出现跳转
            total:false, //是否显示总数，默认false，设置为true时显示总数
            complete:true, //完整版本，默认true，设置为false时不显示
            simple:false, //简单版本，默认false，设置为true时显示
            mini:false,//迷你版本，默认false，设置为true时显示
            select_value_status:false //select框选择的每页条数是否更新
        },opts||{});
        var domArr=zr.dom.find(dom),
            page_select_fix;
        //判断是否有缓存，没有缓存就存session，用于记录下拉框list的页数
        if(opts.select_page){
            if(sessionStorage.getItem("page_select_fix_"+$(domArr).eq(0).attr("class"))==null){
                sessionStorage.setItem("page_select_fix_"+$(domArr).eq(0).attr("class"),opts.items_per_page)
            }else{
                if(opts.select_value_status){
                    sessionStorage.setItem("page_select_fix_"+$(domArr).eq(0).attr("class"),opts.items_per_page)
                }
            }
            page_select_fix=sessionStorage.getItem("page_select_fix_"+$(domArr).eq(0).attr("class"));
        }
        if(domArr.length==0){
            return false;
        }else{
            return $.each(domArr,function(index,elem){
                /**
                 * 计算出有几页
                 */
                function numPages() {
                    return Math.ceil(total_number/opts.items_per_page);
                }

                /**
                 * 计算分页链接的起始点和结束点
                 */
                function getInterval()  {
                    var ne_half = Math.ceil(opts.num_display_entries/2);
                    var np = numPages();
                    var upper_limit = np-opts.num_display_entries;
                    var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
                    var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
                    return [start,end];
                }

                /**
                 * 这是分页链接的事件处理函数
                 */
                function pageSelected(page_id, evt){
                    current_page = page_id;
                    drawLinks();
                    var continuePropagation = opts.page_callback(page_id, panel);
                    if (!continuePropagation) {
                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                        }
                        else {
                            evt.cancelBubble = true;
                        }
                    }
                    return continuePropagation;
                }
                function  selectPage(evt) {

                    if($(this).find("ul").css("display")=="block"){
                        $(this).find("ul").hide();
                    }else if($(this).find("ul").css("display")=="none"){
                        //先判断select显示出来是不是会超出屏幕底部
                        var top=$(this).offset().top,
                            height=$(this).find("ul").height(),
                            clientHeight=$(window).height(),
                            documentTop=$(document).scrollTop();
                        var ht=clientHeight-(top-documentTop)-$(this).height();
                        ht=parseInt(Math.abs(ht));
                        if(ht<parseInt(height)){
                            //到可视窗口底部距离要小于下拉框的距离，此时下拉框要朝上
                            $(this).find("ul").css({
                                top:"-"+(parseInt(height)+5)+"px"
                            })
                        }else{
                            $(this).find("ul").css({
                                top:"32px"
                            })
                        }
                        $(this).find("ul").show();
                    }
                    $(this).find("li").off("click").on("click",function (e) {
                        var e=e||window.event;
                        e.stopPropagation();
                        var value=$(this).find("span").text();
                        $(this).parents(".zr-page-select").find("ul").hide();
                        // 判断是否相等，相等的话不渲染翻页组件
                        if($(this).parents(".zr-page-select").find("strong").text()!=value){
                            var total=(current_page+1)*opts.items_per_page;
                            opts.items_per_page=parseInt(value);
                            // 计算出切换后的总页数
                            var totalAfter=numPages();
                            var num=Math.ceil(total/opts.items_per_page);
                            current_page=num-1;
                            drawLinks();
                            //current_page代表切换每页条数之后重新计算的当前页数，opts.items_per_page代表切换的每页多少条，panel为当前调用的dom节点
                            var switchPage = opts.selected_page_callback(current_page,opts.items_per_page,panel);
                            if (!switchPage) {
                                if (evt.stopPropagation) {
                                    evt.stopPropagation();
                                }
                                else {
                                    evt.cancelBubble = true;
                                }
                            }
                            return switchPage;
                        }
                        $(this).parents(".zr-page-select").find("strong").text(value);

                    })
                }
                /**
                 * 将分页链接插入到容器元素中。
                 */
                function drawLinks() {
                    var interval = getInterval();
                    var np = numPages();
                    var getClickHandler = function(page_id) {
                        return function(evt){ return pageSelected(page_id,evt); }
                    }
                    // 用于生成单个链接的函数(如果是当前页，则为span标记,如果是首页和尾页的时候，相对应标签变为span)
                    // 完整翻页
                    if(opts.complete){
                        panel.empty();
                        var pageCommon="<div class='zr-page-common zr-complete-page'></div>";
                        panel.append(pageCommon);
                        var appendItem = function(page_id, appendopts){
                            page_id = page_id<0?0:(page_id<np?page_id:np-1); // 避免出现小于0的情况,规范页码
                            appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
                            if(page_id == current_page){
                                var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
                            }
                            else
                            {
                                var lnk = $("<a>"+(appendopts.text)+"</a>")
                                    .bind("click", getClickHandler(page_id))
                                    .attr('href', opts.link_to.replace(/__id__/,page_id));
                            }
                            if(appendopts.classes){lnk.addClass(appendopts.classes);}
                            $(panel).find(".zr-page-common").append(lnk);
                        }
                        if (opts.first_text && (current_page > 0 || opts.prev_show_always)) {
                            appendItem(0, { text: opts.first_text, classes: "prev disabled" });
                        }
                        if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                            appendItem(current_page-1,{text:opts.prev_text, classes:"prev zricon-arrow-left"});
                        }
                        if (interval[0] > 0 && opts.num_edge_entries > 0)
                        {
                            var end = Math.min(opts.num_edge_entries, interval[0]);
                            for(var i=0; i<end; i++) {
                                appendItem(i);
                            }
                            if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
                            {
                                $("<span class='ellipse'><i>"+opts.ellipse_text+"</i></span>").appendTo($(panel).find(".zr-complete-page"));
                            }
                        }
                        for(var i=interval[0]; i<interval[1]; i++) {
                            appendItem(i);
                        }
                        if (interval[1] < np && opts.num_edge_entries > 0)
                        {
                            if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
                            {
                                $("<span class='ellipse'><i>"+opts.ellipse_text+"</i></span>").appendTo($(panel).find(".zr-complete-page"));
                            }
                            var begin = Math.max(np-opts.num_edge_entries, interval[1]);
                            for(var i=begin; i<np; i++) {
                                appendItem(i);
                            }

                        }
                        if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                            appendItem(current_page+1,{text:opts.next_text, classes:"next zricon-arrow-right"});
                        }
                        if (opts.last_text && (current_page < np - 1 || opts.next_show_always)) {
                            appendItem(np, { text: opts.last_text, classes: "prev disabled" });
                        }
                        /****************** Added ***************/
                        if(opts.total){
                            // 插入最大页数
                            var totals="<span class='zr-total-page'>共"+total_number+"条</span>"
                            $(panel).find(".zr-page-common").before(totals);
                        }

                        /*插入一个文本框，用户输入并回车后进行跳转*/
                        if(opts.jump){
                            var searchRandom=new Date().getTime();
                            var pagetext = '<div class="zr-jump-text">第<input class="pagevalue" size="1" value="'+(current_page+1)+'"type="text">页</div>';
                            $(pagetext).appendTo($(panel).find(".zr-page-common"));
                            $(panel).find(".pagevalue").unbind("keyup").bind("keyup",function (evt) {
                                var evt=evt|| window.event;
                                if(evt.keyCode=="13"){
                                    var iPageNum = $.trim($(this).val()) -1;
                                    if(iPageNum<np){pageSelected(iPageNum,evt);}else{alert("超过最大页数");}
                                }
                            })
                        }
                        if(opts.select_page){
                            /*插入一个下拉框，可以动态选择每一页都多少条数*/
                            var pageNumber='<div class="zr-page-select"><p><span><strong>'+opts.items_per_page+'</strong>条<i>/</i>页</span><i class="zricon-angle-down"></i></p>';
                            pageNumber+='<ul><li><span>'+page_select_fix+'</span>条<i>/</i>页</li><li><span>'+page_select_fix*2+'</span>条<i>/</i>页</li><li><span>'+page_select_fix*3+'</span>条<i>/</i>页</li><li><span>'+page_select_fix*4+'</span>条<i>/</i>页</li></ul></div>';
                            $(panel).find(".next").after($(pageNumber));
                            $(panel).find(".zr-page-select").bind("click",selectPage);
                            // $(pageNumber).appendTo(panel);
                        }
                        /****************** 添加节点结束 ******************/
                    }
                    // 简单翻页
                    if(opts.simple){
                        panel.empty();
                        var pageCommon="<div class='zr-page-common zr-simple-page'></div>";
                        $(panel).append(pageCommon);
                        var appendItem = function(page_id, appendopts){
                            page_id = page_id<0?0:(page_id<np?page_id:np-1); // 避免出现小于0的情况,规范页码
                            appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
                            if(page_id == current_page){
                                var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
                            }
                            else
                            {
                                var lnk = $("<a>"+(appendopts.text)+"</a>")
                                    .bind("click", getClickHandler(page_id))
                                    .attr('href', opts.link_to.replace(/__id__/,page_id));
                            }
                            if(appendopts.classes){lnk.addClass(appendopts.classes);}
                            $(panel).find(".zr-page-common").append(lnk);
                        }
                        if (opts.first_text && (current_page > 0 || opts.prev_show_always)) {
                            appendItem(0, { text: opts.first_text, classes: "prev disabled" });
                        }
                        if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                            appendItem(current_page-1,{text:opts.prev_text, classes:"prev zricon-arrow-left"});
                        }
                        if (interval[0] > 0 && opts.num_edge_entries > 0)
                        {
                            var end = Math.min(opts.num_edge_entries, interval[0]);
                            for(var i=0; i<end; i++) {
                                appendItem(i);
                            }
                            if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
                            {
                                $("<span class='ellipse'><i>"+opts.ellipse_text+"</i></span>").appendTo($(panel).find(".zr-page-common"));
                            }
                        }
                        for(var i=interval[0]; i<interval[1]; i++) {
                            appendItem(i);
                        }
                        if (interval[1] < np && opts.num_edge_entries > 0)
                        {
                            if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
                            {
                                $("<span class='ellipse'><i>"+opts.ellipse_text+"</i></span>").appendTo($(panel).find(".zr-page-common"));
                            }
                            var begin = Math.max(np-opts.num_edge_entries, interval[1]);
                            for(var i=begin; i<np; i++) {
                                appendItem(i);
                            }

                        }
                        if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                            appendItem(current_page+1,{text:opts.next_text, classes:"next zricon-arrow-right"});
                        }
                        if (opts.last_text && (current_page < np - 1 || opts.next_show_always)) {
                            appendItem(np, { text: opts.last_text, classes: "prev disabled" });
                        }
                        /****************** 添加结束 ***************/
                        if(opts.total){
                            // 插入最大页数
                            var totals="<span class='zr-total-page'>共"+total_number+"条</span>"
                            $(panel).find(".zr-page-common").before(totals);
                        }

                        /*插入一个文本框，用户输入并回车后进行跳转*/
                        if(opts.jump){
                            var searchRandom=new Date().getTime();
                            var pagetext = '<div class="zr-jump-text">第<input class="pagevalue" size="1" value="'+(current_page+1)+'"type="text">页</div>';
                            // var toPage='<span class="jump"><a id="search'+searchRandom+'"href="#">跳转</a></span>';
                            $(pagetext).appendTo($(panel).find(".zr-page-common"));
                            // $(toPage).appendTo($(panel).find(".page-common"));
                            // $("#search"+searchRandom).unbind("click").bind("click",function(evt){
                            //     var iPageNum = $.trim($(this).parents(".pagination").find(".pagevalue").val()) -1;
                            //     if(iPageNum<np){pageSelected(iPageNum,evt);}else{alert("超过最大页数");}
                            // });
                            $(panel).find(".pagevalue").unbind("keyup").bind("keyup",function (evt) {
                                var evt=evt|| window.event;
                                if(evt.keyCode=="13"){
                                    var iPageNum = $.trim($(this).val()) -1;
                                    if(iPageNum<np){pageSelected(iPageNum,evt);}else{alert("超过最大页数");}
                                }
                            })
                        }
                        if(opts.select_page){
                            /*插入一个下拉框，可以动态选择每一页都多少条数*/
                            var pageNumber='<div class="zr-page-select"><p><span><strong>'+opts.items_per_page+'</strong>条<i>/</i>页</span><i class="zricon-angle-down"></i></p>';
                            pageNumber+='<ul><li><span>10</span>条<i>/</i>页</li><li><span>20</span>条<i>/</i>页</li><li><span>30</span>条<i>/</i>页</li></ul></div>';
                            $(panel).find(".next").after($(pageNumber));
                            $(panel).find(".zr-page-select").bind("click",selectPage);
                            // $(pageNumber).appendTo(panel);
                        }
                        /****************** 添加节点结束 ******************/
                    }
                    // mini翻页
                    if(opts.mini){
                        panel.empty();
                        var pageCommon="<div class='zr-page-common zr-mini-page'></div>";
                        $(panel).append(pageCommon);
                        var appendItem = function(page_id, appendopts){
                            page_id = page_id<0?0:(page_id<np?page_id:np-1); // 避免出现小于0的情况,规范页码
                            appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
                            if(page_id == current_page){
                                var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
                            }
                            else
                            {
                                var lnk = $("<a>"+(appendopts.text)+"</a>")
                                    .bind("click", getClickHandler(page_id))
                                    .attr('href', opts.link_to.replace(/__id__/,page_id));
                            }
                            if(appendopts.classes){lnk.addClass(appendopts.classes);}
                            $(panel).find(".zr-page-common").append(lnk);
                        }
                        if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                            appendItem(current_page-1,{text:opts.prev_text, classes:"prev zricon-arrow-left"});
                        }
                        var pagetext = '<div class="zr-mini-text"><input class="pagevalue" size="1" value="'+(current_page+1)+'"type="text"><i>/</i>'+total_number+'</div>';
                        $(pagetext).appendTo($(panel).find(".zr-page-common"));
                        if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                            appendItem(current_page+1,{text:opts.next_text, classes:"next zricon-arrow-right"});
                        }

                    }
                }

                // 从选项中提取current_page
                var current_page = opts.current_page;
                total_number = (!total_number || total_number < 0)?1:total_number;
                opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
                // 指针凝固dom节点
                var panel = $(this);
                // 给dom节点添加相对应的函数
                //selectPage = function(page_id){ pageSelected(page_id);}
                prevPage = function(){
                    if (current_page > 0) {
                        pageSelected(current_page - 1);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                nextPage = function(){
                    if(current_page < numPages()-1) {
                        pageSelected(current_page+1);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                //渲染翻页
                drawLinks();
            })
        }
    }
    return {
        init:page
    }
},{requires:["jquery"]})
Zr.add("./datePicker/index",function(zr,$,moment,c){
    var language = zr.baseConfig.language;
    zr.fn = zr.fn ? zr.fn :{};
    if(!zr.fn.datePicker){
        zr.fn.datePicker = {
            month:{}
        }
    }
    //
    var datePicker = {
        init:function(config){
            var _this = this;
            var defaults = {
                //语言
                language:language,
                //语言的配置信息存储位置
                languageConfig:{},
                //触发的目标元素
                target:"",
                //自动偏移设置
                autoOffset:{
                    x:0,
                    y:0
                },
                //是否按照设定自动关闭,关闭自动关闭将会开启底部工具栏，无论底部工具栏是否开启都将显示
                autoClose:true,
                //是否显示底部工具栏
                showBtnTools:true,
                //最大的日期时间格式
                maxDate:"9999-12-31 23:59:59",
                //最小的日期时间格式
                minDate:"0001-01-01 00:00:00",
                /**
                * @Author: zhangjinglin
                * @Email: zhangjinglin@jd.com
                * @Date: Created in 2018/5/11 下午4:59
                * @Description:日期选择器
                * @params <String> year
                * @paramsDescription  年选择器 ;
                * @params <String> month(默认)
                * @paramsDescription  年月选择器(默认) ;
                * @params <String> time
                * @paramsDescription  时间选择器 ;
                * @params <String> datetime
                * @paramsDescription  日期时间选择器 ;
                * @params <String> range
                * @paramsDescription  区间选择日期控件 ;
                */
                type:"datetime",
                //格式化类型
                format:"",
                //初始化日期
                initialDate:new Date(),
                //当type为range,rangeDate
                rangeDate:"",
                //初始化moment
                _moment:moment(this.initialDate),
                //是否显示日期与时间tab切换
                isTabSwitch:true,
                //打开回调
                onOpen:function(){},
                //选中回调
                onSelect:function(){},
                //确定回调
                onSure:function(){},
                //关闭回调
                onClose:function(){},
                //清除回调
                onClear:function(){}
            }
            var options = $.extend(true,defaults,config);
            //存储配置信息
            $(options.target).data("options",options);
            //
            if(!options.format){
                switch(options.type){
                    case "datetime":
                        options.format = "YYYY-MM-DD HH:mm:ss";
                    break;
                    case "week":
                        // options.format = "YYYY-WW";
                    break;
                    case "normal":
                        options.format = "YYYY-MM-DD";
                    break;
                    case "year":
                        options.format = "YYYY";
                    break;
                    case "month":
                        options.format = "YYYY-MM";
                    break;
                    case "range":
                        options.format = "YYYY-MM-DD HH:mm:ss";
                    break;

                }
            }
            //
            if(!options.target){
                options.target = _this;
                new datePicker.eventsFn.useLoader(options);
            }else{
                $(options.target).off("click").on("click",function(ev){
                    ev.stopPropagation();
                    var _options = $(this).data("options");
                    _options.target = this;
                    //
                    if(_options.type == "range"){
                        var $n1 = $(this).find(".zr-datepicker-range-start"),
                            $n2 = $(this).find(".zr-datepicker-range-end"),
                            _v1 = $n1[0].nodeName.toLowerCase(),
                            _v2 = $n2[0].nodeName.toLowerCase(),
                            _val1 = "",
                            _val2 = "";

                            if(_v1 == "input" || _v1 == "textarea"){
                                _val1 = $n1.val();
                            }else{
                                _val1 = $n1.text();
                            }
                            if(_v2 == "input" || _v2 == "textarea"){
                                _val2 = $n2.val();
                            }else{
                                _val2 = $n2.text();
                            }
                        _val1 = _val1.trim();
                        _val2 = _val2.trim();
                        if(_val1 && _val2){
                            if((new Date(_val1)).getTime() > (new Date(_val2)).getTime()){
                                var _t = _val1;
                                _val1 = _val2;
                                _val2 = _t;
                            }
                        }

                        if(_val1){
                            _options.initialDate = _val1;
                            _options._moment = moment(_options.initialDate);
                        }

                        if(_val2){
                            _options.rangeDate = moment(_val2);
                        }

                        if(!_val2 && !_options.rangeDate){
                            _options.rangeDate = moment(_options.initialDate).add(1,'month')
                        }
                        $(this).data("options",_options);

                    }else{
                        var nodeName = this.nodeName.toLowerCase();
                        var val = "";

                        if(nodeName == "input" || nodeName == "textarea"){
                            val = $(this).val();
                        }else{
                            val = $(this).text();
                        }
                        val = val.trim();
                        //
                        //
                        $(this).data("options",_options);
                        if(val){
                            _options.initialDate = val;
                            _options._moment = moment(_options.initialDate);
                        }
                    }
                    new datePicker.eventsFn.useLoader(_options);
                })
            }
            //


                zr.dom.resizeQueen.push(function(){
                    var $datepicker = $(".zr-datepicker-wrap");
                    if($datepicker.length >= 1){
                        $datepicker.each(function(){
                            datePicker.eventsFn.resetPosition.call(this,options);
                        })
                    }
                })



        },
        options:{
            //获取range取件数值
            rets:[],
            //是否开始区间默认选择
            rangeDefault:0,
            //当前是否是选中为2
            rangeDefaultChoose:2

            //
        },
        events:{
            //公共方法
            init:function(pickerDom){
                //
                this.headerEvent(pickerDom);
                this.dateEvent(pickerDom);
                this.footerEvent(pickerDom);
            },
            //头部事件
            headerEvent:function(dom){
                var $dom = $(dom),
                    $tabs = $dom.find(".zr-datepicker-tabs .zr-datepicker-tab");
                $tabs.off("click").on("click",function(){
                    if(!$(this).hasClass("zr-datepicker-tab-selected")){
                        $tabs.removeClass("zr-datepicker-tab-selected");
                        $(this).addClass("zr-datepicker-tab-selected");
                        $dom.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                        $dom.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        //
                        if($(this).hasClass("zr-datepicker-tab-date")){
                            $dom.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                            $dom.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                            //加载日期
                        }else{
                            $dom.find(".zr-datepicker-header-time").addClass("zr-datepicker-header-show");
                            $dom.find(".zr-datepicker-content-time").addClass("zr-datepicker-content-show");
                            //加载时间
                            datePicker.eventsFn.timeReloadFn.call(this);
                        }
                    }
                })

            },
            rangeTabsEvent:function(dom){
                var $dom = $(dom),
                    $tabs = $dom.find(".zr-datepicker-tabs"),
                    $tab = $tabs.find(".zr-datepicker-tab"),
                    $range = $dom.find(".zr-datepicker-content-range");
                $tabs.find(".zr-datepicker-tab").off("click").on("click",function(){
                    if(!$(this).hasClass("zr-datepicker-tab-selected")){
                        $tab.removeClass("zr-datepicker-tab-selected");
                        $(this).addClass("zr-datepicker-tab-selected");
                        $dom.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                        $dom.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        //
                        if($(this).hasClass("zr-datepicker-tab-date")){
                            $dom.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                            $dom.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                            //加载日期
                        }else{
                            $dom.find(".zr-datepicker-header-time").addClass("zr-datepicker-header-show");
                            $dom.find(".zr-datepicker-content-time").addClass("zr-datepicker-content-show");
                            //加载时间
                            datePicker.eventsFn.rangeTimeReloadFn.call(dom);
                        }
                    }
                })
            },
            //日期区域事件
            dateEvent:function(dom){
                var $dom = $(dom);
                //
                var $col = $dom.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-col"),
                    $dateHeader = $dom.find(".zr-datepicker-header-date");
                //具体日期选择
                $col.off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target),
                        key = $(this).attr("data-time"),
                        index = $(this).attr("data-index"),
                        _moments = zr.fn.datePicker.month[key],
                        _colMoment = _moments[index].moment;
                    //
                    var _moment = $picker.data("moment"),
                        _y = _colMoment.format("YYYY"),
                        _m = _colMoment.format("MM"),
                        _d = _colMoment.format("DD"),
                        _last = _moment.format("HH:mm:ss"),
                        _time = _y + "-" + _m + "-" + _d + " " + _last;
                    _moment = moment(_time);
                    $picker.data("moment",_moment);
                    // //
                    $col.removeClass("zr-datepicker-choose");
                    $(this).addClass("zr-datepicker-choose");
                    var time = _moment.format(options.format);
                    var nodeName = $target[0].nodeName.toLowerCase();
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    //是否自动关闭
                    if(options.autoClose && options.type != "datetime"){
                        //自动关闭
                        datePicker.eventsFn.hidePickerEvent($dom[0]);
                        //赋值到input或者textarea
                        datePicker.eventsFn.insertTextFn($target,time);
                    }
                })
                //上一年
                $dateHeader.find(".zr-datepicker-prev-year").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.yearPageFn.call(this,-1);
                })
                //下一年
                $dateHeader.find(".zr-datepicker-next-year").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.yearPageFn.call(this,1);
                })
                //上一月
                $dateHeader.find(".zr-datepicker-prev-month").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.monthPageFn.call(this,-1);
                })
                //下一月
                $dateHeader.find(".zr-datepicker-next-month").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.monthPageFn.call(this,1);
                })
                //年选择
                $dateHeader.find(".zr-datepicker-date-title .zr-datepicker-year-text").off("click").on("click",datePicker.eventsFn.yearFn);
                //月选择
                $dateHeader.find(".zr-datepicker-date-title .zr-datepicker-month-text").off("click").on("click",datePicker.eventsFn.monthFn);
            },
            //年区域事件
            yearEvent:function(dom){
                var $header = $(dom).find(".zr-datepicker-header-year"),
                    $content = $(dom).find(".zr-datepicker-content-year");
                $header.find(".zr-datepicker-prev-year").off("click").on("click",function(){
                    $header = $(this).closest(".zr-datepicker-header-year");
                    var $picker = $(this).closest(".zr-datepicker-wrap");
                    var index = $header.data("index") || 0;
                    index = parseInt(index);
                    index = index + 1;
                    $header.data("index",index);
                    datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0],index);
                })
                $header.find(".zr-datepicker-next-year").off("click").on("click",function(){
                    $header = $(this).closest(".zr-datepicker-header-year");
                    var $picker = $(this).closest(".zr-datepicker-wrap");
                    var index = $header.data("index") || 0;
                    index = parseInt(index);
                    index = index - 1;
                    $header.data("index",index);
                    datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0],index);
                })
                //选中年的事件
                //首先运行已存在的底部方法
                //延迟绑定公共方法
                datePicker.events.footerEvent(dom)
                $content.find(".zr-datepicker-content-number .zr-datepicker-col-year").off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        _moment = $picker.data("moment");
                    var year = $(this).attr("data-year");
                    _moment = _moment.year(year);
                    $picker.data("moment",_moment);
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    if(options.type == "datetime" || options.type == "normal"){
                        //切回原状态
                        //切换表头区域
                        $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                        $picker.find(".zr-datepicker-header-year").removeClass("zr-datepicker-header-show");
                        //切换内容区域
                        $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        $picker.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                        //重新加载数据
                        datePicker.eventsFn.yearPageFn.call(this,0);
                    }else if(options.type == "year"){
                        $picker.find(".zr-datepicker-col-year").removeClass("zr-datepicker-choose");
                        $(this).addClass("zr-datepicker-choose");
                        //年状态下，自动关闭开启将会触发自动赋值
                        if(options.autoClose){
                            datePicker.eventsFn.insertTextFn($(options.target),_moment.format(options.format));
                            //自动关闭
                            datePicker.eventsFn.hidePickerEvent($picker[0]);
                        }
                    }else if(options.type == "month"){
                        datePicker.eventsFn.montmonthFnhFn.call(this);
                    }else if(options.type == "week"){
                        $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                        $picker.find(".zr-datepicker-header-year").removeClass("zr-datepicker-header-show");
                        //切换内容区域
                        $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        $picker.find(".zr-datepicker-content-week").addClass("zr-datepicker-content-show");
                        //重新加载数据
                        datePicker.eventsFn.yearPageFn.call(this,0);
                    }
                })
            },
            //区域年事件
            yearRangeEvent:function(dom){
                var $header = $(dom).find(".zr-datepicker-header-year"),
                    $content = $(dom).find(".zr-datepicker-content-year");
                $header.find(".zr-datepicker-prev-year").off("click").on("click",function(){
                    $header = $(this).closest(".zr-datepicker-header-year");
                    var $picker = $(this).closest(".zr-datepicker-content-range");
                    var index = $header.data("index") || 0;
                    index = parseInt(index);
                    index = index + 1;
                    $header.data("index",index);
                    datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0],index);
                })
                $header.find(".zr-datepicker-next-year").off("click").on("click",function(){
                    $header = $(this).closest(".zr-datepicker-header-year");
                    var $picker = $(this).closest(".zr-datepicker-content-range");
                    var index = $header.data("index") || 0;
                    index = parseInt(index);
                    index = index - 1;
                    $header.data("index",index);
                    datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0],index);
                })
                //选中年的事件
                //首先运行已存在的底部方法
                //延迟绑定公共方法
                datePicker.events.footerEvent(dom);
                $content.find(".zr-datepicker-content-number .zr-datepicker-col-year").off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range"),
                        $wrap = $picker.closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        _moment = $picker.data("moment");
                    var year = $(this).attr("data-year");
                    _moment = _moment.year(year);
                    $picker.data("moment",_moment);
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));

                    //切回原状态
                    //切换表头区域
                    $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                    $picker.find(".zr-datepicker-header-year").removeClass("zr-datepicker-header-show");
                    //切换内容区域
                    $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                    $picker.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                    //重新加载数据
                    datePicker.eventsFn.yearRangePageFn.call(this,0);
                    datePicker.events.rangeHeaderEvent($wrap[0]);

                })
            },
            //月选中事件
            monthEvent:function(dom){
                var $header = $(dom).find(".zr-datepicker-header-month"),
                    $content = $(dom).find(".zr-datepicker-content-month");

                //选中年的事件
                //
                var $cols = $content.find(".zr-datepicker-content-number .zr-datepicker-col-month");
                //初始化重载头部状态
                $header.find(".zr-datepicker-month-title").off("click").on("click",function(){
                    datePicker.eventsFn.yearFn.call(this);
                })
                //
                $cols.off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        _moment = $picker.data("moment");
                    var month = $(this).attr("data-month") || 0;
                    month = parseInt(month);
                    _moment = _moment.month(month);
                    $picker.data("moment",_moment);
                    $cols.removeClass("zr-datepicker-choose");
                    $(this).addClass("zr-datepicker-choose");
                    //
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    //
                    if(options.type == "datetime" || options.type == "normal"){
                        //切回原状态
                        //切换表头区域
                        $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                        $picker.find(".zr-datepicker-header-month").removeClass("zr-datepicker-header-show");
                        //切换内容区域
                        $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        $picker.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                        //重新加载数据
                        datePicker.eventsFn.yearPageFn.call(this,0);
                    }else if(options.type == "year"){

                    }else if(options.type == "month"){
                        //年状态下，自动关闭开启将会触发自动赋值
                        if(options.autoClose){
                            datePicker.eventsFn.insertTextFn($(options.target),_moment.format(options.format));
                            //自动关闭
                            datePicker.eventsFn.hidePickerEvent($picker[0]);
                        }
                    }else if(options.type == "week"){
                        //切换表头区域
                        $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                        $picker.find(".zr-datepicker-header-month").removeClass("zr-datepicker-header-show");
                        //切换内容区域
                        $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                        $picker.find(".zr-datepicker-content-week").addClass("zr-datepicker-content-show");
                        //重新加载数据
                        datePicker.eventsFn.yearPageFn.call(this,0);
                    }
                })
                //
                datePicker.events.footerEvent(dom);
            },
            //区间月选中事件
            monthRangeEvent:function(dom){
                var $header = $(dom).find(".zr-datepicker-header-month"),
                    $content = $(dom).find(".zr-datepicker-content-month");

                //选中年的事件
                //
                var $cols = $content.find(".zr-datepicker-content-number .zr-datepicker-col-month");
                //初始化重载头部状态
                $header.find(".zr-datepicker-month-title").off("click").on("click",function(){
                    datePicker.eventsFn.yearFn.call(this);
                })
                //
                $cols.off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range"),
                        $wrap = $picker.closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        _moment = $picker.data("moment");
                    var month = $(this).attr("data-month") || 0;
                    month = parseInt(month);
                    //
                    _moment = _moment.month(month);
                    $picker.data("moment",_moment);
                    $cols.removeClass("zr-datepicker-choose");
                    $(this).addClass("zr-datepicker-choose");
                    //
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    //
                    //切回原状态
                    //切换表头区域
                    $picker.find(".zr-datepicker-header-date").addClass("zr-datepicker-header-show");
                    $picker.find(".zr-datepicker-header-month").removeClass("zr-datepicker-header-show");
                    //切换内容区域
                    $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                    $picker.find(".zr-datepicker-content-date").addClass("zr-datepicker-content-show");
                    //重新加载数据
                    datePicker.eventsFn.yearRangePageFn.call(this,0);
                    datePicker.events.rangeHeaderEvent($wrap[0]);
                })
                //
                datePicker.events.footerEvent(dom);
            },
            //底部工具栏事件
            footerEvent:function(dom){
                var $dom = $(dom);
                //
                var $footer = $dom.find(".zr-datepicker-footer");
                //清空操作
                $footer.find(".zr-datepicker-btn-clear").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target);
                    var _moment = $picker.data("moment");
                    //
                    var nodeName = $target[0].nodeName.toLowerCase();
                    //
                    //调用清空回调
                    options.onClear.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    //
                    datePicker.eventsFn.insertTextFn($target,"");
                })
                //确认操作
                $footer.find(".zr-datepicker-btn-ok").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target);
                    var _moment = $picker.data("moment");
                    //

                    //调用确认回调
                    if(options.type == "datetime" || options.type == "normal"){
                        var time = _moment.format(options.format);
                        options.onSure.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                        //
                        datePicker.eventsFn.insertTextFn($target,time);
                    }else if(options.type == "year"){
                        var time = _moment.format("YYYY");
                        options.onSure.call(options,time);
                        //
                        datePicker.eventsFn.insertTextFn($target,time);
                    }else if(options.type == "month"){
                        var time = _moment.format("YYYY-MM");
                        options.onSure.call(options,time);
                        //
                        datePicker.eventsFn.insertTextFn($target,time);
                    }else if(options.type == "week"){
                        var time = _moment.format("YYYY-WW"+options.languageConfig.weekText);
                        options.onSure.call(options,time);
                        //
                        datePicker.eventsFn.insertTextFn($target,time);
                    }
                    //自动关闭
                    datePicker.eventsFn.hidePickerEvent($picker[0]);
                })
                //现在
                $footer.find(".zr-datepicker-btn-now").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target),
                        $dateDom = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-choose");
                    var _moment = moment(new Date());
                    //
                    var time = _moment.format(options.format);
                    //调用确认回调
                    options.onSure.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    //
                    datePicker.eventsFn.insertTextFn($target,time);
                    //自动关闭
                    datePicker.eventsFn.hidePickerEvent($picker[0]);
                })
            },
            //区间底部工具栏
            rangeFooterEvent:function(dom){
                var $dom = $(dom);
                //
                var $footer = $dom.find(".zr-datepicker-footer");
                //清空操作
                $footer.find(".zr-datepicker-btn-clear").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target);
                    var _moment = $picker.data("moment");
                    //
                    var nodeName = $target[0].nodeName.toLowerCase();
                    //
                    //调用清空回调
                    options.onClear.call(options,moment(datePicker.options.rets[0]).format("YYYY-MM-DD HH:mm:ss"),moment(datePicker.options.rets[1]).format("YYYY-MM-DD HH:mm:ss"));
                    //
                    datePicker.eventsFn.insertTextFn($target,{startTime:"",endTime:""},options);
                })
                //确认操作
                $footer.find(".zr-datepicker-btn-ok").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target);
                    var _moment = $picker.data("moment");
                    //

                    //调用确认回调
                    options.onSure.call(options,moment(datePicker.options.rets[0]).format("YYYY-MM-DD HH:mm:ss"),moment(datePicker.options.rets[1]).format("YYYY-MM-DD HH:mm:ss"));
                    //
                    datePicker.eventsFn.insertTextFn($target,{
                        startTime:moment(datePicker.options.rets[0]).format(options.format),
                        endTime:moment(datePicker.options.rets[1]).format(options.format)
                    },options);
                    //自动关闭
                    datePicker.eventsFn.hidePickerEvent($picker[0]);
                })
                //现在
                $footer.find(".zr-datepicker-btn-now").off("click").on("click",function(){
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target),
                        $dateDom = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-choose");
                    var _moment = moment(new Date());
                    //
                    //调用确认回调
                    var _s1 = moment(new Date()).format("YYYY-MM-DD")+" 00:00:00",
                        _s2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                    options.onSure.call(options,_s1,_s2);
                    //
                    //
                    datePicker.eventsFn.insertTextFn($target,{
                        startTime:_s1,
                        endTime:_s2
                    },options);
                    //自动关闭
                    datePicker.eventsFn.hidePickerEvent($picker[0]);
                })
            },
            //时间事件
            timeEvent:function(dom,config){
                config.$hour.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap");
                    config.$hour.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var hour = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-wrap"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    _moment.hour(hour);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                        _h = timeType.indexOf("HH") > -1 ? _h : "00";
                        _m = timeType.indexOf("mm") > -1 ? _m : "00";
                        _s = timeType.indexOf("ss") > -1 ? _s : "00";
                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    $dom.data("moment",_moment);
                })
                config.$minute.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap");
                    config.$minute.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var minute = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-wrap"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    _moment.minute(minute);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                    _h = timeType.indexOf("HH") > -1 ? _h : "00";
                    _m = timeType.indexOf("mm") > -1 ? _m : "00";
                    _s = timeType.indexOf("ss") > -1 ? _s : "00";

                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    $(this).closest(".zr-datepicker-wrap").data("moment",_moment);
                })
                config.$second.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-wrap");
                    config.$second.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var second = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-wrap"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    _moment.second(second);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                    _h = timeType.indexOf("HH") > -1 ? _h : "00";
                    _m = timeType.indexOf("mm") > -1 ? _m : "00";
                    _s = timeType.indexOf("ss") > -1 ? _s : "00";
                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    $(this).closest(".zr-datepicker-wrap").data("moment",_moment);
                })
            },
            rangeTimeCompareFn:function(picker){
                    //
                    var r = [];
                    $(picker).find(".zr-datepicker-content-range").each(function(){
                        var _moment = $(this).data("moment");
                        r.push(_moment.format("YYYY-MM-DD HH:mm:ss"));
                    })
                    //

                    var _t1 = r[0],
                        _t2 = r[1];
                    _t1 = (new Date(_t1)).getTime();
                    _t2 = (new Date(_t2)).getTime();
                    if(_t1 > _t2){
                        r.reverse();
                    }
                    datePicker.options.rets = r;
            },
            rangeTimeEvent:function(dom,config){
                config.$hour.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range");
                    config.$hour.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var hour = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-content-range"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    _moment.hour(hour);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                    _h = timeType.indexOf("HH") > -1 ? _h : "00";
                    _m = timeType.indexOf("mm") > -1 ? _m : "00";
                    _s = timeType.indexOf("ss") > -1 ? _s : "00";
                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    $dom.data("moment",_moment);
                    //比较排序并重组
                    datePicker.events.rangeTimeCompareFn($picker.closest(".zr-datepicker-wrap")[0])
                })
                config.$minute.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range");
                    config.$minute.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var minute = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-content-range"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    _moment.minute(minute);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                    _h = timeType.indexOf("HH") > -1 ? _h : "00";
                    _m = timeType.indexOf("mm") > -1 ? _m : "00";
                    _s = timeType.indexOf("ss") > -1 ? _s : "00";

                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    $dom.data("moment",_moment);
                    //比较排序并重组
                    datePicker.events.rangeTimeCompareFn($picker.closest(".zr-datepicker-wrap")[0])
                })
                config.$second.off("click").on("click",function(){
                    var status = $(this).hasClass("zr-datepicker-row-disable");
                    if(status){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range");
                    config.$second.removeClass("zr-datepicker-col-time-choose");
                    $(this).addClass("zr-datepicker-col-time-choose");
                    var second = $(this).attr("data-time") || 0;
                    var $dom = $(this).closest(".zr-datepicker-content-range"),
                        options = $dom.data("options"),
                        _moment = $dom.data("moment");
                    //调取onSelect方法
                    options.onSelect.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                    _moment.second(second);
                    var _h = _moment.format("HH"),
                        _m = _moment.format("mm"),
                        _s = _moment.format("ss");
                    var timeType = options.format;
                    _h = timeType.indexOf("HH") > -1 ? _h : "00";
                    _m = timeType.indexOf("mm") > -1 ? _m : "00";
                    _s = timeType.indexOf("ss") > -1 ? _s : "00";
                    $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(_h+":"+_m+":"+_s);
                    $(this).closest(".zr-datepicker-wrap").data("moment",_moment);
                    //比较排序并重组
                    datePicker.events.rangeTimeCompareFn($picker.closest(".zr-datepicker-wrap")[0])
                })
            },
            //周控件
            weekEvent:function(dom){
                var $dom = $(dom);
                var $header = $dom.find(".zr-datepicker-header-month"),
                    $content = $dom.find(".zr-datepicker-content-week"),
                    $footer = $dom.find(".zr-datepicker-footer");
                var $row = $content.find(".zr-datepicker-content-number .zr-datepicker-row");
                var hoverClassName = "zr-datepicker-line-default";
                $row.off("mouseover").on("mouseover",function(){
                    $row.removeClass(hoverClassName);
                    $(this).addClass(hoverClassName);
                })
                $row.off("mouseout").on("mouseout",function(){
                    $row.removeClass(hoverClassName);
                })
                $row.off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $col = $(this).find(".zr-datepicker-col").eq(1),
                        _index = $col.attr("data-index"),
                        _time = $col.attr("data-time");
                    var $picker = $(this).closest(".zr-datepicker-wrap"),
                        options = $picker.data("options");
                    var weekMoment = zr.fn.datePicker.month[_time][_index];
                    weekMoment = weekMoment.moment;
                    datePicker.eventsFn.insertTextFn(options.target,weekMoment.format(options.format));
                    //switch className
                    $row.removeClass("zr-datepicker-line-choose");
                    $(this).addClass("zr-datepicker-line-choose");
                    //
                    if(options.autoClose){
                        datePicker.eventsFn.hidePickerEvent($picker[0]);
                    }
                    //调取onSelect方法
                    options.onSelect.call(options,weekMoment.format(options.format));
                })
                datePicker.events.init(dom);

            },
            //双日历的事件集合
            rangeEvent:function(dom){
                var $dom = $(dom),
                    options = $dom.data("options");
                //
                var $range = $dom.find(".zr-datepicker-content-range");
                var t1 = moment(options.initialDate),
                    t2 = moment(options.rangeDate);
                $range.eq(0).data({
                    "moment":t1,
                    "options":options
                })
                $range.eq(1).data({
                    "moment":t2,
                    "options":options
                })
                //
                datePicker.options.rets = [t1.format("YYYY-MM-DD HH:mm:ss"),t2.format("YYYY-MM-DD HH:mm:ss")];
                //重新计算头部的状态
                datePicker.events.rangeTabsEvent(dom);
                datePicker.eventsFn.rangeDateTimeFn(dom);
                datePicker.events.rangeHeaderEvent(dom);
                datePicker.events.rangeFooterEvent(dom);
            },
            //双日历的头部事件重载
            rangeHeaderEvent:function(dom){
                var $dom = $(dom),
                    options = $dom.data("options");
                //
                var $range = $dom.find(".zr-datepicker-content-range");
                var $picker1 = $range.eq(0),
                    $picker2 = $range.eq(1);
                //头部事件重载
                datePicker.events.rangeCommonHeaderEvent($picker1);
                datePicker.events.rangeCommonHeaderEvent($picker2);
                //

            },
            rangeCommonHeaderEvent:function(dom){
                var $dom = $(dom);
                var $col = $dom.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-col"),
                    $dateHeader = $dom.find(".zr-datepicker-header-date");
                //具体日期选择
                $col.off("click").on("click",function(){
                    if($(this).hasClass("zr-datepicker-unchoose")){
                        return false;
                    }
                    var $picker = $(this).closest(".zr-datepicker-content-range"),
                        $wrap = $picker.closest(".zr-datepicker-wrap"),
                        options = $picker.data("options"),
                        $target = $(options.target),
                        key = $(this).attr("data-time"),
                        index = $(this).attr("data-index"),
                        _moments = zr.fn.datePicker.month[key],
                        _colMoment = _moments[index].moment;
                    // //
                    var _moment = $picker.data("moment"),
                        _y = _colMoment.format("YYYY"),
                        _m = _colMoment.format("MM"),
                        _d = _colMoment.format("DD"),
                        _last = _moment.format("HH:mm:ss"),
                        _time = _y + "-" + _m + "-" + _d + " " + _last;
                    _moment = moment(_time);
                    $picker.data("moment",_moment);
                    console.log(datePicker.options.rangeDefaultChoose)
                    if(datePicker.options.rangeDefaultChoose == 2){
                        $wrap.find(".zr-datepicker-col").removeClass("zr-datepicker-range-default");
                        datePicker.options.rangeDefaultChoose = 1;
                    }else{
                        datePicker.options.rangeDefaultChoose ++;
                    }
                    $(this).addClass("zr-datepicker-range-default");
                    var time = _moment.format(options.format);
                    //调取onSelect方法
                    var timeString = _moment.format("YYYY-MM-DD HH:mm:ss");
                    options.onSelect.call(options,timeString);
                    if(datePicker.options.rets.length >= 2){
                        datePicker.options.rets = [];
                    }
                    datePicker.options.rets.push(timeString);
                    //比较日期，同时排序
                    if(datePicker.options.rets.length > 1){
                        var _r = [];
                        var _t1 = datePicker.options.rets[0],
                            _t2 = datePicker.options.rets[1];
                        _t1 = (new Date(_t1)).getTime();
                        _t2 = (new Date(_t2)).getTime();
                        if(_t1 > _t2){
                            datePicker.options.rets.reverse();
                        }
                    }
                    //
                    // //是否自动关闭
                    // if(options.autoClose && datePicker.options.rets.length == 2){
                    //     //自动关闭
                    //     datePicker.eventsFn.hidePickerEvent($dom[0]);
                    //     //赋值到input或者textarea
                    //     datePicker.eventsFn.insertTextFn($target,{
                    //         startTime:moment(datePicker.options.rets[0]).format(options.format),
                    //         endTime:moment(datePicker.options.rets[1]).format(options.format)
                    //     },options);
                    // }

                })
                //鼠标监听事件
                $col.off("mouseover").on("mouseover",function(){
                    var rets = datePicker.options.rets;
                    //
                    var _l = rets.length;
                    if(_l == 1){
                        var $picker = $(this).closest(".zr-datepicker-content-range"),
                            $wrap = $picker.closest(".zr-datepicker-wrap"),
                            options = $picker.data("options"),
                            $target = $(options.target),
                            key = $(this).attr("data-time"),
                            index = $(this).attr("data-index"),
                            _moments = zr.fn.datePicker.month[key],
                            _colMoment = _moments[index].moment;
                        // //
                        var _moment = $picker.data("moment"),
                            _y = _colMoment.format("YYYY"),
                            _m = _colMoment.format("MM"),
                            _d = _colMoment.format("DD"),
                            _last = _moment.format("HH:mm:ss"),
                            _time = _y + "-" + _m + "-" + _d + " " + _last;
                        //
                        var _s = [];
                        if((new Date(_time)).getTime() > (new Date(rets[0])).getTime()){
                            _s = [rets[0],_time];
                        }else{
                            _s = [_time,rets[0]];
                        }

                        //
                        var $col = $wrap.find(".zr-datepicker-content-number .zr-datepicker-col");
                        $col.each(function(){
                            var _i = $(this).attr("data-index"),
                                _k = $(this).attr("data-time"),
                                _m = zr.fn.datePicker.month[_k],
                                _c = _m[_i].moment;
                            if((_c.isBetween(_s[0],_s[1]) || _c.isSame(_s[0],"day") || _c.isSame(_s[1],"day"))&& !$(this).hasClass("zr-datepicker-unrange")){
                                $(this).addClass("zr-datepicker-choose-col")
                            }else{
                                $(this).removeClass("zr-datepicker-choose-col")
                            }
                        })
                        //
                    }
                    //
                })
                //上一年
                $dateHeader.find(".zr-datepicker-prev-year").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.yearRangePageFn.call(this,-1);
                })
                //下一年
                $dateHeader.find(".zr-datepicker-next-year").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.yearRangePageFn.call(this,1);
                })
                //上一月
                $dateHeader.find(".zr-datepicker-prev-month").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.monthRangePageFn.call(this,-1);
                })
                //下一月
                $dateHeader.find(".zr-datepicker-next-month").off("click").on("click",function(){
                    //
                    //
                    datePicker.eventsFn.monthRangePageFn.call(this,1);
                })
                //年选择
                $dateHeader.find(".zr-datepicker-date-title .zr-datepicker-year-text").off("click").on("click",datePicker.eventsFn.yearRangeFn);
                //月选择
                $dateHeader.find(".zr-datepicker-date-title .zr-datepicker-month-text").off("click").on("click",datePicker.eventsFn.monthRangeFn);
            }

        },
        eventsFn:{
            //重新计算位置
            resetPosition:function(options){
                //this对象是日期控件对象
                var $target = $(options.target),
                    h = parseFloat($target.outerHeight()),
                    ps = $target.offset(),
                    psl = parseFloat(ps.left),
                    pst = parseFloat(ps.top);
                var $t = $(this),
                    _th = parseFloat($t.outerHeight());

                var $w = $(window),
                    _wh = parseFloat($w.height());
                if((pst + _th) > _wh){
                    //自动向上
                    $t.css({
                        left:psl + options.autoOffset.x,
                        top:pst - _th - h/2 + options.autoOffset.y
                    })
                }else{
                    $t.css({
                        left:psl + options.autoOffset.x,
                        top:pst + h + options.autoOffset.y
                    })
                }
                //
                // console.log(h)
                //
            },
            //重新计算头部区间
            rangeDateTimeFn:function(dom){
                var $dom = $(dom),
                    options = $dom.data("options");
                //
                var $range = $dom.find(".zr-datepicker-content-range");
                //重新计算时间
                var $picker1 = $range.eq(0),
                    $picker2 = $range.eq(1);
                var time1 = $picker1.data("moment"),
                    time2 = $picker2.data("moment");
                var tr1 = moment(time1),
                    tr2 = moment(time2);
                var year1 = tr1.get("year"),
                    year2 = tr2.get("year"),
                    month1 = tr1.get("month"),
                    month2 = tr2.get("month");
                //
                if(year2 - year1 == 0 && month2 - month1 == 1){
                    //
                    $picker1.find(".zr-datepicker-header-date .zr-datepicker-next-month").css("visibility","hidden");
                    $picker1.find(".zr-datepicker-header-date .zr-datepicker-next-year").css("visibility","hidden");
                    $picker2.find(".zr-datepicker-header-date .zr-datepicker-prev-month").css("visibility","hidden");
                    $picker2.find(".zr-datepicker-header-date .zr-datepicker-prev-year").css("visibility","hidden");
                    //
                }else{
                    $picker1.find(".zr-datepicker-header-date .zr-datepicker-next-month").css("visibility","visible");
                    $picker1.find(".zr-datepicker-header-date .zr-datepicker-next-year").css("visibility","visible");
                    $picker2.find(".zr-datepicker-header-date .zr-datepicker-prev-month").css("visibility","visible");
                    $picker2.find(".zr-datepicker-header-date .zr-datepicker-prev-year").css("visibility","visible");
                }
                //
            },
            //时间初始化
            timeReloadFn:function(){
                var $picker = $(this).closest(".zr-datepicker-wrap"),
                    _moment = $picker.data("moment"),
                    options = $picker.data("options");
                var hour = "",
                    minutes = "",
                    seconds = "";
                //
                var timeType = options.format,
                    _hType = timeType.indexOf("HH") > -1 ? 1 : 0,
                    _mType = timeType.indexOf("mm") > -1 ? 1 : 0,
                    _sType = timeType.indexOf("ss") > -1 ? 1 : 0;
                if(_hType){
                    hour = parseInt(_moment.format("HH"))
                }else{
                    hour = 0;
                }

                if(_mType){
                    minutes = parseInt(_moment.format("mm"))
                }else{
                    minutes = 0;
                }

                if(_sType){
                    seconds = parseInt(_moment.format("ss"))
                }else{
                    seconds = 0;
                }

                //分析数据进行状态选中
                var $time = $picker.find(".zr-datepicker-content-time"),
                    $hour = $time.find(".zr-datepicker-row-time-hour"),
                    $minute = $time.find(".zr-datepicker-row-time-minute"),
                    $second = $time.find(".zr-datepicker-row-time-second");
                var $hourCol = $hour.find(".zr-datepicker-col-time"),
                    $minuteCol = $minute.find(".zr-datepicker-col-time"),
                    $secondCol = $second.find(".zr-datepicker-col-time");
                //
                $hourCol.removeClass("zr-datepicker-col-time-choose");
                $minuteCol.removeClass("zr-datepicker-col-time-choose");
                $secondCol.removeClass("zr-datepicker-col-time-choose");
                //
                //
                $hourCol.eq(hour).addClass("zr-datepicker-col-time-choose");
                $minuteCol.eq(minutes).addClass("zr-datepicker-col-time-choose");
                $secondCol.eq(seconds).addClass("zr-datepicker-col-time-choose");
                //时间标题
                hour = (hour > 9 ? hour : ('0' + hour));
                minutes = (minutes > 9 ? minutes : ('0' + minutes));
                seconds = (seconds > 9 ? seconds : ('0' + seconds));
                $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(hour + ":" + minutes + ":" + seconds);
                //加载事件
                zr.tools.later(function(){
                    datePicker.events.timeEvent($picker[0],{$hour:$hourCol,$minute:$minuteCol,$second:$secondCol});
                },0)

            },
            rangeTimeReloadFn:function(){
                $(this).find(".zr-datepicker-content-range").each(function(){
                    datePicker.eventsFn.rangeTimeEachFn.call(this);
                })
            },
            rangeTimeEachFn:function(){
                var $picker = $(this),
                    _moment = $picker.data("moment"),
                    options = $picker.data("options");

                //
                //
                var hour = "",
                    minutes = "",
                    seconds = "";
                //
                var timeType = options.format,
                    _hType = timeType.indexOf("HH") > -1 ? 1 : 0,
                    _mType = timeType.indexOf("mm") > -1 ? 1 : 0,
                    _sType = timeType.indexOf("ss") > -1 ? 1 : 0;
                if(_hType){
                    hour = parseInt(_moment.format("HH"))
                }else{
                    hour = 0;
                }

                if(_mType){
                    minutes = parseInt(_moment.format("mm"))
                }else{
                    minutes = 0;
                }

                if(_sType){
                    seconds = parseInt(_moment.format("ss"))
                }else{
                    seconds = 0;
                }
                //
                //

                //分析数据进行状态选中
                var $time = $picker.find(".zr-datepicker-content-time"),
                    $hour = $time.find(".zr-datepicker-row-time-hour"),
                    $minute = $time.find(".zr-datepicker-row-time-minute"),
                    $second = $time.find(".zr-datepicker-row-time-second");
                var $hourCol = $hour.find(".zr-datepicker-col-time"),
                    $minuteCol = $minute.find(".zr-datepicker-col-time"),
                    $secondCol = $second.find(".zr-datepicker-col-time");
                //
                $hourCol.removeClass("zr-datepicker-col-time-choose");
                $minuteCol.removeClass("zr-datepicker-col-time-choose");
                $secondCol.removeClass("zr-datepicker-col-time-choose");
                //
                //
                $hourCol.eq(hour).addClass("zr-datepicker-col-time-choose");
                $minuteCol.eq(minutes).addClass("zr-datepicker-col-time-choose");
                $secondCol.eq(seconds).addClass("zr-datepicker-col-time-choose");
                //时间标题
                hour = (hour > 9 ? hour : ('0' + hour));
                minutes = (minutes > 9 ? minutes : ('0' + minutes));
                seconds = (seconds > 9 ? seconds : ('0' + seconds));
                $picker.find(".zr-datepicker-header-time .zr-datepicker-time-title").text(hour + ":" + minutes + ":" + seconds);
                //加载事件
                zr.tools.later(function(){
                    datePicker.events.rangeTimeEvent($picker[0],{$hour:$hourCol,$minute:$minuteCol,$second:$secondCol});
                },0)
            },
            timeTitleResetFn:function(){

            },
            //月选择方法
            monthFn:function(){
                var $picker = $(this).closest(".zr-datepicker-wrap");
                //切换表头区域
                $picker.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                $picker.find(".zr-datepicker-header-month").addClass("zr-datepicker-header-show");
                //切换内容区域
                $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                $picker.find(".zr-datepicker-content-month").addClass("zr-datepicker-content-show");
                //渲染区域数据
                datePicker.eventsFn.monthContentReloadHtmlFn.call($picker[0]);
            },
            //区间月选择
            monthRangeFn:function(){
                var $picker = $(this).closest(".zr-datepicker-content-range");
                //切换表头区域
                $picker.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                $picker.find(".zr-datepicker-header-month").addClass("zr-datepicker-header-show");
                //切换内容区域
                $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                $picker.find(".zr-datepicker-content-month").addClass("zr-datepicker-content-show");
                //渲染区域数据
                datePicker.eventsFn.monthContentReloadHtmlFn.call($picker[0]);
            },
            monthHeaderReloadHtmlFn:function(dom){
                var $dom = $(dom),
                    _moment = $dom.data("moment"),
                    options = $dom.data("options");
                var _lc = options.languageConfig;
                var time = _moment.format(_lc.monthFormat+" "+_lc.monthOfDayFormat);
                $dom.find(".zr-datepicker-header-month .zr-datepicker-month-title").text(time);
            },
            //月选择html重载方法
            monthContentReloadHtmlFn:function(index){
                var _this = this;
                //
                datePicker.eventsFn.monthHeaderReloadHtmlFn(_this);
                var _moment = $(this).data("moment"),
                    options = $(this).data("options");
                var html = "";
                var month = parseInt(_moment.format("MM")),
                    year =_moment.format("YYYY"),
                    choose = month;
                var unchoose = 0;

                var max = moment(options.maxDate),
                    maxYear = max.format("YYYY"),
                    maxMonth = parseInt(max.format("MM")),
                    min = moment(options.minDate),
                    minYear = min.format("YYYY"),
                    minMonth = parseInt(min.format("MM"));
                var m = moment(),
                    nowMonth = parseInt(m.format("MM")),
                    nowYear = m.format("YYYY");

                var $contentMonth = $(this).find(".zr-datepicker-content-month");
                choose = parseInt(month);
                var _index = "",
                    className = "";
                for(var i = 0; i < 12; i++){
                    _index = i + 1;
                    className = "zr-datepicker-col-month ";
                    if(choose == _index){
                        className += "zr-datepicker-choose ";
                    }
                    if(nowMonth == _index && year == nowYear ){
                        className += "zr-datepicker-default ";
                    }
                    //
                    if(nowYear < minYear || nowYear > maxYear){
                        className += "zr-datepicker-unchoose ";
                    }
                    if((nowYear >= minYear && nowYear <= maxYear)&&(_index > maxMonth || _index < minMonth) ){
                        className += "zr-datepicker-unchoose "
                    }
                    //
                    html += "<div class='"+className+"' data-month='"+i+"'>"
                    if(_index < 10){
                        _index = "0" + _index;
                    }
                    html += "<span>"+_index+"</span>";
                    html += "</div>";
                }


                var $row = $contentMonth.find(".zr-datepicker-content-number .zr-datepicker-row-month");
                $row.html(html);
                //事件重载
                zr.tools.later(function(){
                    if(options.type == "range"){
                        datePicker.events.monthRangeEvent(_this);
                    }else{
                        datePicker.events.monthEvent(_this);
                    }

                },0)
            },
            //年选择方法
            yearFn:function(){
                var $picker = $(this).closest(".zr-datepicker-wrap");
                //切换表头区域
                $picker.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                $picker.find(".zr-datepicker-header-year").addClass("zr-datepicker-header-show");
                //切换内容区域
                $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                $picker.find(".zr-datepicker-content-year").addClass("zr-datepicker-content-show");
                //渲染区域数据
                datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0]);
            },
            //区间年选择方法
            yearRangeFn:function(){
                var $picker = $(this).closest(".zr-datepicker-content-range");
                //切换表头区域
                $picker.find(".zr-datepicker-header").removeClass("zr-datepicker-header-show");
                $picker.find(".zr-datepicker-header-year").addClass("zr-datepicker-header-show");
                //切换内容区域
                $picker.find(".zr-datepicker-content").removeClass("zr-datepicker-content-show");
                $picker.find(".zr-datepicker-content-year").addClass("zr-datepicker-content-show");
                //渲染区域数据
                datePicker.eventsFn.yearContentReloadHtmlFn.call($picker[0]);
            },
            //年选择html重载方法
            yearContentReloadHtmlFn:function(index){
                var _this = this;
                var _moment = $(this).data("moment"),
                    options = $(this).data("options");
                var html = "";
                var year = parseInt(_moment.format("YYYY")),
                    choose = year;
                var $contentYear = $(this).find(".zr-datepicker-content-year");
                var rets = [];
                index = index || 0;
                year = year - (7 + index * 12);
                var nowYear = moment().format("YYYY");
                var max = moment(options.maxDate).format("YYYY"),
                    min = moment(options.minDate).format("YYYY");
                //
                //
                for(var i = 1; i <= 12; i++){
                    year = year + 1;
                    if(i == 1 || i == 12){
                        rets.push(year);
                    }
                    var className = "zr-datepicker-col-year ";
                    if(year == nowYear){
                        className += "zr-datepicker-default ";
                    }
                    if(year == choose){
                        className += "zr-datepicker-choose ";
                    }
                    if(year > max || year < min){
                        className += "zr-datepicker-unchoose ";
                    }

                    html += "<div class='"+className+"' data-year='"+year+"'>";
                    html += "<span>"+year+"</span>";
                    html += "</div>";
                }
                var $row = $contentYear.find(".zr-datepicker-content-number .zr-datepicker-row-year");
                $row.html(html);
                //
                datePicker.eventsFn.yearHeaderReloadHtmlFn.call(this,rets);
                //绑定事件
                if(options.type == "range"){
                    zr.tools.later(function(){
                        datePicker.events.yearRangeEvent(_this);
                    },0)
                }else{
                    zr.tools.later(function(){
                        datePicker.events.yearEvent(_this);
                    },0)
                }

            },
            yearHeaderReloadHtmlFn:function(rets){
                $(this).find(".zr-datepicker-header-year .zr-datepicker-year-title").text(rets[0]+"—"+rets[1]);
            },
            //输入的time数值
            insertTextFn:function($target,time,options){
                $target = $target.nodeName ? $($target) : $target;
                var _o = options || {};
                if(_o.type == "range"){
                    var _s1 = $target.find(".zr-datepicker-range-start"),
                        _s2 = $target.find(".zr-datepicker-range-end");
                    var _sn1 = _s1[0].nodeName.toLowerCase(),
                        _sn2 = _s2[0].nodeName.toLowerCase();
                    //
                    if(_sn1 == "input" || _sn1 == "textarea"){
                        _s1.val(time.startTime);
                    }else{
                        _s1.text(time.startTime);
                    }
                    //
                    if(_sn2 == "input" || _sn2 == "textarea"){
                        _s2.val(time.endTime);
                    }else{
                        _s2.text(time.endTime);
                    }
                }else{
                    var nodeName = $target[0].nodeName.toLowerCase();
                    if(nodeName == "input" || nodeName == "textarea"){
                        $target.val(time);
                    }else{
                        $target.text(time);
                    }
                }

            },
            //月翻页
            monthPageFn:function(monthNumber){
                var $picker = $(this).closest(".zr-datepicker-wrap"),
                    options = $picker.data("options"),
                    //月是从0开始计算
                    _moment = $picker.data("moment"),
                $target = $(options.target);
                _moment = _moment || moment(options.initialDate);
                var totalMonth = parseInt(_moment.format("MM")) + monthNumber - 1,
                    targetTime = _moment.month(totalMonth);
                var time = targetTime.format("YYYY-MM-DD");

                $picker.data("moment",targetTime);
                var config = $.extend({},options);
                //存储关键时间点，用于翻页等
                config._pageTime = new Date(time);
                config._moment = _moment;

                var html = datePicker.eventsFn.rebuildDateHtmlFn(config);
                if(options.type == "week"){
                    $row = $picker.find(".zr-datepicker-content-week .zr-datepicker-content-number");
                }else{
                    $row = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-row");
                }
                $row.html(html);
                //重新渲染头部
                datePicker.eventsFn.dateHeaderReloadFn.call(this,config);
                //延迟绑定公共方法
                zr.tools.later(function(){
                    //
                    if(options.type == "week"){
                        datePicker.events.weekEvent($picker[0]);
                    }else{
                        datePicker.events.init($picker[0]);
                    }
                },0)
            },
            //区间月翻页
            monthRangePageFn:function(monthNumber){
                var $picker = $(this).closest(".zr-datepicker-content-range"),
                    $wrap = $picker.closest(".zr-datepicker-wrap"),
                    options = $picker.data("options"),
                    //月是从0开始计算
                    _moment = $picker.data("moment");
                var totalMonth = parseInt(_moment.format("MM")) + monthNumber - 1,
                    targetTime = _moment.month(totalMonth);
                var time = targetTime.format("YYYY-MM-DD");
                //
                $picker.data("moment",targetTime);
                var config = $.extend({},options);
                //存储关键时间点，用于翻页等
                config._pageTime = new Date(time);
                config._moment = _moment;
                //
                var html = datePicker.eventsFn.rebuildDateHtmlFn(config),
                $row = "";

                $row = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-row");
                $row.html(html);
                //重新渲染头部
                datePicker.eventsFn.dateHeaderReloadFn.call(this,config);
                //重新计算头部状态
                datePicker.eventsFn.rangeDateTimeFn($(this).closest(".zr-datepicker-wrap"))
                //延迟绑定公共方法
                zr.tools.later(function(){
                    //
                    datePicker.events.rangeHeaderEvent($wrap[0]);
                    // datePicker.events.init($picker[0]);
                },0)
            },
            //年翻页
            yearPageFn:function(yearNumber){
                var $picker = $(this).closest(".zr-datepicker-wrap"),
                    options = $picker.data("options"),
                    _moment = $picker.data("moment"),
                    $target = $(options.target);
                //
                _moment = _moment || moment(options.initialDate);
                //
                var targetTime = _moment.format("YYYY");
                targetTime = _moment.year(parseInt(targetTime) + yearNumber)
                var time = targetTime.format("YYYY-MM-DD");
                $picker.data("moment",targetTime);
                var config = $.extend({},options);
                //存储关键时间点，用于翻页等
                config._pageTime = new Date(time);
                config._moment = _moment;
                //
                var html = datePicker.eventsFn.rebuildDateHtmlFn(config);
                var $row = "";
                if(options.type == "week"){
                    $row = $picker.find(".zr-datepicker-content-week .zr-datepicker-content-number");
                }else{
                    $row = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-row");
                }

                $row.html(html);
                //重新渲染头部
                datePicker.eventsFn.dateHeaderReloadFn.call(this,config);
                //
                //延迟绑定公共方法
                zr.tools.later(function(){
                    if(options.type == "week"){
                        datePicker.events.weekEvent($picker[0]);
                    }else{
                        datePicker.events.init($picker[0]);
                    }
                },0)

            },
            //区间类年翻页
            yearRangePageFn:function(yearNumber){
                var $picker = $(this).closest(".zr-datepicker-content-range"),
                    $wrap = $picker.closest(".zr-datepicker-wrap"),
                    options = $picker.data("options"),
                    _moment = $picker.data("moment"),
                    $target = $(options.target);
                //
                var targetTime = _moment.format("YYYY");
                targetTime = _moment.year(parseInt(targetTime) + yearNumber)
                var time = targetTime.format("YYYY-MM-DD");
                $picker.data("moment",targetTime);
                var config = $.extend({},options);
                //存储关键时间点，用于翻页等
                config._pageTime = new Date(time);
                config._moment = _moment;
                //
                var html = datePicker.eventsFn.rebuildDateHtmlFn(config);
                var $row = "";

                $row = $picker.find(".zr-datepicker-content-date .zr-datepicker-content-number .zr-datepicker-row");
                $row.html(html);
                //重新渲染头部
                datePicker.eventsFn.dateHeaderReloadFn.call(this,config);
                //重新计算头部状态
                datePicker.eventsFn.rangeDateTimeFn($wrap)
                //
                //延迟绑定公共方法
                zr.tools.later(function(){
                   // datePicker.events.init($picker[0]);
                    datePicker.events.rangeHeaderEvent($wrap[0]);
                },0)

            },
            //日期头部重新赋值
            dateHeaderReloadFn:function(options){
                var lc = options.languageConfig;
                var $picker = $(this).closest(".zr-datepicker-wrap");
                if(options.type == "range"){
                    $picker = $(this).closest(".zr-datepicker-content-range");
                }

                //
                var _moment = options._moment;
                var month = _moment.format(lc.monthFormat),
                    day = _moment.format(lc.monthOfDayFormat);
                var $title= $picker.find(".zr-datepicker-header-date .zr-datepicker-date-title")
                $title.find(".zr-datepicker-year-text").text(month);
                $title.find(".zr-datepicker-month-text").text(day);
            },
            //移除日期
            hidePickerEvent:function(dom){
                //调用关闭回调
                var $dom = $(dom),
                    options = $dom.data("options"),
                    _moment = $dom.data("moment");
                options.onClose.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
                $dom.remove();
            },
            //加载国际化语言控件
            useLoader:function (options) {
                var _this = this;
                //
                _this.options = options;
                Zr.use("./datePicker/js/"+options.language,function(zr,lconfig){

                    /**
                     * @Author: zhangjinglin
                     * @Email: zhangjinglin@jd.com
                     * @Date: Created in 2018/4/19 下午10:59
                     * @Description:初始化日期控件，并将配置信息存储到Dom对象下
                     */
                    _this.options.languageConfig = lconfig;
                    //周 日历特殊处理数值
                    if(_this.options.type == "week" && _this.options.initialDate.toString().indexOf(_this.options.languageConfig.weekText) > -1){
                        var time = _this.options.initialDate.split(_this.options.languageConfig.weekText)[0];
                        time = time.split("-");
                        var _m = moment(time[0]).week(time[1]);
                        _this.options.initialDate = _m.format("YYYY-MM-DD");
                    }
                    if(_this.options.type == "week"){
                        _this.options._moment = moment(_this.options.initialDate);
                        _this.options._chooseMoment = moment(_this.options.initialDate);
                    }
                    //动态配置位置
                    //
                    $(".zr-datepicker-wrap").remove();
                    //
                    var _dom = $(_this.options.target),
                        _h = parseInt(_dom.height()),
                        _ps = _dom.offset(),
                        _psl = _ps.left,
                        _pst = _ps.top + _h;
                    //
                    var $picker = "";
                    //
                    if(_this.options.type == "week"){
                        _this.options.format = "YYYY-WW"+_this.options.languageConfig.weekText;
                        $picker = $(datePicker.eventsFn.rebuildWeekHtml(_this.options)).appendTo("body").data({
                            "options":_this.options,
                            "moment":_this.options._moment
                        });
                        zr.tools.later(function(){
                            datePicker.eventsFn.resetPosition.call($picker[0],_this.options)
                        },100)
                    }else if(_this.options.type == "range"){
                        $picker = $(datePicker.eventsFn.rebuildRangeHtml(_this.options)).appendTo("body").data({
                            "options":_this.options,
                            "moment":_this.options._moment
                        });
                        zr.tools.later(function(){
                            datePicker.eventsFn.resetPosition.call($picker[0],_this.options)
                        },100)
                    }else{
                        $picker = $(datePicker.eventsFn.rebuildHtml(_this.options)).appendTo("body").data({
                            "options":_this.options,
                            "moment":_this.options._moment
                        });
                        zr.tools.later(function(){
                            datePicker.eventsFn.resetPosition.call($picker[0],_this.options)
                        },100)
                    }
                    //
                    //延迟绑定公共方法
                    zr.tools.later(function(){
                        //调用onOpen
                        _this.options.onOpen.call(_this.options,_this.options._moment.format("YYYY-MM-DD HH:mm:ss"));
                        //
                        //阻止冒泡
                        $picker.off("click").on("click",function(ev){
                            ev.stopPropagation();
                        })
                        //
                        //初始化内容
                        if(_this.options.type == "year"){
                            datePicker.eventsFn.yearFn.call($picker.find(".zr-datepicker-footer")[0]);
                        }else if(_this.options.type == "datetime" || _this.options.type == "normal"){
                            datePicker.events.init($picker[0]);
                        }else if(_this.options.type == "month"){
                            datePicker.eventsFn.monthFn.call($picker.find(".zr-datepicker-footer")[0]);
                        }else if(_this.options.type == "week"){
                            datePicker.events.weekEvent($picker[0]);
                        }else if(_this.options.type == "range"){
                            datePicker.events.rangeEvent($picker[0]);
                        }
                    },0)
                })
            },
            //生成HTML
            rebuildHtml:function(config){
                var lc = config.languageConfig,
                    type = config.type;
                //外层皮肤
                var html = "<div class=\"zr-datepicker-wrap\">";
                    html += "<div class=\"zr-datepicker\">";
                var className = "";
                //头部tabs组装
                if(type == "datetime" && config.isTabSwitch){
                    html += "<div class=\"zr-datepicker-tabs\">";
                    html += "<div class=\"zr-datepicker-tab zr-datepicker-tab-date zr-datepicker-tab-selected\">"+lc.tab.dateText+"</div>";
                    html += "<div class=\"zr-datepicker-tab zr-datepicker-tab-time\">"+lc.tab.timeText+"</div>";
                    html += "</div>";
                }
                //头部日组装
                    className = "zr-datepicker-header zr-datepicker-header-date";
                    className += (type == "datetime" || type == "normal" || type == "week") ? " zr-datepicker-header-show" : "";
                    html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-month\"><i class=\"zricon-arrow-left\"></i></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-date-title\"><span class='zr-datepicker-year-text'>" + config._moment.format(lc.monthFormat) + "</span>&nbsp;<span class='zr-datepicker-month-text'>" + config._moment.format(lc.monthOfDayFormat) + "</span></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-next-month\"><i class=\"zricon-arrow-right\"></i></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                    html += "</div>";
                //头部月组装
                    className = "zr-datepicker-header zr-datepicker-header-month";
                    className += type == "month" ? " zr-datepicker-header-show" : "";
                    html += "<div class=\""+className+"\">";
                    html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-month-title\"></div>";
                    html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                    html += "</div>";
                //头部年组装
                    className = "zr-datepicker-header zr-datepicker-header-year";
                    className += type == "year" ? " zr-datepicker-header-show" : "";
                    html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-year-title\"></div>";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                    html += "</div>";
                //头部时间组件
                    className = "zr-datepicker-header zr-datepicker-header-time";
                    className += type == "time" ? " zr-datepicker-header-show" : "";
                    html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-inline zr-datepicker-time-title\"></div>";
                    html += "</div>";
                //周选择组件
                className = "zr-datepicker-content zr-datepicker-content-week";
                className += type == "week" ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-header zr-datepicker-row\">";
                        for(var i = 0;i < lc.week.length;i++){
                            html += "<div class=\"zr-datepicker-col\">"+lc.week[i]+"</div>";
                        }
                    html += "</div>";
                //生成日历

                var dateHtml = datePicker.eventsFn.rebuildDateHtmlFn(config);
                //
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += "<div class=\"zr-datepicker-row\">";
                            html += dateHtml;
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                //日期内容组件
                className = "zr-datepicker-content zr-datepicker-content-date";
                className += (type == "datetime" || type == "normal") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-header zr-datepicker-row\">";
                        for(var i = 0;i < lc.monthWeek.length;i++){
                            html += "<div class=\"zr-datepicker-col\">"+lc.monthWeek[i]+"</div>";
                        }
                    html += "</div>";
                    //生成日历
                    // var dateHtml = datePicker.eventsFn.rebuildDateHtmlFn(config);
                    //
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += "<div class=\"zr-datepicker-row\">";
                            html += dateHtml;
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                ////月内容组件
                className = "zr-datepicker-content zr-datepicker-content-month";
                className += (type == "month") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += " <div class=\"zr-datepicker-row-month\">";
                            html += "<div class=\"zr-datepicker-col-month\">";
                                html += "<span>1</span>";
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                //年内容组件
                className = "zr-datepicker-content zr-datepicker-content-year";
                className += (type == "year") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += "<div class=\"zr-datepicker-row-year\">";
                            html += "<div class=\"zr-datepicker-col-year\">";
                                html += "<span>2009</span>";
                            html += "</div>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                //时间内容组件
                var timeNumber = 0;
                className = "zr-datepicker-content zr-datepicker-content-time";
                className += (type == "time") ? " zr-datepicker-content-show" : "";
                //分析时间格式类型
                var timeType = config.format,
                    _hType = timeType.indexOf("HH") > -1 ? 1 : 0,
                    _mType = timeType.indexOf("mm") > -1 ? 1 : 0,
                    _sType = timeType.indexOf("ss") > -1 ? 1 : 0;
                //
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-hour\">";
                        var className = "";
                            for(var i = 0; i < 24; i++){
                                className = "zr-datepicker-col-time ";
                                if(!_hType){
                                    className += "zr-datepicker-row-disable ";
                                }
                                timeNumber = i;
                                if(i == 0){
                                    className += "zr-datepicker-col-time-choose";
                                }
                                if(i < 10){
                                    timeNumber = "0" + timeNumber;
                                }
                               html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                            }
                        html += "</div>";
                        html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-minute\">";
                                for(var i = 0; i < 60; i++){
                                    className = "zr-datepicker-col-time ";
                                    timeNumber = i;
                                    if(!_mType){
                                        className += "zr-datepicker-row-disable ";
                                    }
                                    if(i == 0){
                                        className += "zr-datepicker-col-time-choose";
                                    }
                                    if(i < 10){
                                        timeNumber = "0" + timeNumber;
                                    }
                                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                                }
                        html += "</div>";
                        html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-second\">";
                                for(var i = 0; i < 60; i++){
                                    className = "zr-datepicker-col-time ";
                                    timeNumber = i;
                                    if(!_sType){
                                        className += "zr-datepicker-row-disable ";
                                    }
                                    if(i == 0){
                                        className += "zr-datepicker-col-time-choose";
                                    }
                                    if(i < 10){
                                        timeNumber = "0" + timeNumber;
                                    }
                                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                                }
                        html += "</div>";
                    html += "</div>";
                html += "</div>";
                if(config.showBtnTools || !config.autoClose){
                    html += "<div class=\"zr-datepicker-footer\">";
                }else{
                    html += "<div class=\"zr-datepicker-footer\" style='display: none'>";
                }
                    html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn-clear\">"+lc.btnTools.clearText+"</a>";
                    html += "<div class=\"zr-datepicker-btn-tools\">";
                        html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-now\">"+lc.btnTools.nowText+"</a>";
                        html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-ok\">"+lc.btnTools.confirmText+"</a>";
                    html += "</div>";
                html += "</div>";
                //结尾标签
                html += "</div></div>";
                return html;
            },
            rebuildWeekHtml:function(config){
                var lc = config.languageConfig,
                    type = config.type;
                //外层皮肤
                var html = "<div class=\"zr-datepicker-wrap zr-datepicker-wrap-week\">";
                html += "<div class=\"zr-datepicker\">";
                var className = "";
                //头部日组装
                className = "zr-datepicker-header zr-datepicker-header-date zr-datepicker-header-show";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-month\"><i class=\"zricon-arrow-left\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-date-title\"><span class='zr-datepicker-year-text'>" + config._moment.format(lc.monthFormat) + "</span>&nbsp;<span class='zr-datepicker-month-text'>" + config._moment.format(lc.monthOfDayFormat) + "</span></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-month\"><i class=\"zricon-arrow-right\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部月组装
                className = "zr-datepicker-header zr-datepicker-header-month";
                html += "<div class=\""+className+"\">";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-month-title\"></div>";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部年组装
                className = "zr-datepicker-header zr-datepicker-header-year";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-year-title\"></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //周选择组件

                //

                //
                className = "zr-datepicker-content zr-datepicker-content-week zr-datepicker-content-show";
                html += "<div class=\""+className+"\">";
                    html += "<div class=\"zr-datepicker-content-header zr-datepicker-row\">";
                        html += "<div class=\"zr-datepicker-col zr-datepicker-readonly\">"+lc.weekText+"</div>";
                        for(var i = 0;i < lc.week.length;i++){
                            html += "<div class=\"zr-datepicker-col\">"+lc.week[i]+"</div>";
                        }
                    html += "</div>";
                //生成日历

                var dateHtml = datePicker.eventsFn.rebuildDateHtmlFn(config);
                //
                    html += "<div class=\"zr-datepicker-content-number\">";
                        html += dateHtml;
                    html += "</div>";
                html += "</div></div>";
                //
                ////月内容组件
                className = "zr-datepicker-content zr-datepicker-content-month";
                className += (type == "month") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += " <div class=\"zr-datepicker-row-month\">";
                html += "<div class=\"zr-datepicker-col-month\">";
                html += "<span></span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //年内容组件
                className = "zr-datepicker-content zr-datepicker-content-year";
                className += (type == "year") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += "<div class=\"zr-datepicker-row-year\">";
                html += "<div class=\"zr-datepicker-col-year\">";
                html += "<span></span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //时间内容组件
                if(config.showBtnTools || !config.autoClose){
                    html += "<div class=\"zr-datepicker-footer\">";
                }else{
                    html += "<div class=\"zr-datepicker-footer\" style='display: none'>";
                }
                html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn-clear\">"+lc.btnTools.clearText+"</a>";
                html += "<div class=\"zr-datepicker-btn-tools\">";
                html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-now\">"+lc.btnTools.nowText+"</a>";
                html += "<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-ok\">"+lc.btnTools.confirmText+"</a>";
                html += "</div>";
                html += "</div>";
                //结尾标签
                html += "</div></div>";
                return html;
            },
            rebuildRangeHtml:function(config){
                var lc = config.languageConfig,
                    type = config.type,
                    className = "";
                //外层皮肤
                var html = "<div class=\"zr-datepicker-wrap zr-datepicker-range\">";
                //tab切换
                html+="<div class=\"zr-datepicker\">";
                if(config.isTabSwitch){
                    html+="<div class=\"zr-datepicker-tabs\">";
                    html+="<div class=\"zr-datepicker-tab zr-datepicker-tab-date zr-datepicker-tab-selected\">"+lc.tab.dateText+"</div>";
                    html+="<div class=\"zr-datepicker-tab zr-datepicker-tab-time\">"+lc.tab.timeText+"</div>";
                    html+="</div>";
                }
                //左侧日期控件
                html+="<div class=\"zr-datepicker-content-range\">";
                //头部日组装
                className = "zr-datepicker-header zr-datepicker-header-date zr-datepicker-header-show";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-month\"><i class=\"zricon-arrow-left\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-date-title\"><span class='zr-datepicker-year-text'>" + config._moment.format(lc.monthFormat) + "</span>&nbsp;<span class='zr-datepicker-month-text'>" + config._moment.format(lc.monthOfDayFormat) + "</span></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-month\"><i class=\"zricon-arrow-right\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部月组装
                className = "zr-datepicker-header zr-datepicker-header-month";
                html += "<div class=\""+className+"\">";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-month-title\"></div>";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部年组装
                className = "zr-datepicker-header zr-datepicker-header-year";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-year-title\"></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部时间组件
                className = "zr-datepicker-header zr-datepicker-header-time";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-time-title\"></div>";
                html += "</div>";
                //
                html+="<div class=\"zr-datepicker-content zr-datepicker-content-date zr-datepicker-content-show\">";
                html+="<div class=\"zr-datepicker-content-header zr-datepicker-row\">";
                for(var i = 0; i < lc.monthWeek.length; i++){
                    html+="<div class=\"zr-datepicker-col\">"+lc.monthWeek[i]+"</div>";
                }
                html+="</div>";
                html+="<div class=\"zr-datepicker-content-number\">";
                //
                //
                //生成日历
                var dateHtml = datePicker.eventsFn.rebuildDateRangeHtmlFn(config);
                //
                    html += "<div class=\"zr-datepicker-row\">";
                        html += dateHtml;
                    html += "</div>";
                //
                //
                html+="</div>";
                html+="</div>";
                //
                ////月内容组件
                className = "zr-datepicker-content zr-datepicker-content-month";
                className += (type == "month") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += " <div class=\"zr-datepicker-row-month\">";
                html += "<div class=\"zr-datepicker-col-month\">";
                html += "<span>1</span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //年内容组件
                className = "zr-datepicker-content zr-datepicker-content-year";
                className += (type == "year") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += "<div class=\"zr-datepicker-row-year\">";
                html += "<div class=\"zr-datepicker-col-year\">";
                html += "<span>2009</span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //时间内容组件
                var timeNumber = 0;
                className = "zr-datepicker-content zr-datepicker-content-time";
                className += (type == "time") ? " zr-datepicker-content-show" : "";
                //分析时间格式类型
                var timeType = config.format,
                    _hType = timeType.indexOf("HH") > -1 ? 1 : 0,
                    _mType = timeType.indexOf("mm") > -1 ? 1 : 0,
                    _sType = timeType.indexOf("ss") > -1 ? 1 : 0;
                //
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-hour\">";
                var className = "";
                for(var i = 0; i < 24; i++){
                    className = "zr-datepicker-col-time ";
                    if(!_hType){
                        className += "zr-datepicker-row-disable ";
                    }
                    timeNumber = i;
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-minute\">";
                for(var i = 0; i < 60; i++){
                    className = "zr-datepicker-col-time ";
                    timeNumber = i;
                    if(!_mType){
                        className += "zr-datepicker-row-disable ";
                    }
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-second\">";
                for(var i = 0; i < 60; i++){
                    className = "zr-datepicker-col-time ";
                    timeNumber = i;
                    if(!_sType){
                        className += "zr-datepicker-row-disable ";
                    }
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html+="</div>";



                //右侧日期控件
                html+="<div class=\"zr-datepicker-content-range\">";
                //头部日组装
                className = "zr-datepicker-header zr-datepicker-header-date zr-datepicker-header-show";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-month\"><i class=\"zricon-arrow-left\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-date-title\"><span class='zr-datepicker-year-text'>" + config.rangeDate.format(lc.monthFormat) + "</span>&nbsp;<span class='zr-datepicker-month-text'>" + config.rangeDate.format(lc.monthOfDayFormat) + "</span></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-month\"><i class=\"zricon-arrow-right\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部月组装
                className = "zr-datepicker-header zr-datepicker-header-month";
                html += "<div class=\""+className+"\">";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-month-title\"></div>";
                html += "<div style='visibility: hidden' class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部年组装
                className = "zr-datepicker-header zr-datepicker-header-year";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-prev-year\"><i class=\"zricon-previous-empty\"></i></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-year-title\"></div>";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-next-year\"><i class=\"zricon-next-empty\"></i></div>";
                html += "</div>";
                //头部时间组件
                className = "zr-datepicker-header zr-datepicker-header-time";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-inline zr-datepicker-time-title\"></div>";
                html += "</div>";
                //
                html+="<div class=\"zr-datepicker-content zr-datepicker-content-date zr-datepicker-content-show\">";
                html+="<div class=\"zr-datepicker-content-header zr-datepicker-row\">";
                for(var i = 0; i < lc.monthWeek.length; i++){
                    html+="<div class=\"zr-datepicker-col\">"+lc.monthWeek[i]+"</div>";
                }
                html+="</div>";
                html+="<div class=\"zr-datepicker-content-number\">";
                //
                //
                //生成日历
                var dateHtml = datePicker.eventsFn.rebuildDateRangeHtmlFn(config,config.rangeDate);
                //
                html += "<div class=\"zr-datepicker-row\">";
                html += dateHtml;
                html += "</div>";
                //
                //
                html+="</div>";
                html+="</div>";
                //
                ////月内容组件
                className = "zr-datepicker-content zr-datepicker-content-month";
                className += (type == "month") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += " <div class=\"zr-datepicker-row-month\">";
                html += "<div class=\"zr-datepicker-col-month\">";
                html += "<span>1</span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //年内容组件
                className = "zr-datepicker-content zr-datepicker-content-year";
                className += (type == "year") ? " zr-datepicker-content-show" : "";
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += "<div class=\"zr-datepicker-row-year\">";
                html += "<div class=\"zr-datepicker-col-year\">";
                html += "<span>2009</span>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                //时间内容组件
                var timeNumber = 0;
                className = "zr-datepicker-content zr-datepicker-content-time";
                className += (type == "time") ? " zr-datepicker-content-show" : "";
                //分析时间格式类型
                var timeType = config.format,
                    _hType = timeType.indexOf("HH") > -1 ? 1 : 0,
                    _mType = timeType.indexOf("mm") > -1 ? 1 : 0,
                    _sType = timeType.indexOf("ss") > -1 ? 1 : 0;
                //
                html += "<div class=\""+className+"\">";
                html += "<div class=\"zr-datepicker-content-number\">";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-hour\">";
                var className = "";
                for(var i = 0; i < 24; i++){
                    className = "zr-datepicker-col-time ";
                    if(!_hType){
                        className += "zr-datepicker-row-disable ";
                    }
                    timeNumber = i;
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-minute\">";
                for(var i = 0; i < 60; i++){
                    className = "zr-datepicker-col-time ";
                    timeNumber = i;
                    if(!_mType){
                        className += "zr-datepicker-row-disable ";
                    }
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "<div class=\"zr-datepicker-row-time zr-datepicker-row-time-second\">";
                for(var i = 0; i < 60; i++){
                    className = "zr-datepicker-col-time ";
                    timeNumber = i;
                    if(!_sType){
                        className += "zr-datepicker-row-disable ";
                    }
                    if(i == 0){
                        className += "zr-datepicker-col-time-choose";
                    }
                    if(i < 10){
                        timeNumber = "0" + timeNumber;
                    }
                    html += "<div data-time='"+i+"' class=\""+className+"\">"+timeNumber+"</div>";
                }
                html += "</div>";
                html += "</div>";
                html += "</div>";
                html+="</div>";
                //
                html += "<div class=\"zr-datepicker-clear\"></div>";
                //底部按钮
                html+="<div class=\"zr-datepicker-footer\">";
                html+="<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn-clear\">清空</a>";
                html+="<div class=\"zr-datepicker-btn-tools\">";
                // html+="<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-now\">现在</a>";
                html+="<a href=\"javascript:void(0);\" class=\"zr-datepicker-btn zr-datepicker-btn-ok\">确认</a>";
                html+="</div>";
                html+="</div>";
                html+="</div>";
                html+="</div>";
                return html;
            },
            //rebuild HTML for date time
            rebuildDateHtmlFn:function(config){
                var obj = datePicker.eventsFn.reloadDateArrayFn(config),
                    key = obj.key,
                    dateArray = obj.rets;
                var html = "",
                    chooseWeek = "";
                if(config.type == "week"){
                    chooseWeek = config._chooseMoment.format("YYYY-WW");
                }else{
                    chooseWeek = config._moment.format("YYYY-WW");
                }
                //
                // console.log(obj.rets[0].moment.day());
                //
                // console.log(obj.rets[1].moment.format("YYYY-MM-DD"));
                //
                // console.log(obj.rets[1].moment.format("YYYY-MM-DD"));
                //
                $.each(dateArray,function(i,n){
                    // console.log(n.moment.format("YYYY-MM-DD"))
                    var _week = n.moment.format("YYYY-WW"),
                        nowWeek = parseInt(n.moment.format("WW")),
                        nowYear = parseInt(n.moment.format("YYYY"));
                    var max = moment(config.maxDate),
                        maxYear = parseInt(max.format("YYYY")),
                        maxWeek = parseInt(max.format("WW")),
                        min = moment(config.minDate),
                        minYear = parseInt(min.format("YYYY")),
                        minWeek = parseInt(min.format("WW"));
                    //

                    //
                    if(i == 0 && config.type == "week"){
                        var className = "";
                        if(_week == chooseWeek){
                            className = "zr-datepicker-row zr-datepicker-line-choose ";

                        }else{
                            className = "zr-datepicker-row ";
                        }
                        if(nowYear < minYear || nowYear > maxYear || (nowYear <= maxYear && nowYear >= minYear && (nowWeek < minWeek || nowWeek > maxWeek))){
                            className += "zr-datepicker-unchoose "
                        }
                        html += "<div class=\""+className+"\">";
                    }
                    //
                    if(i % 8 === 0 && i !== 0 && config.type == "week"){
                        var className = "";
                        if(_week == chooseWeek){
                            className = "zr-datepicker-row zr-datepicker-line-choose "
                        }else{
                            className = "zr-datepicker-row ";
                        }
                        if(nowYear < minYear || nowYear > maxYear || (nowYear <= maxYear && nowYear >= minYear && (nowWeek < minWeek || nowWeek > maxWeek))){
                            className += "zr-datepicker-unchoose "
                        }
                        html += "</div><div class=\""+className+"\">";
                    }
                    //
                    var className = "zr-datepicker-col ";
                    if(!n.rangeStatus){
                        className += "zr-datepicker-unrange ";
                    }
                    if(n.defaultDay && config.type !== "week"){
                        className += "zr-datepicker-choose ";
                    }
                    if(n.nowDay && config.type !== "week"){
                        className += "zr-datepicker-default ";
                    }
                    if(n.isWeek){
                        className += "zr-datepicker-readonly ";
                    }
                    if(n.unChoose && config.type !== "week"){
                        className += "zr-datepicker-unchoose ";
                    }
                    html += "<div class='"+className+"' data-index='"+i+"' data-time='"+key+"'>";

                    if(n.isWeek){
                        html += "<span>"+n.moment.format("WW")+"</span>";
                    }else{
                        html += "<span>"+n.moment.get("date")+"</span>";
                    }

                    html += "</div>";
                })
                return html;
            },
            //rebuild HTML for date Range pip
            rebuildDateRangeHtmlFn:function(config,time){
                var obj = datePicker.eventsFn.reloadDateRangeArrayFn(config,time),
                    key = obj.key,
                    dateArray = obj.rets;
                var html = "";
                //
                // console.log(obj.rets[0].moment.day());
                //
                // console.log(obj.rets[1].moment.format("YYYY-MM-DD"));
                //
                // console.log(obj.rets[1].moment.format("YYYY-MM-DD"));
                //
                $.each(dateArray,function(i,n){
                    // console.log(n.moment.format("YYYY-MM-DD"))
                    var _week = n.moment.format("YYYY-WW");
                    var className = "zr-datepicker-col ";
                    if(!n.rangeStatus){
                        className += "zr-datepicker-unrange ";
                    }
                    if(n.defaultDay){
                        className += "zr-datepicker-range-default ";
                    }
                    if(n.nowDay){
                        className += "zr-datepicker-default ";
                    }
                    if(n.isWeek){
                        className += "zr-datepicker-readonly ";
                    }
                    if(n.defaultDayRange){
                        className += "zr-datepicker-choose-col ";
                    }
                    if(n.unChoose){
                        className += "zr-datepicker-unchoose ";
                    }
                    html += "<div class='"+className+"' data-index='"+i+"' data-time='"+key+"'>";


                    html += "<span>"+n.moment.get("date")+"</span>";


                    html += "</div>";
                })
                return html;
            },
            //Rebuild date items by options.type
            reloadDateArrayFn:function(options){
                var defaults = {
                    time:options._pageTime ? options._pageTime : options.initialDate
                }
                options = $.extend(defaults,options)
                //月数组
                var rets = [];
                //
                //
                var _start = moment(options.time).startOf("month"),
                    _end = moment(options.time).endOf("month"),
                    _startDay = _start.day(),
                    _endDay = _end.day(),
                    _monthDays = _end.get("date");
                var lastLineMax = 6;
                //
                var maxMoment = 35;
                //
                if(options.type == "week"){
                    var weekIndex = 0;
                    var _per = 7;
                    // lastLineMax = 7;
                    if(_startDay == 0){
                        _startDay = 6;
                        _per = 5;
                    }else{
                        _startDay -= 1;
                    }
                    maxMoment = 40;

                    for(var i = _startDay ; i > 0; i--){
                        var nowDay = 0;
                        _start = moment(options.time).startOf("month");
                        _startDay = _start.day();
                        var _loopDay = _start.day(_startDay-i);
                        if(moment(new Date()).format("YYYY-MM-DD") == _loopDay.format("YYYY-MM-DD")){
                            nowDay = 1;
                        }
                        rets.push({
                            moment:_loopDay,
                            //是否是本月范围时间
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay
                        });
                        if((weekIndex % _per === 0 && weekIndex != 0) || (i == 1 && _per != 5)){
                            rets.unshift({
                                moment:_loopDay,
                                //是否是本月范围时间
                                rangeStatus:0,
                                //是否是当天
                                defaultDay:0,
                                //是否是当天
                                nowDay:nowDay,
                                //是否是周日期
                                isWeek:true
                            });
                        }
                        //
                            weekIndex++;
                    }
                }else{
                    for(var i = _startDay ; i > 0; i--){
                        var nowDay = 0;
                        var unchoose = 0;
                        _start = moment(options.time).startOf("month");
                        _startDay = _start.day();
                        if(moment(new Date()).format("YYYY-MM-DD") == _start.day(_startDay-i).format("YYYY-MM-DD")){
                            nowDay = 1;
                        }
                        var _nm = _start.day(_startDay-i);
                        if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                            unchoose = 1;
                        }
                        rets.push({
                            moment:_nm,
                            //是否是本月范围时间
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否是最大最小时间段
                            unChoose:unchoose
                        });
                    }
                }
                //

                //
                //
                for(var i = 1; i <= _monthDays; i++){
                    _start = moment(options.time).startOf("month");
                    var defaultDay = 0;
                    var nowDay = 0;
                    var unchoose = 0;
                    if(moment(options.initialDate).format("YYYY-MM-DD") == _start.date(i).format("YYYY-MM-DD")){
                        defaultDay = 1;
                    }
                    if(moment(new Date()).format("YYYY-MM-DD") == _start.date(i).format("YYYY-MM-DD")){
                        nowDay = 1;
                    }

                    //
                    var _nm = _start.date(i);
                    if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                        unchoose = 1;
                    }
                    //
                    if(weekIndex % 7 === 0){
                        rets.push({
                            moment:_nm,
                            //是否是本月范围时间
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否是周日期
                            isWeek:true
                        });
                    }
                    //
                    rets.push({
                        moment:_nm,
                        rangeStatus:1,
                        //是否是传入值选中天
                        defaultDay:defaultDay,
                        //是否是当天
                        nowDay:nowDay,
                        //是否是最大最小时间段
                        unChoose:unchoose
                    });
                    //
                    if(options.type === "week"){
                        weekIndex++;
                    }
                }
                //
                //
                for(var i = _endDay; i < lastLineMax;  i++){
                    _end = moment(options.time).endOf("month");
                    var nowDay = 0;
                    var unchoose = 0;
                    if(moment(new Date()).format("YYYY-MM-DD") == _end.day(i+1).format("YYYY-MM-DD")){
                        nowDay = 1;
                    }
                    var _nm = _end.day(i+1);
                    if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                        unchoose = 1;
                    }
                    if(weekIndex % 7 === 0 && options.type === "week"){
                        rets.push({
                            moment:_nm,
                            //是否是本月范围时间
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否是周日期
                            isWeek:true
                        });
                    }
                    rets.push({
                        moment:_nm,
                        rangeStatus:0,
                        //是否是当天
                        defaultDay:0,
                        //是否是当天
                        nowDay:nowDay,
                        //是否是最大最小时间段
                        unChoose:unchoose
                    });
                    //
                    //
                    //
                    if(options.type === "week"){
                        weekIndex++;
                    }
                }
                //
                //总周数组
                var rl = rets.length % 8,
                    rl_fix = 8 - rl;
                if(options.type == "week" && rl > 0){
                    var lastDate = rets[rets.length - 1],
                        time = lastDate.moment.format("YYYY-MM-DD HH:mm:ss");
                    time = moment(time);
                    // console.log(time.set('date', 2).format("YYYY-MM-DD"))

                    //
                    //
                    //
                    //
                    //
                    //
                    for(var index = 1; index <= rl_fix; index++){
                        var _t = time.add(index,"days");
                        rets.push({
                            moment:_t,
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay
                        });
                    }
                    //
                    if(weekIndex % 7 === 0 && options.type === "week"){
                        rets.push({
                            moment:_end.day(i+1),
                            //是否是本月范围时间
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否是周日期
                            isWeek:true
                        });
                    }
                    if(options.type === "week"){
                        weekIndex++;
                    }
                    //

                    //
                    // console.log(rets[rets.length - 1].moment.format("YYYY-MM-DD"))


                }
                //
                if(rets.length == maxMoment){
                    for(var i = 1; i <= 7; i++){
                        var latest = moment(rets[maxMoment - 1].moment.format("YYYY-MM-DD HH:mm:ss"));
                        var _m = latest.add(i,"days");
                        var nowDay = 0;
                        var unchoose = 0;
                        if(moment(new Date()).format("YYYY-MM-DD") == _m.format("YYYY-MM-DD")){
                            nowDay = 1;
                        }
                        if(moment(options.maxDate).unix() < _m.unix() || moment(options.minDate).unix() > _m.unix()){
                            unchoose = 1;
                        }

                        if(weekIndex % 7 === 0 && options.type === "week"){
                            rets.push({
                                moment:_m,
                                //是否是本月范围时间
                                rangeStatus:0,
                                //是否是当天
                                defaultDay:0,
                                //是否是当天
                                nowDay:nowDay,
                                //是否是周日期
                                isWeek:true
                            });
                        }
                        rets.push({
                            moment:_m,
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否是最大最小时间段
                            unChoose:unchoose
                        });
                        //
                        if(options.type === "week"){
                            weekIndex++;
                        }

                    }
                }
                //存储日期控件
                var key = moment(options.time).format("YYYY-MM");
                zr.fn.datePicker.month[key] = rets;
                //
                return {
                    rets:rets,
                    key:key,
                    _moment:moment(options.time)
                };
            },
            reloadDateRangeArrayFn:function(options,time){
                var defaults = {
                    time:time
                };
                options = $.extend(defaults,options);
                //月数组
                var rets = [];
                var unchoose = 0;
                //
                //
                var _start = moment(options.time).startOf("month"),
                    _end = moment(options.time).endOf("month"),
                    _startDay = _start.day(),
                    _endDay = _end.day(),
                    _monthDays = _end.get("date");
                var lastLineMax = 6;
                //
                var maxMoment = 35;
                //
                for(var i = _startDay ; i > 0; i--){
                    var nowDay = 0;
                    _start = moment(options.time).startOf("month");
                    _startDay = _start.day();
                    if(moment(new Date()).format("YYYY-MM-DD") == _start.day(_startDay-i).format("YYYY-MM-DD")){
                        nowDay = 1;
                    }
                    var _nm = _start.day(_startDay-i);
                    if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                        unchoose = 1;
                    }

                    rets.push({
                        moment:_nm,
                        //是否是本月范围时间
                        rangeStatus:0,
                        //是否是默认选中
                        defaultDay:0,
                        //是否是当天
                        nowDay:nowDay,
                        //是否默认勾选
                        defaultDayRange:0,
                        //是否符合最大最小
                        unChoose:unchoose
                    });
                }

                //

                //
                //
                for(var i = 1; i <= _monthDays; i++){
                    _start = moment(options.time).startOf("month");
                    var defaultDay = 0;
                    var nowDay = 0;
                    var defaultDayRange = 0;
                    var unchoose = 0;
                    if(datePicker.options.rangeDefault){
                        defaultDayRange = 1;
                    }
                    if(moment(options.initialDate).format("YYYY-MM-DD") == _start.date(i).format("YYYY-MM-DD") ){
                        defaultDay = 1;
                        defaultDayRange = 1;
                        datePicker.options.rangeDefault = 1;
                    }
                    if(options.rangeDate.format("YYYY-MM-DD") == _start.date(i).format("YYYY-MM-DD")){
                        defaultDay = 1;
                        defaultDayRange = 1;
                        datePicker.options.rangeDefault = 0;
                    }
                    if(moment(new Date()).format("YYYY-MM-DD") == _start.date(i).format("YYYY-MM-DD")){
                        nowDay = 1;
                    }
                    //
                    var _nm = _start.date(i);

                    if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                        unchoose = 1;
                    }
                    //
                    rets.push({
                        moment:_nm,
                        rangeStatus:1,
                        //是否是传入值选中天
                        defaultDay:defaultDay,
                        //是否是当天
                        nowDay:nowDay,
                        //是否默认勾选
                        defaultDayRange:defaultDayRange,
                        unChoose:unchoose
                    });
                }
                //
                //
                for(var i = _endDay; i < lastLineMax;  i++){
                    _end = moment(options.time).endOf("month");
                    var nowDay = 0;
                    if(moment(new Date()).format("YYYY-MM-DD") == _end.day(i+1).format("YYYY-MM-DD")){
                        nowDay = 1;
                    }
                    var unchoose = 0;
                    var _nm = _end.day(i+1);
                    if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                        unchoose = 1;
                    }
                    rets.push({
                        moment:_nm,
                        rangeStatus:0,
                        //是否是当天
                        defaultDay:0,
                        //是否是当天
                        nowDay:nowDay,
                        //是否默认勾选
                        defaultDayRange:0,
                        unChoose:unchoose
                    });
                    //
                    //
                }
                //
                //总周数组
                var rl = rets.length % 8,
                    rl_fix = 8 - rl;
                if(options.type == "week" && rl > 0){
                    var lastDate = rets[rets.length - 1],
                        time = lastDate.moment.format("YYYY-MM-DD HH:mm:ss");
                    time = moment(time);
                    // console.log(time.set('date', 2).format("YYYY-MM-DD"))
                    //
                    //
                    for(var index = 1; index <= rl_fix; index++){
                        var _t = time.add(index,"days");
                        var unchoose = 0;
                        var _nm = _t;
                        if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                            unchoose = 1;
                        }
                        rets.push({
                            moment:_nm,
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否默认勾选
                            defaultDayRange:0,
                            unChoose:unchoose
                        });
                    }
                    //
                }
                //
                if(rets.length == maxMoment){
                    for(var i = 1; i <= 7; i++){
                        var latest = moment(rets[maxMoment - 1].moment.format("YYYY-MM-DD HH:mm:ss"));
                        var _m = latest.add(i,"days");
                        var nowDay = 0;
                        var unchoose = 0;
                        if(moment(new Date()).format("YYYY-MM-DD") == _m.format("YYYY-MM-DD")){
                            nowDay = 1;
                        }
                        var _nm = _m;
                        if(moment(options.maxDate).unix() < _nm.unix() || moment(options.minDate).unix() > _nm.unix()){
                            unchoose = 1;
                        }
                        rets.push({
                            moment:_nm,
                            rangeStatus:0,
                            //是否是当天
                            defaultDay:0,
                            //是否是当天
                            nowDay:nowDay,
                            //是否默认勾选
                            defaultDayRange:0,
                            unChoose:unchoose
                        });
                        //

                    }
                }
                //存储日期控件
                var key = moment(options.time).format("YYYY-MM");
                zr.fn.datePicker.month[key] = rets;
                //
                return {
                    rets:rets,
                    key:key,
                    _moment:moment(options.time)
                };
            }

        },
        ajax:{

        }
    }
    //
    zr.dom.clickQueen.push(function(){
        var $pickers = $(".zr-datepicker-wrap");
        $pickers.each(function(){
            var options = $(this).data("options"),
                _moment = $(this).data("moment");
            options.onClose.call(options,_moment.format("YYYY-MM-DD HH:mm:ss"));
        })
        $pickers.remove();
    })
    //
    return {
       init:datePicker.init
    }
},{requires:["jquery","./js/moment","./css/index.css"]})
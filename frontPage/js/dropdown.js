var _dropdown = {
        uid:20300000,
        version:"1.0.0",
        init:function(domObject){
            this.options._obj = domObject;
            // this.events.eventList(domObject.array);
            this.events.init(domObject.array);
        },
        options:{
            _obj:{},//公共变量，永远不会变
        },
        events:{
            //事件触发角
            eventList:function(array){
                console.log('2',array);
                var eventName = "",
                    centerName = "",
                    _w1 = 0,
                    $menu,
                    _w2 = 0,
                    _l1 = 0;
                //事件列表
                $.each(array,function(i,n){
                    var _this = this;
                    //居中方式
                    centerName = $(this).hasClass(_dropdown.options._obj.options.centerClassName);
                    if(centerName){
                        _w1 = parseFloat($(this).width());
                        $menu = $(this).find("."+_dropdown.options._obj.options.menuClassName);
                        if($menu.length){
                            _w2 = parseFloat($menu.width());
                            _l1 = _w1/2 - _w2/2;
                            $menu.css("left",_l1);
                        }
                    }
                    //
                    eventName = $(this).attr(_dropdown.options._obj.options.domEventName);
                    $(this).on(eventName === "click" ? eventName : "click mouseover",function(ev){
                        ev.stopPropagation();
                        if(ev.type === "click" && $(this).hasClass(_dropdown.options._obj.options.showMenuClassName)){
                            $(this).removeData(_dropdown.options._obj.options.cacheName);
                            $(this).removeClass(_dropdown.options._obj.options.showMenuClassName);
                            return false;
                        }
                        //显示中
                        $(this).data(_dropdown.options._obj.options.cacheName,1);
                        $(this).addClass(_dropdown.options._obj.options.showMenuClassName);
                        //屏幕底部自动调整位置
                        //先判断select显示出来是不是会超出屏幕底部
                        var top=$(this).offset().top,
                            height=$(this).parent().find("."+_dropdown.options._obj.options.menuClassName).height(),
                            clientHeight=$(window).height(),
                            documentTop=$(document).scrollTop();
                        var ht=clientHeight-(top-documentTop)-$(this).height();
                        ht=parseInt(Math.abs(ht));
                        if(ht<parseInt(height)){
                            //到可视窗口底部距离要小于下拉框的距离，此时下拉框要朝上
                            $(this).parent().find("."+_dropdown.options._obj.options.menuClassName).css({
                                top:"-"+(parseInt(height)+5)+"px"
                            })
                        }else{
                            $(this).parent().find("."+_dropdown.options._obj.options.menuClassName).css({
                                top:"36px"
                            })
                        }
                    })
                    if(eventName !== "click"){
                        $(this).on("mouseout",function(ev){
                            var _this = this;
                            $(this).removeData(_dropdown.options._obj.options.cacheName);
                            Zr.tools.later(function(){
                               if(!$(_this).data(_dropdown.options._obj.options.cacheName)){
                                   $(_this).removeData(_dropdown.options._obj.options.cacheName);
                                   $(_this).removeClass(_dropdown.options._obj.options.showMenuClassName);
                               }
                            },150);
                        })
                    }
                    //阻止向上冒泡
                    $(this).find("."+_dropdown.options._obj.options.menuClassName).on("click",function(ev){
                        ev.stopPropagation();
                        Zr.tools.later(function(){
                            $(_this).removeData(_dropdown.options._obj.options.cacheName);
                            $(_this).removeClass(_dropdown.options._obj.options.showMenuClassName);
                        },300);
                    })

                })
                //点击其他地方取消相关样式
                // zr.dom.clickQueen.push(function(){
                //     $.each(array,function(i,n){
                //         $(this).removeClass(_dropdown.options._obj.options.showMenuClassName);
                //     })
                // })
            },
            init: function(array){
                $('.zr-dropdown').each(function (index, element) {
                    var $element = $(element),
                        $link = $element.children('.zr-dropdown-link'),
                        $menu = $element.children('.zr-dropdown-menu');
            
                    var type = $element.attr('data-type'),
                        menuwidth = $element.attr('data-menuwidth'),
                        menuheight = $element.attr('data-menuheight'),
                        closeauto = $element.attr('data-close-auto'),
                        closescroll = $element.attr('data-close-scroll'),
                        closeresize = $element.attr('data-close-resize');
            
                    //整体禁用
                    if ($element.hasClass('zr-dropdown-disabled')) {
                        return;
                    }
            
                    //事件委托 阻止冒泡
                    $element.on('click', '.zr-dropdown-item-disabled', function (ev) {
                        ev.stopPropagation();
                        return false;
                    })
                    $element.on('click', '.zr-dropdown-item', function (ev) {
                        ev.stopPropagation();
                    })
            
                    //自定义属性
                    //展开框宽度限定
                    if (menuwidth) {
                        $menu.css('width', menuwidth);
                    }
                    if (menuheight) {
                        $menu.css('height', menuheight);
                    }
                    //自动计算高度
                    var autoHeight = function () {
                        /**
                         * 根据视窗距离屏幕上下距离,决定向上展示还是向下展示.
                         * 上下同时不够,向下展开
                         */
                        var element_t = $element.offset().top,
                            element_h = $element.height(),
                            window_h = $(window).height(),
                            scroll_h = $(document).scrollTop(),
                            menu_pt_h = $menu.css('padding-top'),
                            menu_pb_h = $menu.css('padding-bottom'),
                            menu_h = $menu.height() + parseFloat(menu_pt_h) + parseFloat(menu_pb_h);
                        //距离
                        var bottom_h = window_h - (element_t - scroll_h) - element_h,
                            top_h = window_h - bottom_h - element_h;
            
                        if (menu_h < bottom_h) {
                            $element.removeClass('zr-dropdown-up'); //down
                        } else if (menu_h < top_h) {
                            $element.addClass('zr-dropdown-up'); //up
                        } else {
                            $element.removeClass('zr-dropdown-up'); //down
                        }
                    }
                    $(window).scroll(function () {
                        if (!closeauto && !closescroll) autoHeight();
                    })
                    $(window).resize(function () {
                        if (!closeauto && !closeresize) autoHeight();
                    })
                    //初始化
                    if (!closeauto) autoHeight();
                    //展开方式
                    if (type === 'click') {
                        $element.on('click', function (ev) {
                            ev.stopPropagation();
                            if (!closeauto) autoHeight();
                            $element.hasClass('open') ? $element.removeClass('open') : $element.addClass('open');
                        })
                    } else {
                        $element.on('mouseenter', function (ev) {
                            ev.stopPropagation();
                            if (!closeauto) autoHeight();
                            $element.addClass('open');
                        })
                        $element.on('mouseleave', function (ev) {
                            ev.stopPropagation();
                            $element.removeClass('open');
                        })
                    }
                })
                //点击其他地方取消相关样式
                var zr = Zr;
                zr.dom.clickQueen.push(function(){
                    $.each(array,function(i,n){
                        $(this).removeClass('open');
                    })
                })
            }
        },
        eventFn:{},
        ajax:{}
}
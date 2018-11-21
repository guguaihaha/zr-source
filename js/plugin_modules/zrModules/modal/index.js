Zr.add("./zrModules/modal/",function(zr,$){
    //第一个参数是需要调用的模态框class或者id，第二个是参数配置
    var modal={
        options:{
          opts:{
          },
          elements:""
        },
        init:function(element,opts){
            return modal.eventsFn.modalFn(element,opts);
        },
        event:{

        },
        eventsFn:{
            //隐藏模态框
            hideModalFn:function(){
                var $dom = $(this).closest(".zr-modal");
                var opts = $dom.data("options");
                $dom.hide();
                opts.closeCallback && opts.closeCallback($dom[0]);
            },
            //模态框的移动
            modalMoveFn:function(opts,elem){
                var modals=$(elem).find(".zr-modal-content").get(0);
                if(opts.move){
                    $(elem).find(".zr-modal-content").addClass("zr-modal-content-move");
                    modals.onmousedown = function(ev) {
                        var oevent = ev || event,
                            width=$(modals).width(),
                            height=$(modals).height();
                        var distanceX = oevent.clientX - modals.offsetLeft-width/2;
                        var distanceY = oevent.clientY - modals.offsetTop;
                        document.onmousemove = function (ev) {
                           var oevent = ev || event,
                               left=oevent.clientX - distanceX - width/ 2,
                               right=$(window).width()-oevent.clientX-(width-distanceX)+width/2,
                               top=oevent.clientY - distanceY,
                               bottom=$(window).height()-oevent.clientY-(height-distanceY);
                           if(left<0 || right<0){
                               if(left<0){
                                   modals.style.left=0+width/2+"px";
                               }else if(right<0){
                                   modals.style.left=$(window).width()-width/2+"px";
                               }

                           }else{
                               modals.style.left = oevent.clientX - distanceX + 'px';
                           }
                            if(top<0 || bottom<0){
                                //顶部和底部触底
                                if(top<0){
                                    modals.style.top = 0+ 'px';
                                }else if(bottom<0){
                                    modals.style.top=$(window).height()-height+"px";
                                }
                            }else{
                                modals.style.top = oevent.clientY - distanceY + 'px';
                            }
                        };
                        document.onmouseup = function () {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        };
                    };
                }
            },
            modalResizeFn:function(){
                $(window).on("resize",function(){
                    if(timer){
                        clearTimeout(timer);
                    }
                    var timer=setTimeout(function(){
                        var visible=$(".zr-modal:visible");
                        if(visible.length>0){
                            var isMove=visible.data("isMove"),
                                opts=visible.data("options");
                            if(isMove=="1"){
                                modal.eventsFn.middle(opts);
                            }
                        }
                    },100)
                })
            },
            //
            modalFn:function(element,opts){
                var dom=zr.dom.find(element);
                opts = $.extend({
                    top:"",
                    elements:dom,
                    move:false,
                    openCallback:function(){return false},
                    closeCallback:function(){return false}
                },opts||{});
                $.each(dom,function(index,elem){
                    //console.log($(this).find(".zr-modal-title"))
                    $(this).data("options",opts);
                    if(opts.move){
                        //0代表可拖拽拖动浏览器窗口不移动
                        $(this).data("isMove","0")
                    }else{
                        //1代表拖拽浏览器窗口重新计算
                        $(this).data("isMove","1")
                    }
                    modal.eventsFn.modalResizeFn()
                    //模态框移动
                    modal.eventsFn.modalMoveFn($(this).data("options"),elem);
                    //关闭浮层调用
                    $(this).find(".zr-modal-title .zr-modal-close").off("click").on("click",modal.eventsFn.hideModalFn);
                    $(this).find(".zr-modal-footer .zr-modal-cancel").off("click").on("click",modal.eventsFn.hideModalFn);
                })

                //返回打开和关闭的回调函数
                return {
                    show:function(){
                        $(dom).show(0,function(){
                            //默认垂直居中，可自定义top
                            modal.eventsFn.middle(opts);
                        });
                        opts.openCallback && opts.openCallback(dom);
                    },
                    hide:function(){
                        $(dom).hide();
                        modal.options.opts.closeCallback && modal.options.opts.closeCallback(dom);
                    }
                }
            },
            middle:function(opts){
                if(opts.top!="" && (typeof opts.top=="number")){
                    $(opts.elements).find(".zr-modal-content").css({
                        "marginTop":opts.top+"px"
                    })
                    if(opts.move){
                        var width=$(opts.elements).find(".zr-modal-content").width();
                        $(opts.elements).find(".zr-modal-content").css({
                            "left":"50%",
                            "marginLeft":-width/2+"px"
                        });
                    }
                }else{
                    var height=$(opts.elements).find(".zr-modal-content").height(),
                        clientHeight=$(window).height()-$(opts.elements).find(".zr-modal-content").height();
                    if(opts.move){
                        var width=$(opts.elements).find(".zr-modal-content").width();
                        $(opts.elements).find(".zr-modal-content").css({
                            "top":clientHeight/2+"px",
                            "left":"50%",
                            "marginLeft":-width/2+"px"
                        });
                    }else{
                        $(opts.elements).find(".zr-modal-content").css({
                            "marginTop":clientHeight/2+"px"
                        });
                    }
                }
            },
            resetMiddle:function(){
                modal.eventsFn.middle();
            }
        }
    }
    return {
        init:modal.init
    }
},{requires:["jquery","/zrModules/modal/css/index.css"]})
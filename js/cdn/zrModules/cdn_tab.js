Zr.add("./zrModules/cdn_tab", function (zr, $) {
    var _tabs = {
        init: function () {
            this.events.typeTab();
            this.events.addTab();
            this.events.deleteTab();
            this.eventFn.arrowStatusFn();
        },
        events: {
            typeTab: function () {
                $(".zr-tab-list .zr-listli").unbind("click").bind("click", _tabs.eventFn.tabFn);
            },
            addTab: function () {
                $(".zr-tab-add").unbind("click").bind("click", _tabs.eventFn.addTabFn);

            },
            deleteTab: function () {
                $(".zricon-close").unbind("click").bind("click", _tabs.eventFn.deleteTabFn);
            }
        },
        eventFn: {
            //tab页签切换
            tabFn: function () {
                var i = $(this).index();
                $(this).addClass("zr-curli").siblings().removeClass("zr-curli");
                $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-item").eq(i).addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                if ($(this).hasClass("zr-disable")) {
                    $(this).removeClass("zr-curli");
                    $(this).prev().addClass("zr-curli");
                    $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-item").eq(i).removeClass("zr-tab-show");
                    $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-item").eq(i).prev().addClass("zr-tab-show");
                }
            },
            //新增tab页签
            addTabFn: function () {
                var m = $(".zr-tab-compile .zr-listli").length+1,
                    tabTmpl = '<li class="zr-listli">测试tab'+ m +'<i class="zricon-close"></i></li>',
                    conTmpl = '<div class="zr-tab-item">测试内容区'+ m +'</div>',
                    lastTab = $(".zr-tab-add").siblings(".zr-tab-list").find(".zr-listli:last");
                lastCon = $(".zr-tab-add").closest(".zr-tab").find(".zr-tab-content .zr-tab-item:last");
                lastTab.after(tabTmpl);
                lastCon.after(conTmpl);
                lastTab.next().addClass("zr-curli").siblings().removeClass("zr-curli");
                lastCon.next().addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                _tabs.events.typeTab();
                _tabs.events.deleteTab();
                _tabs.eventFn.arrowStatusFn();
            },
            //删除tab页签
            deleteTabFn: function () {

                var listLi = $(this).closest(".zr-listli"),//定义当前关闭的tab标签
                    i = $(this).closest(".zr-listli").index(),  //获取当前删除tab下标
                    listcon = $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-item").eq(i),//定义当前关闭标签对应的内容框
                    prevListcon = listcon.prev(),//定义当前关闭标签对应内容框的前一个
                    nextListcon = listcon.next(),//定义当前关闭标签对应内容框的后一个
                    prevTab = $(this).closest(".zr-listli").prev(),  //定义当前tab的前一个tab
                    nextTab = $(this).closest(".zr-listli").next();  //定义当前tab的后一个tab
                    // curLi = $(this).closest(".zr-tab").find(".zr-tab-list .zr-curli");//定义当前关闭标签同级下的选中tab

                if (listLi.closest(".zr-tab").find(".zr-listli").length > 1 && nextTab.length>0 ){
                    //删除当前tab后，判断当前所有同级tab是否有选中的，如果没有，则其前一个tab设为选中状态

                    $(".zr-tab-list").find(listLi).remove();
                    $(".zr-tab-content").find(listcon).remove();

                    nextTab.addClass("zr-curli").siblings().removeClass("zr-curli");
                    nextListcon.addClass("zr-tab-show").siblings().removeClass("zr-tab-show");

                }else if(listLi.closest(".zr-tab").find(".zr-listli").length > 1 && nextTab.length==0){
                    //当前删除标签剩余大于1且要删除项为最后一个
                    $(".zr-tab-list").find(listLi).remove();
                    $(".zr-tab-content").find(listcon).remove();

                    prevTab.addClass("zr-curli").siblings().removeClass("zr-curli");
                    prevListcon.addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                }
                _tabs.events.typeTab();
                _tabs.events.addTab();
                _tabs.eventFn.arrowStatusFn();
            },
            //按钮状态
            arrowStatusFn:function () {
                var $list = $(".zr-tab-compile .zr-tab-list"),
                    $listWidth = parseFloat($list.width()),   //页签总宽度
                    $wrapWidth = $(".zr-tab-compile .zr-tab-overflow").width(),     //外包裹宽度
                    $spareWidth = $listWidth - $wrapWidth,                  //长度差
                    $arrowLeft = $(".zr-tab-compile .zr-tab-left"),          //向左箭头
                    $arrowRight = $(".zr-tab-compile .zr-tab-right"),        //向右箭头
                    steps = $spareWidth / 4,                 //步骤
                    time = 100;

                if (steps < 100) {
                    steps = $spareWidth;
                }
                var _ml = parseFloat($list.css("marginLeft") || "0");
                if ($spareWidth > 0) {
                    $arrowLeft.show();
                    $arrowRight.show();
                    if (Math.abs(_ml) > $spareWidth) {
                        $list.animate({"marginLeft": -$spareWidth}, time)
                    }
                } else {
                    $arrowLeft.hide();
                    $arrowRight.hide();
                    $list.stop(true).animate({"marginLeft": 0}, time,function () {
                        _tabs.eventFn.arrowStatusFn();
                    });
                }

                if ($spareWidth > 0 && Math.abs(_ml) < $spareWidth) {
                    $arrowRight.removeClass("zr-tab-disabled");
                } else {
                    $arrowRight.addClass("zr-tab-disabled");
                }
                if (_ml < 0) {
                    $arrowLeft.removeClass("zr-tab-disabled")
                } else {
                    $arrowLeft.addClass("zr-tab-disabled")
                }

                //事件
                $arrowLeft.unbind("click").bind("click", function () {
                    if (!$(this).hasClass("disabled")) {
                        var _ml = parseFloat($list.css("marginLeft")) + steps;
                        if (_ml > 0) {
                            _ml = 0;
                        }
                        $list.stop(true).animate({"marginLeft": _ml}, time, function () {
                            _tabs.eventFn.arrowStatusFn();
                        });

                    }
                })
                $arrowRight.unbind("click").bind("click", function () {
                    if (!$(this).hasClass("disabled")) {
                        var _ml = parseFloat($list.css("marginLeft")) - steps;
                        if (Math.abs(_ml) > $spareWidth) {
                            _ml = -$spareWidth;
                        }
                        $list.stop(true).animate({"marginLeft": _ml}, time, function () {
                            _tabs.eventFn.arrowStatusFn();
                        });

                    }
                })
            }
        }
    }
    return {
        init: function () {
            _tabs.init();
        }
    }
}, {requires: ["jquery"]})

Zr.add("./zrModules/tab", function (zr, $) {
    var _tabs = {
        init: function () {
            this.events.typeTab();
            this.events.addTab();
            this.events.deleteTab();
            this.eventFn.arrowStatusFn();
            this.events.mouseRightDown();
            
        },
        events: {
            typeTab: function () {
                $(".zr-tab-header .zr-tab-item").unbind("click").bind("click", _tabs.eventFn.tabFn);
            },
            addTab: function () {
                $(".zr-tab-add").unbind("click").bind("click", _tabs.eventFn.addTabFn);

            },
            deleteTab: function () {
                $(".zricon-close").unbind("click").bind("click", _tabs.eventFn.deleteTabFn);
            },
            //右键显示menu菜单
            mouseRightDown:function () {
                $(zr.dom.find(".zr-tab-item")).unbind("contextmenu").bind("contextmenu", _tabs.eventFn.mouseRightDownFn);
                $(".zr-disable").unbind("contextmenu").bind("contextmenu", _tabs.eventFn.hideMenuFn);
                $("body").unbind("contextmenu").bind("contextmenu", _tabs.eventFn.hideMenuFn);
                $("body").unbind("click").bind("click", _tabs.eventFn.hideMenuFn);
            }
        },
        eventFn: {
            //tab页签切换
            tabFn: function () {
                if (!$(this).hasClass("zr-disable")) {
                    var i = $(this).index();
                    $(this).addClass("zr-tab-action").siblings().removeClass("zr-tab-action");
                    $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-tabpane").eq(i).addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                }
            },
            //隐藏菜单
            hideMenuFn: function () {
                $(".zr-tab-fix-menu").hide();
            },
            //鼠标右键
            mouseRightDownFn: function (ev) {
                var tmpl;
                tmpl = '<div class = "zr-tab-fix-menu"><ul>';
                tmpl += '<li class="zr-tab-closeOthers">关闭其他</li>';
                tmpl += '</ul></div>';
                var $tab = $(".zr-tab"),
                    $menu = $(".zr-tab-fix-menu");

                if (ev.which == 3) {
                    var x = ev.pageX,
                        y = ev.pageY;
                    var $li = $tab.find(".zr-tab-item"),
                        $menuLi = $("#ev-menu li.closeOthers");
                    var length = $li.length;
                    if (length == 1) {
                        $menuLi.addClass("disabled");
                    } else {
                        $menuLi.removeClass("disabled");
                    }
                    if (!$tab.hasClass("zr-tab-menu")) {
                        $tab.addClass("zr-tab-menu");
                        $("body").append(tmpl);
                    }
                    $menu.css({
                        "left": x,
                        "top": y
                    }).show();

                    //关闭其他标签
                    $(".zr-tab-fix-menu li").unbind("click").bind("click",function () {
                        if ($(this).hasClass("zr-tab-closeOthers") && !$(this).hasClass("disabled")) {
                            var $tabItem = $(ev.delegateTarget),
                                i = $tabItem.index(),
                                $listcon = $tabItem.closest(".zr-tab").find(".zr-tab-content .zr-tab-tabpane").eq(i);
                            $tabItem.siblings(".zr-tab-item").hide();
                            $listcon.siblings(".zr-tab-tabpane").hide();
                            $listcon.addClass("zr-tab-show")
                        }
                    })
                    return false;
                }
            },
            //新增tab页签
            addTabFn: function () {
                var m = $(".zr-tab-compile .zr-tab-item").length + 1,
                    tabTmpl = '<li class="zr-tab-item">测试tab' + m + '<i class="zricon-close"></i></li>',
                    conTmpl = '<div class="zr-tab-tabpane">测试内容区' + m + '</div>',
                    lastTab = $(".zr-tab-add").siblings(".zr-tab-header").find(".zr-tab-item:last");
                lastCon = $(".zr-tab-add").closest(".zr-tab").find(".zr-tab-content .zr-tab-tabpane:last");
                lastTab.after(tabTmpl);
                lastCon.after(conTmpl);
                lastTab.next().addClass("zr-tab-action").siblings().removeClass("zr-tab-action");
                lastCon.next().addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                _tabs.events.typeTab();
                _tabs.events.deleteTab();
                _tabs.eventFn.arrowStatusFn();
            },
            //删除tab页签
            deleteTabFn: function () {

                var listLi = $(this).closest(".zr-tab-item"),//定义当前关闭的tab标签
                    i = $(this).closest(".zr-tab-item").index(),  //获取当前删除tab下标
                    listcon = $(this).closest(".zr-tab").find(".zr-tab-content .zr-tab-tabpane").eq(i),//定义当前关闭标签对应的内容框
                    prevListcon = listcon.prev(),//定义当前关闭标签对应内容框的前一个
                    nextListcon = listcon.next(),//定义当前关闭标签对应内容框的后一个
                    prevTab = $(this).closest(".zr-tab-item").prev(),  //定义当前tab的前一个tab
                    nextTab = $(this).closest(".zr-tab-item").next();  //定义当前tab的后一个tab
                // curLi = $(this).closest(".zr-tab").find(".zr-tab-header .zr-tab-action");//定义当前关闭标签同级下的选中tab

                if (listLi.closest(".zr-tab").find(".zr-tab-item").length > 1 && nextTab.length > 0) {
                    //删除当前tab后，判断当前所有同级tab是否有选中的，如果没有，则其前一个tab设为选中状态

                    $(".zr-tab-header").find(listLi).remove();
                    $(".zr-tab-content").find(listcon).remove();

                    nextTab.addClass("zr-tab-action").siblings().removeClass("zr-tab-action");
                    nextListcon.addClass("zr-tab-show").siblings().removeClass("zr-tab-show");

                } else if (listLi.closest(".zr-tab").find(".zr-tab-item").length > 1 && nextTab.length == 0) {
                    //当前删除标签剩余大于1且要删除项为最后一个
                    $(".zr-tab-header").find(listLi).remove();
                    $(".zr-tab-content").find(listcon).remove();

                    prevTab.addClass("zr-tab-action").siblings().removeClass("zr-tab-action");
                    prevListcon.addClass("zr-tab-show").siblings().removeClass("zr-tab-show");
                }
                _tabs.events.typeTab();
                _tabs.events.addTab();
                _tabs.eventFn.arrowStatusFn();
            },
            //按钮状态
            arrowStatusFn: function () {
                var $list = $(".zr-tab-compile .zr-tab-header"),
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
                    $list.stop(true).animate({"marginLeft": 0}, time, function () {
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

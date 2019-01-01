var _select = {
    uid: 30500000,
    version: "1.0.0",
    init: function (domObject) {
        console.log(domObject);
        this.options._obj = domObject;
        this.events.eventList(domObject);
    },
    options: {
        _obj: {},
    },
    events: {
        eventList: function (opt) {
            $.each(opt.array, function (i, n) {
                // 缓存
                var $n = $(n),
                    optArr = [],
                    htmlArr = [],
                    receptionArr = [],
                    optionArr = [],
                    selectedItem = [],
                    selectedNumber = 0;

                // 获取原生select的value、key、selected
                $n.children().each(function (idx) {
                    var $this = $(this),
                        val = $this.val(),
                        text = $this.text(),
                        selected = $this.prop('selected');

                    // 统计选中数量
                    if (selected) {
                        selectedNumber ++;
                    }

                    selectedItem.push(
                        '<span>' + val + '<i class="zricon-close"></i></span>'
                    );

                    optArr.push({
                        val: val,
                        text: text,
                        selected: selected
                    });
                });

                $n.addClass(_select.options.hideClassName);

                if ($n.prop('multiple')) {
                    // 初始化前台展示框
                    var selectedArr = [];

                    $.each(optArr, function (idx) {
                        if (optArr[idx].selected) {
                            selectedArr.push(
                                '<span>' + optArr[idx].text + ' <i class="zricon-close"></i></span>'
                            );
                        }
                    });

                    receptionArr.push(
                        '<div class="zr-select-reception zr-select-multiple">' +
                        selectedArr.join('') +
                        '<i class="zricon-arrow-down"></i>' +
                        '</div>'
                    );

                    // 初始化全选标签
                    var dtClass = '',
                        spanClass = '';
                    if (selectedNumber === 0) {
                        dtClass = '';
                        spanClass = '';
                    } else if (selectedNumber === optArr.length) {
                        dtClass = 'zr-select-checkbox-checked';
                        spanClass = '';
                    } else {
                        dtClass = 'zr-select-checkbox-checked';
                        spanClass = 'zr-select-checkbox-uncheck';
                    }

                    optionArr.push(
                        '<dt class="' + dtClass + '">' +
                        '<span class="zr-select-checkbox-normal">' +
                        '<span class="' + spanClass + '"></span>' +
                        '</span>' +
                        '<span>全选</span>' +
                        '</dt>'
                    );

                    // 初始化option框
                    $.each(optArr, function (idx) {
                        var ddClass = '',
                            item = optArr[idx];

                        if (item.selected) {
                            ddClass = 'zr-select-checkbox-checked';
                        }

                        optionArr.push(
                            '<dd data-value="' + item.val + '" class="' + ddClass + '">' +
                            '<span class="zr-select-checkbox-normal">' +
                            '<span></span>' +
                            '</span>' +
                            '<span>' + item.text + '</span>' +
                            '</dd>'
                        );
                    });
                } else {
                    var text = '',
                        val = '';

                    if (selectedNumber === 0) {
                        text = optArr[0].text;
                        val = optArr[0].val;
                    } else {
                        $.each(optArr, function (idx) {
                            if (optArr[idx].selected) {
                                text = optArr[idx].text;
                                val = optArr[idx].val;
                            }
                        });
                    }

                    // 初始化展示框
                    receptionArr.push(
                        '<div data-value="' + val + '" class="zr-select-reception">' +
                        text +
                        '<i class="zricon-arrow-down"></i>' +
                        '</div>'
                    );

                    // 初始化下拉框
                    $.each(optArr, function (idx) {
                        optionArr.push(
                            '<dd data-value="' + optArr[idx].val + '">' + optArr[idx].text + '</dd>'
                        );
                    });
                }

                // 初始化lg、sm样式
                var sizeClass = '';
                console.log($n);
                if ($n.hasClass('zr-select-sm')) {
                    sizeClass = 'zr-select-sm'
                } else if ($n.hasClass('zr-select-lg')) {
                    sizeClass = 'zr-select-lg'
                }

                // 初始化模拟代码
                htmlArr.push(
                    '<div class="zr-simulation ' + sizeClass + '">' +
                    receptionArr.join('') +
                    '<dl class="zr-select-menu zr-select-hide">' +
                    optionArr.join('') +
                    '</dl>' +
                    '</div>'
                );

                $n.after(htmlArr.join(''));

                // 监听DOM元素的插入和移除
                // $n.on("DOMNodeInserted, DOMNodeRemoved", function () {
                //     $n.nextAll(".zr-unselect").eq(0).remove();
                //     _select.eventFn.getValue($n);
                // });
                //
                // //自定义事件监听DOM变化
                // // 赋值
                // $n[0]["onzrchange"] = function (opt) {
                //     var opts = {
                //         eventFn: "",
                //         other: "",
                //         disable: true,
                //         mutiple: true,
                //         beforeFn: function () {
                //
                //         },
                //         afterFn: function () {
                //
                //         },
                //         reset: function () {
                //
                //         }
                //         // 添加属性checkbox、
                //     };
                //     var option = $.extend(opts, opt || {});
                //     option.eventFn.call(this, option);  // 执行传进来的函数
                //
                //     $n.next(".zr-unselect").remove();
                //     _select.eventFn.getValue($n);
                // }
            });

            // 下拉框切换
            _select.eventFn.taggleMenu();

            // 点击选中操作
            _select.eventFn.selectOption();
        }
    },
    eventFn: {
        // 下拉框切换
        taggleMenu: function () {
            // 显示下拉框
            var opt = _select.options._obj.options,
                arrowUpClassName = opt.arrowUpClassName,
                hideClassName = opt.hideClassName,
                menuClassName = opt.menuClassName,
                receptionClassName = opt.receptionClassName;

            $(receptionClassName).off('click').on('click', function (e) {
                e.stopPropagation();

                var $this = $(this),
                    $icon = $this.children('i'),
                    $menu = $this.next(menuClassName);

                // 当前打开
                if ($menu.hasClass(hideClassName)) {
                    $icon.addClass(arrowUpClassName);
                    $menu.removeClass(hideClassName);
                } else {
                    $icon.removeClass(arrowUpClassName);
                    $menu.addClass(hideClassName);
                }
            });

            // 隐藏下拉框
            $(window.document).off('click').on('click', function () {
                $(receptionClassName).children('i').removeClass(arrowUpClassName);
                $(menuClassName).addClass(hideClassName);
            });
        },

        // 点击选中操作
        selectOption: function () {
            $('.zr-select-menu dd').on('click', function (e) {
                var $this = $(this);

                // 多选时
                if ($this.parent().prev().hasClass(_select.options._obj.options.multipleClassName)) {
                    var valArr = [];

                } else {
                    var obj = {
                        val: $this.attr('data-value'),
                        text: $this.text()
                    };
                    var $simulation = $this.closest(_select.options._obj.options.simulationClassName),
                        $reception = $simulation.children(_select.options._obj.options.receptionClassName);

                    $simulation.attr('data-value', obj.val);
                    $reception.html(obj.text + ' <i class="' + _select.options._obj.options.arrowDownClassName + '"></i>');
                    $this.parent().addClass(_select.options._obj.options.hideClassName);
                }
            });
        }

        // /**
        //  * 获取select下option的value和text
        //  * @param obj 抓取的select的结点：$('#demo')
        //  */
        // getValue: function (obj) {
        //     // 缓存
        //     var _obj = obj.data(_select.options.cacheName);
        //     // 隐藏select
        //     obj.addClass(_obj.options.hideClassName);
        //
        //     // todo 单个var效率高
        //     var optSelected = [];
        //     var optArr = [];
        //     var selecter = obj.children('option[selected]');
        //     var multiple = obj.attr('multiple');
        //     var opt = obj.children("option");
        //     var optLength = opt.length;
        //
        //     // 获取option为selected的节点
        //     // todo if分类是否合适？
        //     if (selecter.length > 0) {
        //         optSelected = selecter;
        //     } else if (obj.val() && !multiple) {
        //         optSelected = obj.children('option[value=' + obj.val() + ']');
        //     } else if (obj.val() && multiple) {
        //         optSelected = selecter;
        //     } else {
        //         optSelected = [];
        //     }
        //
        //     // 获取option的value、text和selected
        //     if (optLength > 0) {
        //         for (var i = 0; i < optLength; i++) {
        //             optArr.push({
        //                 optVal: $(opt[i]).val(),
        //                 optText: $(opt[i]).text(),
        //                 optSelected: $(opt[i]).attr("selected")
        //             })
        //         }
        //         _select.eventFn.Unselect(obj, optArr, optSelected);
        //     }
        // },
        //
        // /**
        //  * 生成虚拟select
        //  * @param obj 抓取的select的结点：$('#demo')
        //  * @param arr select中option的value、text、selected
        //  * @param optSelected 获取option为selected的节点
        //  */
        // Unselect: function (obj, arr, optSelected) {
        //     var _obj = obj.data(_select.options.cacheName);
        //     var optionHtml = [];
        //     var inputHtml = '';
        //     var inputContentArr = [];
        //     var html = '';
        //     var arrLength = arr.length;
        //     var zrOptionValue = 'zr-option-value';  // html自定义属性，存放option的值
        //     var optSelectedLength = optSelected.length;
        //     var selectAll = '<dt class="zr-select-checkbox" zr-option-value="">' +
        //         '<span class="zr-select-checkbox-normal"><span class=""></span></span>' +
        //         '<div class="zr-select-checkbox-text">全选</div>' +
        //         '</dt>';
        //
        //     // 拼接option代码
        //     for (var i = 0; i < arrLength; i++) {
        //         if (obj.attr('multiple')) {
        //             var selectClass = arr[i].optSelected ? 'zr-select-checkbox-checked' : '';
        //             optionHtml.push(
        //                 '<dd class="zr-select-checkbox ' + selectClass + '" ' + zrOptionValue + '="' + arr[i].optVal + '" zr-option-text="' + arr[i].optText + '" title="' + arr[i].optText + '">' +
        //                 '<span class="zr-select-checkbox-normal"><span></span></span>' +
        //                 '<div class="zr-select-checkbox-text">' + arr[i].optText + '</div>' +
        //                 '</dd>'
        //             );
        //         } else {
        //             optionHtml.push(
        //                 '<dd title="' + arr[i].optText + '" ' + zrOptionValue + '="' + arr[i].optVal + '">' + arr[i].optText + '</dd>'
        //             );
        //         }
        //     }
        //     var optHtml = optionHtml.join(''); // 数组拼接性能高于字符串拼接
        //
        //     // 多选：生成全选代码   单选：默认第一项
        //     // todo checkbox确定后替换
        //     if (optSelectedLength > 0) {
        //         if (obj.attr("multiple")) {
        //             var selectAllClassName = optSelectedLength === arrLength ? 'zr-select-checkbox-uncheck' : '';
        //
        //             selectAll = '<dt class="zr-select-checkbox zr-select-checkbox-checked" ' + zrOptionValue + '="">' +
        //                 '<span class="zr-select-checkbox-normal">' +
        //                 '<span class="' + selectAllClassName + '"></span>' +
        //                 '</span>' +
        //                 '<div class="zr-select-checkbox-text">全选</div>' +
        //                 '</dt>';
        //
        //             for (var i = 0; i < optSelectedLength; i++) {
        //                 inputContentArr.push(
        //                     '<span>' +
        //                     $(optSelected[i]).text() +
        //                     '<i zr-close-text="' + $(optSelected[i]).text() + '" zr-close-val="' + $(optSelected[i]).val() + '" class="zricon-close"></i>' +
        //                     '</span>'
        //                 );
        //             }
        //         } else {
        //             inputHtml = $(optSelected).text();
        //             inputContentArr.push('<input type="text" value="' + inputHtml + '" readonly="readonly" ');
        //         }
        //     } else {
        //         inputHtml = arr[0].optText;
        //         inputContentArr.push('<input type="text" placeholder="' + inputHtml + '" readonly="readonly" ');
        //     }
        //     var inputContent = inputContentArr.join('');
        //
        //     // 生成属性disable、multiple、sm、lg
        //     // todo 整理html代码
        //     if (obj.attr("disabled")) {
        //         html = '<div class="zr-unselect zr-select-disable"><div class="zr-select-title zr-input-group">' + inputContent + 'disabled="disabled" class="zr-input">' +
        //             '<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">' + optHtml + '</dl></div>';
        //     } else if (obj.attr("multiple")) {
        //         if (optSelectedLength > 0) {
        //             html = '<div class="zr-unselect"><div class="zr-select-title zr-input-group zr-select-values">' + inputContent +
        //                 '<i class="zricon-arrow-down"></i></div><dl class="zr-select-content zr-select-hide">' + selectAll + optHtml + '</dl></div>';
        //         } else {
        //             html = '<div class="zr-unselect"><div class="zr-select-title zr-input-group">' + inputContent + ' class="zr-input">' +
        //                 '<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">' + selectAll + optHtml + '</dl></div>';
        //         }
        //     } else if (obj.hasClass(_obj.options.smClassName)) {
        //         html = '<div class="zr-unselect"><div class="zr-select-title zr-input-group">' + inputContent + ' class="zr-input zr-input-sm">' +
        //             '<span class="zr-input-addon zr-input-sm"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide zr-select-content-sm">' + optHtml + '</dl></div>';
        //     } else if (obj.hasClass(_obj.options.lgClassName)) {
        //         html = '<div class="zr-unselect"><div class="zr-select-title zr-input-group">' + inputContent + ' class="zr-input zr-input-lg">' +
        //             '<span class="zr-input-addon zr-input-lg"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide zr-select-content-lg">' + optHtml + '</dl></div>';
        //     } else {
        //         html = '<div class="zr-unselect"><div class="zr-select-title zr-input-group">' + inputContent + ' class="zr-input">' +
        //             '<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">' + optHtml + '</dl></div>';
        //     }
        //
        //     obj.after(html);
        //     _select.eventFn.clickFn(_obj);
        //     _select.eventFn.deleteOpt(_obj);
        // },
        //
        // //虚拟select点击事件
        // clickFn: function (_obj) {
        //     //value显示区域点击事件
        //     $(_obj.options.titleClassName).off("click").on("click", function (ev) {
        //         ev.stopPropagation();
        //
        //         // 缓存节点，避免多次查询
        //         var $this = $(this);
        //         var $contentDom = $this.next(_obj.options.contentClassName),
        //             $icon = $this.find(_obj.options.iconArrowDown);
        //
        //         if ($this.closest(_obj.options.unselectClassName).hasClass(_obj.options.disableClassName)) {
        //             return false;       // disable时点击无反应
        //         } else {
        //             //fix for guoming,toggle is removed by jQuery in high Level 2+
        //             if ($contentDom.hasClass(_obj.options.hideClassName)) {
        //                 //先判断select显示出来是不是会超出屏幕底部
        //                 var top = $this.offset().top,
        //                     height = $contentDom.height(),
        //                     clientHeight = $(window).height(),
        //                     documentTop = $(document).scrollTop();
        //                 var ht = clientHeight - (top - documentTop) - $this.height();
        //                 ht = parseInt(Math.abs(ht));
        //                 if (ht < parseInt(height)) {
        //                     //到可视窗口底部距离要小于下拉框的距离，此时下拉框要朝上
        //                     $contentDom.css({
        //                         top: "-" + (parseInt(height) + 5) + "px"
        //                     })
        //                 } else {
        //                     $contentDom.css({
        //                         // top: "36px"
        //                         top: $(_obj.options.unselectClassName).height
        //                     })
        //                 }
        //                 $contentDom.removeClass(_obj.options.hideClassName);
        //                 $icon.addClass(_obj.options.iconArrowUp);
        //             } else {
        //                 $contentDom.addClass(_obj.options.hideClassName);
        //                 $icon.removeClass(_obj.options.iconArrowUp);
        //             }
        //         }
        //     });
        //
        //     //虚拟option点击事件
        //     $(_obj.options.contentClassName).find('dd').off("click").on("click", function (ev) {
        //         ev.stopPropagation();
        //         var $this = $(this);
        //         var $dtDom = $this.prev("dt"),
        //             $contentDom = $this.closest(_obj.options.contentClassName),
        //             $unselectDom = $this.closest(_obj.options.unselectClassName);
        //         var optVal = '';
        //         var optText = '';
        //
        //         var checkedClassName = 'zr-select-checkbox-checked';
        //
        //         // 多选处理
        //         // todo checkbox结构定下后处理
        //         if ($this.hasClass("zr-select-checkbox")) {
        //             optVal = $this.attr("zr-option-value");
        //             optText = $this.attr("zr-option-text");
        //             var optArr = [];
        //             var opt = $this.closest(_obj.options.contentClassName).find("dd");
        //             var optLength = opt.length;
        //
        //             for (var i = 0; i < optLength; i++) {
        //                 if ($(opt[i]).hasClass("zr-select-checkbox-checked")) {
        //                     optArr.push({
        //                         optVal: $(opt[i]).attr("zr-option-value"),
        //                         optText: $(opt[i]).attr("zr-option-text")
        //                     })
        //                 }
        //             }
        //
        //             // 点击时数据和class类的切换
        //             if ($this.hasClass(checkedClassName)) {
        //                 $this.removeClass(checkedClassName);
        //                 // 根据value删除数组元素
        //                 _select.eventFn.removeByValue(optArr, optVal);
        //             } else {
        //                 $this.addClass(checkedClassName);
        //                 optArr.push({
        //                     optVal: optVal,
        //                     optText: optText
        //                 });
        //             }
        //
        //             // 往value展示区域渲染DOM
        //             _select.eventFn.appendDom($this, _obj, optArr);
        //             _select.eventFn.deleteOpt(_obj);
        //             if (optArr && optArr.length < optLength && optArr.length > 0) {
        //                 $dtDom.addClass("zr-select-checkbox-checked");
        //                 $dtDom.find(".zr-select-checkbox-normal").find("span").addClass("zr-select-checkbox-uncheck");
        //             } else if (optArr && optArr.length == optLength) {
        //                 $dtDom.addClass("zr-select-checkbox-checked");
        //                 $dtDom.find(".zr-select-checkbox-normal").find("span").removeClass("zr-select-checkbox-uncheck");
        //             } else {
        //                 var firstVal = $this.closest(_obj.options.contentClassName).find("dd").eq(0).attr("zr-option-text");
        //                 var html = '<input type="text" placeholder="' + firstVal + '" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';
        //                 $unselectDom.find(_obj.options.titleClassName).addClass("zr-select-values").removeClass("zr-select-values").html(html);
        //                 $contentDom.css({
        //                     "top": $unselectDom.find(_obj.options.titleClassName).height() + 4
        //                 });
        //                 $dtDom.removeClass("zr-select-checkbox-checked");
        //             }
        //
        //             _select.eventFn.bindVal($this, _obj, optArr);
        //         } else {
        //             optVal = $this.attr("zr-option-value");
        //             optText = $this.text();
        //             $contentDom.addClass(_obj.options.hideClassName);
        //             $unselectDom.find(_obj.options.titleClassName).find(".zricon-arrow-down").removeClass("zricon-arrow-up");
        //             $unselectDom.find("input").val(optText);
        //             $unselectDom.prev(_obj.selector).eq(0).val(optVal);
        //             $unselectDom.prev(_obj.selector).eq(0).trigger("change");
        //             // _select.eventFn.bindVal($this,_obj,optArr);
        //         }
        //     });
        //     //全选点击事件
        //     $(".zr-select-content dt").off("click").on("click", function (ev) {
        //         ev.stopPropagation();
        //         var optArr = [];
        //         // $(this).toggleClass("zr-select-checkbox-checked");
        //         if ($(this).hasClass("zr-select-checkbox-checked")) {
        //             $(this).removeClass("zr-select-checkbox-checked");
        //         } else {
        //             $(this).addClass("zr-select-checkbox-checked");
        //         }
        //         ;
        //         if ($(this).hasClass("zr-select-checkbox-checked")) {
        //             $(this).siblings("dd").addClass("zr-select-checkbox-checked");
        //             $(this).find(".zr-select-checkbox-normal").find("span").removeClass("zr-select-checkbox-uncheck");
        //             var ddArr = $(this).siblings("dd");
        //             for (var i = 0, j = ddArr.length; i < j; i++) {
        //                 optArr.push({
        //                     optVal: $(ddArr[i]).attr("zr-option-value"),
        //                     optText: $(ddArr[i]).attr("zr-option-text")
        //                 })
        //             }
        //             ;
        //             _select.eventFn.appendDom($(this), _obj, optArr);
        //             _select.eventFn.deleteOpt(_obj);
        //         } else {
        //             $(this).siblings("dd").removeClass("zr-select-checkbox-checked");
        //             var firstVal = $(this).siblings("dd").eq(0).attr("zr-option-text");
        //             var html = '<input type="text" placeholder="' + firstVal + '" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';
        //             $(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).addClass("zr-select-values").removeClass("zr-select-values").html(html);
        //             $(this).closest(_obj.options.contentClassName).css({
        //                 "top": $(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).height() + 4
        //             });
        //         }
        //         ;
        //         $(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).find(".zricon-arrow-down").addClass("zricon-arrow-up");
        //         _select.eventFn.bindVal($(this), _obj, optArr);
        //     });
        //
        // },
        //
        // //根据value删除数组元素
        // removeByValue: function (arr, val) {
        //     var arrLength = arr.length;
        //     for (var i = 0; i < arrLength; i++) {
        //         if (arr[i].optVal === val) {
        //             arr.splice(i, 1);
        //             break;
        //         }
        //     }
        // },
        //
        // //往value展示区域渲染DOM
        // appendDom: function (obj, _obj, optArr) {
        //     var html = [];
        //     for (var i = 0, j = optArr.length; i < j; i++) {
        //         html.push(
        //             '<span>' + optArr[i].optText +
        //             '<i zr-close-text="' + optArr[i].optText + '" zr-close-val="' + optArr[i].optVal + '" class="' + _obj.options.iconClose + '"></i>' +
        //             '</span>'
        //         );
        //     }
        //     html.push('<i class="zricon-arrow-down"></i>');
        //
        //     var $titleDOM = obj.closest(_obj.options.unselectClassName).children(_obj.options.titleClassName);
        //     $titleDOM.addClass(_obj.options.selectValues).html(html.join(''));
        //     obj.closest(_obj.options.contentClassName).css({
        //         "top": $titleDOM.height() + 14
        //     });
        // },
        //
        // // value删除按钮事件
        // deleteOpt: function (_obj) {
        //     // $(_obj.options.unselectClassName).find(".zricon-close")
        //     // todo 事件委托和下拉框冲突，暂时使用多个click绑定
        //     $(_obj.options.titleClassName + ' .' + _obj.options.iconClose).off("click").on("click", function (ev) {
        //         ev.stopPropagation();
        //         var $this = $(this);
        //         var closeDomArr = $this.closest(_obj.options.titleClassName).find(".zricon-close");
        //         var closestDom = $this.closest(_obj.options.unselectClassName);
        //         var optArr = [];
        //
        //         for (var i = 0, j = closeDomArr.length; i < j; i++) {
        //             optArr.push({
        //                 optVal: $(closeDomArr[i]).attr("zr-close-val"),
        //                 optText: $(closeDomArr[i]).attr("zr-close-text")
        //             });
        //         }
        //
        //         var currentVal = $this.attr("zr-close-val");
        //         _select.eventFn.removeByValue(optArr, currentVal);
        //         closestDom.find(".zr-select-checkbox[zr-option-value=" + currentVal + "]").removeClass("zr-select-checkbox-checked");
        //         closestDom.find("dt").find(".zr-select-checkbox-normal").children().addClass("zr-select-checkbox-uncheck");
        //         // 往真实select绑定选中的数据
        //         _select.eventFn.bindVal($this, _obj, optArr);
        //         // 更新展示区域的DOM
        //         _select.eventFn.appendDom($this, _obj, optArr);
        //
        //         if (optArr.length === 0) {
        //             // 没有选中时，展示区域变为input
        //             closestDom.find("dt").removeClass("zr-select-checkbox-checked");
        //             var firstVal = closestDom.find("dd").eq(0).attr("zr-option-text");
        //             var html = '<input type="text" placeholder="' + firstVal + '" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';
        //             $this.closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).removeClass("zr-select-values").html(html);
        //
        //
        //             closestDom.find(_obj.options.contentClassName).css({
        //                 "top": closestDom.find(_obj.options.titleClassName).height() + 4
        //             });
        //         } else {
        //             closestDom.find(_obj.options.contentClassName).css({
        //                 "top": closestDom.find(_obj.options.titleClassName).height() + 14
        //             });
        //         }
        //         _select.eventFn.deleteOpt(_obj);
        //     })
        // },
        //
        // // 往真实select绑定选中的数据
        // bindVal: function (obj, _obj, optArr) {
        //     var selectVal = [],
        //         selectDom = obj.closest(_obj.options.unselectClassName).prev(_obj.selector);
        //     for (var i = 0, j = optArr.length; i < j; i++) {
        //         selectVal.push(optArr[i].optVal);
        //     }
        //
        //     selectDom.val(selectVal);
        //     selectDom.trigger("change");
        // }
    },
    ajax: {}
};
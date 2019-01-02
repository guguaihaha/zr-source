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
            var options = _select.options._obj.options;
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
                        selectedNumber++;
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
                    var selectedArr = [],
                        valueSelected = [];

                    $.each(optArr, function (idx) {
                        if (optArr[idx].selected) {
                            selectedArr.push(
                                '<span data-value="' + optArr[idx].val + '">' + optArr[idx].text + ' <i class="zricon-close"></i></span>'
                            );
                            valueSelected.push(optArr[idx].val);
                        }
                    });

                    // todo 多选的默认选中
                    // if (selectedArr.length === 0) {
                    //     selectedArr.push('请选择');
                    // }

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
                var sizeClass = '',
                    disabledClass = '';
                if ($n.hasClass('zr-select-sm')) {
                    sizeClass = 'zr-select-sm'
                } else if ($n.hasClass('zr-select-lg')) {
                    sizeClass = 'zr-select-lg'
                }

                if ($n.prop('disabled')) {
                    disabledClass = options.disableClassName;
                }

                // 初始化模拟代码
                htmlArr.push(
                    '<div class="zr-simulation ' + sizeClass + ' ' + disabledClass + '">' +
                    receptionArr.join('') +
                    '<dl class="zr-select-menu zr-select-hide">' +
                    optionArr.join('') +
                    '</dl>' +
                    '</div>'
                );

                $n.after(htmlArr.join(''));

                // 多选时赋值
                if ($n.prop('multiple')) {
                    $n.next(options.simulationClassName).children(options.receptionClassName).data('data-value', valueSelected);
                }

                // onzrchange触发函数
                _select.eventFn.addEvent(n);
            });

            // 下拉框切换
            _select.eventFn.taggleMenu();

            // 点击选中操作
            _select.eventFn.selectOption();

            // 点击展示框删除相应选中项
            _select.eventFn.delSelected();
        }
    },
    eventFn: {
        addEvent: function (el) {
            el.onzrchange = function (opt) {
                var opts = {
                        disabled: false,
                        selected: -1,   // 0为默认第一个，依次累加
                        remove: -1,    // 删除第N项
                        eventFn: function () {
                        },
                        beforeFn: function () {
                        },
                        afterFn: function () {
                        },
                    },
                    option = $.extend(opts, opt || {}),
                    options = _select.options._obj.options,
                    $this = $(this),
                    $simulation = $this.next(options.simulationClassName);

                // 执行前回调
                option.beforeFn();

                if (option.disabled) {
                    $simulation.addClass(options.disableClassName);
                }

                if (option.selected !== -1) {
                    $simulation.find('dd').eq(parseInt(option.selected)).click();
                }

                if (option.remove !== -1) {
                    $simulation.find('dd').eq(parseInt(option.remove)).remove();
                }

                // 回调函数
                option.eventFn();

                // 执行后回调
                option.afterFn();

                opts.eventFn.call(this, opts);
                opts.beforeFn.call(this, opts);
                opts.afterFn.call(this, opts);
            }
        },

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
                if (!$this.closest(opt.simulationClassName).hasClass(opt.disableClassName)) {
                    // 当前打开
                    if ($menu.hasClass(hideClassName)) {
                        $icon.addClass(arrowUpClassName);
                        $menu.removeClass(hideClassName);
                    } else {
                        $icon.removeClass(arrowUpClassName);
                        $menu.addClass(hideClassName);
                    }
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
            var options = _select.options._obj.options;

            // 点击非全选标签
            $('.zr-select-menu dd').on('click', function (e) {
                e.stopPropagation();
                var $this = $(this),
                    $simulation = $this.closest(options.simulationClassName),
                    $reception = $simulation.children(options.receptionClassName),
                    $menu = $this.closest(options.menuClassName);

                // 多选时
                if ($this.parent().prev().hasClass(options.multipleClassName)) {
                    var val = $this.attr('data-value');

                    // 是否选中切换，删减展示框内容
                    if ($this.hasClass(options.checkboxChecked)) {
                        $this.removeClass(options.checkboxChecked);

                        $reception.children('span[data-value=' + val + ']').remove();

                        // 更新value值
                        $reception.data('data-value', $.grep($reception.data('data-value'), function (n, i) {
                            return n !== val;
                        }));

                        // 数据绑定原生select
                        _select.eventFn.bindSelect($simulation.prev('.zr-select'));
                    } else {
                        $this.addClass(options.checkboxChecked);

                        $this.closest(options.simulationClassName).children(options.receptionClassName).prepend(
                            '<span data-value="' + val + '">' + $this.children('span:last-child').text() + ' <i class="zricon-close"></i></span>'
                        );

                        // 更新value值
                        var valueSelected = $reception.data('data-value');
                        valueSelected.push(val);
                        $reception.data('data-value', valueSelected);

                        // 重新绑定监听
                        _select.eventFn.delSelected();

                        // 数据绑定原生select
                        _select.eventFn.bindSelect($simulation.prev('.zr-select'));
                    }

                    // 全选框做相应更新
                    var $dd = $menu.children('dd'),
                        ddLength = $dd.length,
                        selectedNumber = 0;
                    $dd.each(function (idx) {
                        var $this = $(this);
                        if ($this.hasClass(options.checkboxChecked)) {
                            selectedNumber++;
                        }
                    });

                    var $dt = $this.prevAll('dt');
                    if (selectedNumber === 0) {
                        $dt.removeClass(options.checkboxChecked).children().children().removeClass(options.checkboxUncheck);
                    } else if (selectedNumber === ddLength) {
                        $dt.addClass(options.checkboxChecked).children().children().removeClass(options.checkboxUncheck);
                    } else {
                        $dt.addClass(options.checkboxChecked).children().children().addClass(options.checkboxUncheck);
                    }

                    _select.eventFn.dealMenuTop($menu);

                } else {
                    var obj = {
                        val: $this.attr('data-value'),
                        text: $this.text()
                    };

                    // 更新选中数据
                    $reception.attr('data-value', obj.val);
                    // 数据绑定原生select
                    _select.eventFn.bindSelect($simulation.prev('.zr-select'));

                    $reception.html(obj.text + ' <i class="' + options.arrowDownClassName + '"></i>');
                    $this.parent().addClass(options.hideClassName);
                }
            });

            // 点击全选标签
            $('.zr-select-menu dt').on('click', function (e) {
                e.stopPropagation();
                var $this = $(this),
                    $menu = $this.closest(options.menuClassName),
                    $simulation = $menu.closest(options.simulationClassName);

                if ($this.hasClass(options.checkboxChecked)) {
                    $this.removeClass(options.checkboxChecked);
                    $this.nextAll('dd').removeClass(options.checkboxChecked);

                    var $span = $this.children().eq(0).children();
                    if ($span.hasClass(options.checkboxUncheck)) {
                        $span.removeClass(options.checkboxUncheck);
                    }
                    // 展示框展示和赋值
                    $this.closest(options.simulationClassName).children(options.receptionClassName).html('<i class="' + options.arrowDownClassName + ' ' + options.arrowUpClassName + '"></i>').data('data-value', []);

                    // 更新下拉框高度Top
                    _select.eventFn.dealMenuTop($menu);

                    // 数据绑定原生select
                    _select.eventFn.bindSelect($simulation.prev('.zr-select'));
                } else {
                    $this.addClass(options.checkboxChecked);
                    $this.nextAll('dd').addClass(options.checkboxChecked);

                    var receptionChecked = [],
                        valueChecked = [];
                    $this.nextAll().each(function () {
                        var $this = $(this);
                        receptionChecked.push(
                            '<span data-value="' + $this.attr('data-value') + '">' + $this.children('span:last-child').text() + ' <i class="zricon-close"></i></span>'
                        );
                        valueChecked.push($this.attr('data-value'));
                    });
                    // 展示框展示和赋值
                    $this.closest(options.simulationClassName).children(_select.options._obj.options.receptionClassName).html(receptionChecked.join('')).data('data-value', valueChecked);

                    // 数据绑定原生select
                    _select.eventFn.bindSelect($simulation.prev('.zr-select'));

                    // 更新下拉框高度Top
                    _select.eventFn.dealMenuTop($menu);

                    // 重新绑定监听
                    _select.eventFn.delSelected();
                }
            });
        },

        // 调整下拉框相对位置-top
        dealMenuTop: function ($menu) {
            $menu.css('top', $menu.prev(_select.options._obj.options.receptionClassName).height() + 4);
        },

        delSelected: function () {
            var options = _select.options._obj.options;

            $(options.receptionClassName).find('.zricon-close').off('click').on('click', function (e) {
                e.stopPropagation();

                var $this = $(this),
                    $span = $this.closest('span'),
                    $reception = $this.closest(options.receptionClassName),
                    $menu = $reception.next(),
                    val = $span.attr('data-value'),
                    valueSelected = $reception.data('data-value'),
                    selectedNumber = 0,
                    optionsNumber = 0;

                // 删除当前选中项
                $span.remove();

                // 更新缓存
                $.grep(valueSelected, function (n, i) {
                    return n !== val;
                });
                $reception.data('data-value', valueSelected);

                // 更新下拉框
                $reception.next().children('dd').each(function (i) {
                    var $this = $(this);
                    if ($this.attr('data-value') === val) {
                        $this.removeClass(options.checkboxChecked);
                    }

                    if ($this.hasClass(options.checkboxChecked)) {
                        selectedNumber++;
                    }

                    // option数量
                    optionsNumber++;
                });

                // 更新全选
                var $dt = $menu.children('dt');

                if (selectedNumber === 0) {
                    $dt.removeClass(options.checkboxChecked).children().children().removeClass(options.checkboxUncheck);
                } else if (selectedNumber === optionsNumber) {
                    $dt.addClass(options.checkboxChecked).children().children().removeClass(options.checkboxUncheck);
                } else {
                    $dt.addClass(options.checkboxChecked).children().children().addClass(options.checkboxUncheck);
                }

                // 更新下拉框高度
                _select.eventFn.dealMenuTop($menu);
            });
        },

        bindSelect: function (selectDom) {
            var valueSelected = selectDom.next().children(_select.options._obj.options.receptionClassName).data('data-value');

            selectDom.val(valueSelected);
            selectDom.trigger("change");
        }
    },
    ajax: {}
};
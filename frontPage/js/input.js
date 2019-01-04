var _input = {
    uid: 30100000,
    version: "1.0.0",
    init: function (domObject) {
        console.log(domObject);
        this.options._obj = domObject;
        this.events.bindEvent(domObject);
    },
    options: {
        _obj: {},
        cacheName: "input_cache"
    },
    events: {
        bindEvent: function (opt) {
            $.each(opt.array, function (i, n) {
                //缓存_obj'
                var $n = $(n);
                $n.data(_input.options.cacheName, _input.options._obj);

                // textarea
                if (opt.selector === opt.options.textareaClassName) {
                    $n.wrap('<div class="' + opt.options.groupClassName + '"></div>');
                    $n.after(
                        '<div class="' + opt.options.txtNumClassName + '">' +
                        '<span>' + $n.val().length + '</span>' +
                        '<span>/</span>' +
                        '<span>' + n.maxLength || 100 + '</span>' +
                        '</div>'
                    );
                    // todo 赋值 onzrchange
                    // todo BUG：dom插入数据不触发
                    $n.off("input propertychange").on("input propertychange", _input.eventFn.inputNumFn);
                } else {
                    // 初始化删除按钮
                    if ($n.hasClass(opt.options.clearClassName)) {
                        $n.wrap('<div class="' + opt.options.groupClassName + '"></div>');    // add group element
                        $n.after('<i class="' + opt.options.iconCloseCircle + '"></i>');  // add clean icon

                        var selscter = $n.closest(opt.options.groupSelector).children("." + opt.options.iconCloseCircle);
                        selscter.data(_input.options.cacheName, _input.options._obj);

                        // 监听input变化
                        // todo BUG：dom插入数据不触发
                        $n.off("input propertychange").on("input propertychange", _input.eventFn.showIconFn);
                        // 初始化默认值
                        if ($n.val().length > 0) {
                            $n.closest(opt.options.groupSelector).children('.' + opt.options.iconCloseCircle).show();
                        }

                        // 监听清理图标点击事件
                        selscter.off("click").on("click", _input.eventFn.clearFn);
                    }
                }
            });
        }
    },
    eventFn: {
        // 点击清理图标
        clearFn: function () {
            var $this = $(this),
                _obj = $this.data(_input.options.cacheName);
            $this.closest(_obj.options.groupSelector).children(_obj.selector).val('');
            $this.hide();
        },

        // 显示清空图标
        showIconFn: function () {
            var $this = $(this),
                _obj = $this.data(_input.options.cacheName),
                Selector = $this.closest(_obj.options.groupSelector).children('.' + _obj.options.iconCloseCircle);

            if ($this.val().length > 0) {
                Selector.show();
            } else {
                Selector.hide();
            }
        },
        // 改变字数
        inputNumFn: function () {
            var _obj = _input.options._obj,
                txtLength = $.trim($(this).val()).length,
                maxLength = $(this).attr('maxLength'),
                Selector = $(this).next(_obj.options.txtNumSelector).children('span').eq(0);

            Selector.text(txtLength);

            if (txtLength === 0) {
                Selector.css("color", "rgba(0,0,0,0.25)");
            } else if (txtLength < maxLength) {
                Selector.css("color", "rgba(0,0,0,0.45)");
            } else {
                Selector.css("color", "red");
            }
        }
    },
    ajax: {}
};

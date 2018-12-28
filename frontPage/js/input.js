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
            // $(n) 缓存
            $.each(opt.array, function (i, n) {
                //缓存_obj'
                $(n).data(_input.options.cacheName, _input.options._obj);

                if (opt.selector === opt.options.textareaClassName) {
                    // todo 原生带文字
                    $(n).wrap('<div class="' + opt.options.groupClassName + '"></div>');
                    $(n).after(
                        '<div class="' + opt.options.txtNumClassName + '">' +
                        '<span>' + n.value.length + '</span>' +
                        '<span>/</span>' +
                        '<span>' + n.maxLength || 100 + '</span>' +
                        '</div>'
                    );
                    // todo keyup外的触发 鼠标、js赋值、初始化
                    $(n).off("keyup").on("keyup", _input.eventFn.inputNumFn);
                } else {
                    // 初始化删除按钮
                    if ($(n).hasClass(opt.options.clearClassName)) {
                        $(n).wrap('<div class="' + opt.options.groupClassName + '"></div>');    // add group element
                        $(n).after('<i class="' + opt.options.iconCloseCircle + '"></i>');  // add clean icon

                        var selscter = $(n).closest(opt.options.groupSelector).children("." + opt.options.iconCloseCircle);
                        selscter.data(_input.options.cacheName, _input.options._obj);

                        // todo change
                        $(n).off("input change").on("input change", _input.eventFn.showIconFn);
                        if (selscter.length > 0) {
                            selscter.off("click").on("click", _input.eventFn.clearFn);
                        }
                    }
                }
            });
        }
    },
    eventFn: {
        clearFn: function () {
            var _obj = $(this).data(_input.options.cacheName);
            $(this).closest(_obj.options.groupSelector).children(_obj.selector).val("");
            $(this).hide();
        },
        showIconFn: function () {
            console.log(1);
            var _obj = $(this).data(_input.options.cacheName);
            var Selector = $(this).closest(_obj.options.groupSelector).children('.' + _obj.options.iconCloseCircle);

            if ($(this).val().length > 0) {
                Selector.show();
            } else {
                Selector.hide();
            }
        },
        inputNumFn: function () {
            var _obj = _input.options._obj;
            var txtLength = $.trim($(this).val()).length;
            var maxLength = $(this).attr('maxLength');
            var Selector = $(this).next(_obj.options.txtNumSelector).children('span').eq(0);

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

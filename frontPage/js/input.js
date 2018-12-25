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
                $(n).data(_input.options.cacheName, _input.options._obj);

                if (opt.selector === ".zr-textarea") {
                    $(n).wrap('<div class="zr-input-group"></div>');
                    $(n).after(
                        '<div class="zr-input-num">' +
                        '<span>' + n.value.length + '</span>' +
                        '<span>/</span>' +
                        '<span>' + n.maxLength || 100 + '</span>' +
                        '</div>'
                    );
                    $(n).off("keyup").on("keyup", _input.eventFn.inputNumFn);
                } else {
                    // 初始化删除按钮
                    if ($(n).hasClass(opt.options.clearClassName)) {
                        $(n).wrap('<div class="zr-input-group"></div>');    // add group element
                        $(n).after('<i class="zricon-close-circle"></i>');  // add clean icon

                        var selscter = $(n).closest(opt.options.groupSelector).children(".zricon-close-circle");
                        selscter.data(_input.options.cacheName, _input.options._obj);

                        $(n).off("input").on("input", _input.eventFn.showIconFn);
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
            var _obj = $(this).data(_input.options.cacheName);
            var Selector = $(this).closest(_obj.options.groupSelector).children(".zricon-close-circle");

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

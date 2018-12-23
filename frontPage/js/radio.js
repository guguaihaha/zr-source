var _radio = {
    uid:30300000 ,
    version:"1.0.0",
    init:function(domObject){
        this.options._obj = domObject;
        // this.events.closeEvent(domObject);
        this.events.init(domObject);
        this.events.bindListener(domObject);

    },
    options:{
        _obj:{},//公共变量，永远不会变
    },
    events:{
        init: function(){
            $('.zr-radio').each(function (index, element) {
                var $original = $(element);
                var _class = $original.prop('class'),
                    _name = $original.prop('name'),
                    _checked = $original.prop('checked'),
                    _disabled = $original.prop('disabled'),
                    _value = $original.prop('value'),
                    _id = $original.prop('id');
                var html = '<label class="zr-radio-wrapper">' +
                    '<span class="zr-radio-clone">' +
                    '<span class="zr-radio-inner"></span>' +
                    '<input type="radio" class="' + _class + '">' + 
                    '</span>' +
                    '<span class="zr-radio-label">' + _value +
                    '</span>' +
                    '</label>';
                var $dom = $(html),
                    $input = $dom.find('input');
                //暂时不添加class
                $input.prop('checked', _checked); //checked
                $input.prop('disabled', _disabled); //disabled
                $input.attr('name', _name); //name
                $input.attr('id', _id); //id
                $input.addClass('zr-radio-original');
                $input.removeClass('zr-radio');
                //已选中
                if(_checked){
                    $input.parent().addClass('zr-radio-checked');
                    $input.closest('label').addClass('zr-radio-wrapper-checked');
                }
                //已禁用
                if(_disabled){
                    $input.parent().addClass('zr-radio-disabled');
                    $input.closest('label').addClass('zr-radio-wrapper-disabled');
                }
                
                var input = $input[0];
                _radio.eventFn.addEvent(input) //绑定事件
                //
                $original.after($dom);
                $original.remove();
            })
        },
        bindListener: function(domObject){
            console.log(domObject); //删除了.
            $('input[type="radio"]').on('change', function () {
                this.onzrchange? this.onzrchange():''; //普通radio 没有onzrchange
            })
        }
    },
    eventFn:{
        addEvent: function(dom){
            dom.onzrchange = function (option) {
                var $input = $(this),
                    original = this,
                    $parent = $input.parent(),
                    inputName = $input.prop('name');
                var opt = option || {};
    
                for(var name in opt){
                    if(name === 'checked') $input.prop('checked', opt[name]);
                    if(name === 'disabled') $input.prop('disabled', opt[name]);
                    if(name === 'value') $parent.siblings('span').html(opt[name]);
                }
                if(opt.beforeFn) opt.beforeFn();
                //选中
                if ($input.prop('checked')) {
                    $parent.addClass('zr-radio-checked');
                    $input.closest('label').addClass('zr-radio-wrapper-checked');
                    //其他项目取消选中
                    var aInput = $('input[name=' + inputName + ']');
                    aInput.each(function (i, element) {
                        if (original !== element) {
                            element.onzrchange? element.onzrchange(): '';
                        }
                    })
                }else {
                    $parent.removeClass('zr-radio-checked');
                    $input.closest('label').removeClass('zr-radio-wrapper-checked');
                }
                //禁用
                if ($input.prop('disabled')) {
                    $parent.addClass('zr-radio-disabled');
                    $input.closest('label').addClass('zr-radio-wrapper-disabled');
                }else {
                    $parent.removeClass('zr-radio-disabled');
                    $input.closest('label').removeClass('zr-radio-wrapper-disabled');
                }
    
                if(opt.afterFn) opt.afterFn();
            }
        }
    },
    ajax:{}

}



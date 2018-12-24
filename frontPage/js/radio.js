var _radio = {
    uid:30300000 ,
    version:"1.0.0",
    init:function(domObject){
        this.options._obj = domObject;
        this.events.init(domObject);
    },
    options:{
        _obj:{},//公共变量，永远不会变
    },
    events:{
        init: function(){
            $('.zr-radio').each(function (index, element) {
                var $original = $(element);
                var _checked = $original.prop('checked'),
                    _disabled = $original.prop('disabled'),
                    _value = $original.prop('value');
                   
                var html = '<label class="zr-radio-wrapper">' +
                    '<span class="zr-radio-clone">' +
                    '<span class="zr-radio-inner"></span>' +
                    '</span>' +
                    '<span class="zr-radio-label">' + _value +
                    '</span>' +
                    '</label>';
                var $shell = $(html);
                $original.after($shell);
                $shell.children('.zr-radio-clone').append(element);
                $original.addClass('zr-radio-original');
                $original.removeClass('zr-radio');
        
                var $parent = $original.parent(),
                    $label = $original.closest('label');
                
                if(_value.length == 0){
                    $parent.siblings('.zr-radio-label').css('display','none');
                }else {
                    $parent.siblings('.zr-radio-label').css('display','inline');
                }
                //已选中
                if(_checked){
                    $parent.addClass('zr-radio-checked');
                    $label.addClass('zr-radio-wrapper-checked');
                }
                //已禁用
                if(_disabled){
                    $parent.addClass('zr-radio-disabled');
                    $label.addClass('zr-radio-wrapper-disabled');
                }
                _radio.eventFn.addEvent(element) //绑定事件
            })
        }
    },
    eventFn:{
        addEvent: function (dom) {
            $(dom).on('change', function () {
                this.onzrchange? this.onzrchange():'';
            })
            dom.onzrchange = function (option) {
                var $input = $(this),
                    original = this,
                    $parent = $input.parent(),
                    $label = $input.closest('label'),
                    inputName = $input.prop('name');
                var opt = option || {};
    
                for(var name in opt){
                    if(name === 'checked') $input.prop('checked', opt[name]);
                    if(name === 'disabled') $input.prop('disabled', opt[name]);
                    if(name === 'value') {
                        if(opt[name].length == 0){
                            $parent.siblings('.zr-radio-label').css('display','none');
                        }else {
                            $parent.siblings('.zr-radio-label').css('display','inline').html(opt[name]);
                        }
                    };
                }
                if(opt.beforeFn) opt.beforeFn();
                //选中
                if ($input.prop('checked')) {
                    $parent.addClass('zr-radio-checked');
                    $label.addClass('zr-radio-wrapper-checked');
                    //其他项目取消选中
                    var aInput = $('input[name=' + inputName + ']');
                    aInput.each(function (i, element) {
                        if (original !== element) {
                            element.onzrchange? element.onzrchange(): '';
                        }
                    })
                }else {
                    $parent.removeClass('zr-radio-checked');
                    $label.removeClass('zr-radio-wrapper-checked');
                }
                //禁用
                if ($input.prop('disabled')) {
                    $parent.addClass('zr-radio-disabled');
                    $label.addClass('zr-radio-wrapper-disabled');
                }else {
                    $parent.removeClass('zr-radio-disabled');
                    $label.removeClass('zr-radio-wrapper-disabled');
                }
    
                if(opt.afterFn) opt.afterFn();
            }
        }
    },
    ajax:{}

}



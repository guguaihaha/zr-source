var _checkbox = {
    uid:30400000 ,
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
            $('.zr-checkbox').each(function (index, element) {
                var $original = $(element);
                var _checked = $original.prop('checked'),
                    _disabled = $original.prop('disabled'),
                    _value = $original.prop('value');
                    
                var html = '<label class="zr-checkbox-wrapper">' +
                    '<span class="zr-checkbox-clone">' +
                    '<span class="zr-checkbox-inner"></span>' +
                    '</span>' +
                    '<span class="zr-checkbox-label">' + _value +
                    '</span>' +
                    '</label>';
                var $shell = $(html);
                $original.after($shell);
                $shell.children('.zr-checkbox-clone').append(element);
                $original.addClass('zr-checkbox-original');
                $original.removeClass('zr-checkbox');
                
                var $parent = $original.parent(),
                    $label = $original.closest('label');
                
                if(_value.length == 0){
                    $parent.siblings('.zr-checkbox-label').css('display','none');
                }else {
                    $parent.siblings('.zr-checkbox-label').css('display','inline');
                }
                //已选中
                if(_checked){
                    $parent.addClass('zr-checkbox-checked');
                    $label.addClass('zr-checkbox-wrapper-checked');
                }
                //已禁用
                if(_disabled){
                    $parent.addClass('zr-checkbox-disabled');
                    $label.addClass('zr-checkbox-wrapper-disabled');
                }
                _checkbox.eventFn.addEvent(element) //绑定事件
            })
        }
    },
    eventFn:{
        addEvent: function(dom){
            $(dom).on('change', function () {
                this.onzrchange? this.onzrchange():'';
            })
            dom.onzrchange = function (option) {
                var $input = $(this),
                    $parent = $input.parent(),
                    $label = $input.closest('label');
                var opt = option || {};
    
                for(var name in opt){
                    if(name === 'checked') $input.prop('checked', opt[name]);
                    if(name === 'disabled') $input.prop('disabled', opt[name]);
                    if(name === 'value') {
                        if(opt[name].length == 0){
                            $parent.siblings('.zr-checkbox-label').css('display','none');
                        }else {
                            $parent.siblings('.zr-checkbox-label').css('display','inline').html(opt[name]);
                        }
                    };
                }
                if(opt.beforeFn) opt.beforeFn();
                //选中
                if ($input.prop('checked')) {
                    $parent.addClass('zr-checkbox-checked');
                    $label.addClass('zr-checkbox-wrapper-checked');
                }else {
                    $parent.removeClass('zr-checkbox-checked');
                    $label.removeClass('zr-checkbox-wrapper-checked');
                }
               
                //禁用
                if ($input.prop('disabled')) {
                    $parent.addClass('zr-checkbox-disabled');
                    $label.addClass('zr-checkbox-wrapper-disabled');
                }else {
                    $parent.removeClass('zr-checkbox-disabled');
                    $label.removeClass('zr-checkbox-wrapper-disabled');
                }
    
                if(opt.afterFn) opt.afterFn();
            }
        }
    },
    ajax:{}

}

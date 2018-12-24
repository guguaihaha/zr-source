var _checkbox = {
    uid:30400000 ,
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
            $('.zr-checkbox').each(function (index, element) {
                var $original = $(element);
                var _class = $original.prop('class'),
                    _name = $original.prop('name'),
                    _checked = $original.prop('checked'),
                    _disabled = $original.prop('disabled'),
                    _value = $original.prop('value'),
                    _id = $original.prop('id');
                var html = '<label class="zr-checkbox-wrapper">' +
                    '<span class="zr-checkbox-clone">' +
                    '<span class="zr-checkbox-inner"></span>' +
                    '<input type="checkbox" class="' + _class + '">' + 
                    '</span>' +
                    '<span class="zr-checkbox-label">' + _value +
                    '</span>' +
                    '</label>';
                var $dom = $(html),
                    $input = $dom.find('input');
                //暂时不添加class
                $input.prop('checked', _checked); //checked
                $input.prop('disabled', _disabled); //disabled
                $input.attr('name', _name); //name
                $input.attr('id', _id); //id
                $input.addClass('zr-checkbox-original');
                $input.removeClass('zr-checkbox');
                //已选中
                if(_checked){
                    $input.parent().addClass('zr-checkbox-checked');
                    $input.closest('label').addClass('zr-checkbox-wrapper-checked');
                }
                //已禁用
                if(_disabled){
                    $input.parent().addClass('zr-checkbox-disabled');
                    $input.closest('label').addClass('zr-checkbox-wrapper-disabled');
                }
                
                var input = $input[0];
                _checkbox.eventFn.addEvent(input) //绑定事件
                //
                $original.after($dom);
                $original.remove();
            })
        },
        bindListener: function(domObject){
            console.log(domObject); //删除了.
            $('input[type="checkbox"]').on('change', function () {
                this.onzrchange? this.onzrchange():''; //普通checkbox 没有onzrchange
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
                    $parent.addClass('zr-checkbox-checked');
                    $input.closest('label').addClass('zr-checkbox-wrapper-checked');
                }else {
                    $parent.removeClass('zr-checkbox-checked');
                    $input.closest('label').removeClass('zr-checkbox-wrapper-checked');
                }
                //禁用
                if ($input.prop('disabled')) {
                    $parent.addClass('zr-checkbox-disabled');
                    $input.closest('label').addClass('zr-checkbox-wrapper-disabled');
                }else {
                    $parent.removeClass('zr-checkbox-disabled');
                    $input.closest('label').removeClass('zr-checkbox-wrapper-disabled');
                }
    
                if(opt.afterFn) opt.afterFn();
            }
        }
    },
    ajax:{}

}

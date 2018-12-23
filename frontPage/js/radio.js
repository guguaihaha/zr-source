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
        },
        // closeEvent:function(opt){
        //     if(opt.array.length>0){
        //         $.each(opt.array,function(index,elem){
        //             //console.log($(elem).prop("class"));
        //                 var pubClass=$(elem).prop("class"),
        //                     label;
        //                 if(pubClass.indexOf("zr-radio-vertical")>-1){
        //                     pubClass="zr-radio-middle";
        //                     label=$("<label class='"+pubClass+" zr-radio-module"+"'></label>");
        //                 }else{
        //                     label=$("<label class='zr-radio-module'></label>");
        //                 }
        //                 var str="";
        //                 if($(elem).get(0).disabled){
        //                     label.addClass(_radio.options._obj.options.disabledClassName);
        //                 }
        //                 if($(elem).get(0).checked){
        //                     label.addClass(_radio.options._obj.options.radioedClassName);
        //                 }
        //                 $(elem).after(label).addClass("zr-radio-hide");
        //                 str+='<div class="zr-radio-simulation"><span class="zr-radio-normal"><span></span></span><div class="zr-radio-text">';
        //                 $(elem).attr("title")==undefined ? str+='</div></div>' : str+=$(elem).attr("title")+'</div></div>';
        //                 label.append(str);
        //                 //绑定自定义事件
        //                 _radio.eventFn.customEventFn(elem);
        //                 label.off("click",_radio.eventFn.radioFn).on("click",_radio.eventFn.radioFn);
        //         })
                
        //     }
        // }
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
        },
        // radioFn: function () {
        //     if($(this).hasClass(_radio.options._obj.options.radioedClassName)){
        //         return;
        //     }else{
        //         if($(this).hasClass(_radio.options._obj.options.disabledClassName)){
        //             return;
        //         }else{
        //             var name=$("[name='"+$(this).prev().attr("name")+"']");
        //             $.each(name, function (index,elem) {
        //                 $(elem).next().removeClass(_radio.options._obj.options.radioedClassName);
        //             })
        //             $(this).addClass(_radio.options._obj.options.radioedClassName);
        //             $(this).prev().get(0).checked=true;
        //             //添加onchnage事件的监听
        //             $(this).prev().trigger("change");
        //         }

        //     }
        // },
        // customEventFn:function(elem){
        //     $(elem)[0]["zrChange"]=function(opts){
        //         opts= $.extend({
        //             disabled:false,
        //             checked:false
        //         },opts||{})
        //         //判断是否禁用
        //         if(opts.disabled){
        //             $(this).attr("disabled","disabled");
        //             $(this).next().addClass("zr-radio-disable")
        //         }else{
        //             $(this).removeAttr("disabled");
        //             $(this).next().removeClass("zr-radio-disable")
        //         }
        //         //判断是否选中
        //         if(opts.checked){
        //             $(this).attr("checked","checked");
        //             $(this).next().addClass("zr-radio-radioed")
        //         }else{
        //             $(this).removeAttr("checked");
        //             $(this).next().removeClass("zr-radio-radioed")
        //         }
        //     }
        // }
    },
    ajax:{}

}



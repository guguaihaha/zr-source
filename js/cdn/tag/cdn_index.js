Zr.add("./tag/cdn_index", function (zr, $) {
    var _tag = {
        init: function () {
            $(document).on('click','.zr-tag-closable i',function(){
                _tag.events.closableTagClickEvent(this);
            })
            $(document).on('click','.zr-tag-addable',function(){
                _tag.events.addableTagClickEvent(this);
            })
            $(document).on('blur','.zr-tag-input',function(){
                _tag.events.inputBlurEvent(this);
            })
        },
        events: {
            closableTagClickEvent:function(obj){
                $(obj).parents('.zr-tag-closable').remove();
            },
            addableTagClickEvent:function(obj){
                var curInp=$(obj).parents('.zr-tag').find('.zr-tag-input');
                curInp.show();
                curInp.focus();
            },
            inputBlurEvent:function(obj){
                $(obj).hide();
                var val=$(obj).val();
                if(val){
                    var tagClosable='<span class="zr-tag-closable">'+val+' <i class="zricon-close"></i></span>';
                    $(obj).parents('.zr-tag').before(tagClosable);
                    $(obj).val('');
                }
            },
        },
        eventFn: {


        }
    }
    return {
        init: function () {
            _tag.init();
        }
    }
}, {requires: ["jquery","/tag/css/cdn_index.css"]})

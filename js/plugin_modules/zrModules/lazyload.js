Zr.add("./zrModules/lazyload",function(zr,$){
    var lazyload={
        init:function(dom){
            lazyload.eventFn.checkShow(dom);
        },
        eventFn:{
            isShow:function($el){
                var winH = $(window).height(),
                    scrollH = $(window).scrollTop(),
                    top = $el.offset().top;
                if(top < scrollH + winH){
                    return true;
                }else{
                    return false;
                }
            },
            checkShow:function(dom){
                dom.each(function(){
                    var $cur = $(this);
                    if($cur.attr("data-src")=="undefined"){return;}//�ж��Ƿ��Ѽ���
                    if (lazyload.eventFn.isShow($cur)) {
                        $cur.attr('src', $cur.attr('data-src'));
                        $cur.removeAttr("data-src");
                    };
                });
            }
        }
    }
    return {
        init:lazyload.init
    }
},{
    requires: [
        'jquery',
    ]
})

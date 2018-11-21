Zr.add("./js/code",function(zr,$){

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml (string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }
    $(".c-code-inner").each(function(){
        var text = $(this).html();
        text = escapeHtml(text);
        text = text.replace(/[\r\t\n]+/g,"</div></li><li><div class='code-row'>");
        $(this).html("<pre><ol><li><div class='code-row'>"+text+"</div></li></ol></pre>");
        var $li = $(this).find("li");
        $li.eq($li.length - 1).remove();
        if($li.eq(0).find(".code-row").html() == ""){
            $li.eq(0).remove();
        }
    })
    //附加事件
    $(".c-toggle").off("click").on("click",function(){
        if($(this).hasClass("c-code-up")){
            $(this).removeClass("c-code-up");
            $(this).parent().find(".c-code-inner").removeClass("c-code-show").addClass("c-code-hide");
            $(this).find("span").text("显示代码");
        }else{
            $(this).addClass("c-code-up");
            $(this).parent().find(".c-code-inner").removeClass("c-code-hide").addClass("c-code-show");
            $(this).find("span").text("隐藏代码");
        }
    })
    return {}
},{requires:["jquery"]})
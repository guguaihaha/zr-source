Zr.add("./js/quickMenu",function(zr,$){
   $(function(){
       var rets = [],
           name = "",
           ps,pt,
           pots = "";
       $(".c-sub-title").each(function(i){
           name = $(this).attr("id","zrq_"+i).find("p").text().replace("#","");
           ps = $(this).offset();
           pt = ps.top;
           pots += "<li><a href=\"#zrq_"+i+"\">"+name+"</a></li>"
           rets.push(pt);
       })
       $(".quickMenu").remove();
       var html = "<div class=\"quickMenu\">";
       html += "<ul>";
       html += pots;
       html += "</ul>";
       html += "<div class=\"quickCur\"></div>";
       html += "</div>";
       $("body").append(html);
       var ps = parseFloat($(".header").height()) || {top:63};
       $(".quickMenu").css("top",ps.top+30);
       //
       function resetTop(top){
           var index = 0;
           $.each(rets,function(i,n){
               if(parseFloat(top) >= parseFloat(n)){
                   index = i;
               }
           })
           $(".quickCur").css("top",12+30*index)
       }
       resetTop($(document).scrollTop())
       $(document).bind("scroll",function(){
           resetTop($(document).scrollTop())
       })
   })
    return {}
},{requires:[
    'jquery'
]})
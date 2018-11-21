
"use strict";Zr.add("./dragFloat/cdn_index",function(zr,$,other){$.fn.dragFloat=function(options){var defaults={dragHand:[".dragHand"],dragBox:".warpBox",xModules:4,x:10,y:10,fx:20,fy:0,dragStart:function dragStart(){},dragEnd:function dragEnd(){},click:function click(){},disabledClassName:[],dragModule:"<div class='dragModulePlaceholder'><div class='inner'></div></div>"};var readOnly={dragOnClassName:"dragFloatTarget",dragAllObjectClassName:"dragFloatNowObject",dragReadClassName:"dragReadClassName"};var options=$.extend(defaults,options,readOnly);var _this=this;var position=$(this).eq(0).css("position");if(position!="absolute"){log("请检查模块必须为position类型");return false;}
    function log(msg){console.log('%c '+msg,'color:#fdad2f');}
    $(_this).closest(options.dragBox).addClass(options.dragReadClassName).data("options",options);function resize(selector){var ps="",psl=0,pst=0;$(selector).each(function(i){var lastW=0,lastH=0,lastPs="",lastPsl=0,lastpst=0,$laprev="";psl=0,pst=0;var num=0;if(i<options.xModules){num=i-1;}else{num=i-options.xModules;}
        $laprev=$(selector).eq(num);if($laprev.length&&num>-1){lastW=parseFloat($laprev.width());lastH=parseFloat($laprev.height());lastPsl=parseFloat($laprev.css("left")||"0");lastpst=parseFloat($laprev.css("top")||"0");}
        var left=0,top=0;if(i<options.xModules){left+=lastPsl+lastW+options.x;top+=options.y;}else{left+=lastPsl;top+=lastpst+lastH+options.y;}
        $(this).css({left:left,top:top});});var dragReadClassName=resetModules(selector);$(selector).closest(".dragReadClassName").data("dragReadClassName",dragReadClassName);}
    resize(_this);$(_this).addClass(options.dragAllObjectClassName);function resetModules(obj){var rets=[],ret={};var _w,_h,_l,_t,_r,_b;var $obj=$(obj).closest(".dragReadClassName"),opt=$obj.data("options");$(obj).each(function(i){var success=1;var $this=$(this);if(typeof opt.disabledClassName=='string'){opt.disabledClassName=[opt.disabledClassName];}
        $.each(opt.disabledClassName,function(i,n){if($this.hasClass(n)){success=0;}});if(success){_w=parseFloat($this.width());_h=parseFloat($this.height());_l=parseFloat($this.css("left"));_t=parseFloat($this.css("top"));_r=_l+_w-opt.fx;_b=_t+_h-opt.fy;ret={left:_l+opt.fx,right:_r,top:_t+opt.fy,bottom:_b,index:i};rets.push(ret);}});return rets;}
    function bind(obj){var opt=$(obj).closest(".dragReadClassName").data("options");if(typeof opt.dragHand=='string'){opt.dragHand=[opt.dragHand];}
        $.each(opt.dragHand,function(i,n){$(obj).find(n).unbind("mousedown").bind("mousedown",mouseDownEvent);});}
    function unbind(){var $this=$(this);var opt=$this.closest(".dragReadClassName").data("options");if(typeof opt.dragHand=='string'){opt.dragHand=[options.dragHand];}
        $.each(opt.dragHand,function(i,n){$this.find(n).unbind("mousedown");$this.find(n).unbind("mousemove");$this.find(n).unbind("mouseup");});}
    var $prev="";var p_cur={},cur={},$now="";var fix={};function mouseDownEvent(e){var _this=this;var $p=$(_this).closest(".dragReadClassName"),opt=$p.data("options"),varchar=$p.data("varchar")||{};$prev=varchar.$prev||"";p_cur=varchar.p_cur||{};cur=varchar.cur||{};$now=varchar.$now||"";fix=varchar.fix||"";if(opt.dragStart){opt.dragStart.call(this);}
        if(typeof opt.disabledClassName=='string'){opt.disabledClassName=[opt.disabledClassName];}
        var success=1;$.each(opt.disabledClassName,function(i,n){if($(_this).closest("."+opt.dragAllObjectClassName).hasClass(n)){success=0;}});if(!success){return false;}
        if($prev){$prev.remove();$prev="";}
        var $this=$(this).closest("."+opt.dragAllObjectClassName);var nowIndex=$p.find("."+opt.dragAllObjectClassName).index($this);$this.removeClass(opt.dragAllObjectClassName);var w=parseFloat($this.width()),h=parseFloat($this.height()),left=parseFloat($this.css("left")),top=parseFloat($this.css("top"));$this.before(options.dragModule).prev().addClass("dragModulePlaceholder "+opt.dragAllObjectClassName);$prev=$this.prev();$prev.css({width:w,height:h,left:left,top:top});$this.addClass(opt.dragOnClassName);$now=$("."+opt.dragOnClassName);p_cur=eventPs(opt.dragBox);cur=eventLT($this);var mouse=mousePs(e);fix={left:mouse.left-p_cur.left-cur.left,top:mouse.top-p_cur.top-cur.top};var varchar={$prev:$prev,p_cur:p_cur,cur:cur,$now:$now,fix:fix,time:+new Date(),targetPosition:{left:left,top:top},nowIndex:nowIndex};$p.data("varchar",varchar);$(_this).unbind("mousemove").bind("mousemove",mouseMoveEvent);$(_this).unbind("mouseup").bind("mouseup",mouseUpEvent);}
    var $dragBox=$(options.dragBox);if($dragBox.length==0){log("配置项中无法找到dragBox的所对应的Dom节点对象,请检查后重试");return false;}
    var dps=$dragBox.offset(),dpsl=parseFloat(dps.left),dpst=parseFloat(dps.top);function mouseMoveEvent(e){if($now&&$now.length){var mouse=mousePs(e);var fix_left=mouse.left-p_cur.left-fix.left,fix_top=mouse.top-p_cur.top-fix.top;$now.css({left:fix_left,top:fix_top});var mv=mvsm.call(this,{left:mouse.left-p_cur.left,top:mouse.top-p_cur.top});if(mv){placeholderMove.call(this,mv);}}}
    function placeholderMove(mv){var $dragReadClassName=$(this).closest(".dragReadClassName");var opt=$dragReadClassName.data("options");var varchar=$dragReadClassName.data("varchar");var moveIndex=varchar.nowIndex;var $dragModulePlaceholder=$dragReadClassName.find(".dragModulePlaceholder");$dragModulePlaceholder.css({left:mv.left-opt.fx,top:mv.top-opt.fy});var $mvp=$dragReadClassName.find("."+opt.dragAllObjectClassName).eq(mv.index);if(mv.index>moveIndex){$mvp.after($dragModulePlaceholder);}else if(mv.index<moveIndex){$mvp.before($dragModulePlaceholder);}
        resize($dragReadClassName.find("."+opt.dragAllObjectClassName));varchar.nowIndex=mv.index;varchar.targetPosition={left:mv.left-opt.fx,top:mv.top-opt.fy};$dragReadClassName.data("varchar",varchar);}
    function mouseUpEvent(){$now="";var _this=this;$(_this).unbind("mousemove");$(_this).unbind("mouseup");var $dragReadClassName=$(_this).closest(".dragReadClassName");var opt=$dragReadClassName.data("options");var varchar=$dragReadClassName.data("varchar");var $dragOnClassName=$dragReadClassName.find("."+opt.dragOnClassName);var time=+new Date();var reduceTime=time-varchar.time;var success=1;$.each(opt.disabledClassName,function(i,n){if($(_this).closest("."+opt.dragAllObjectClassName).hasClass(n)){success=0;}});if(!success){return false;}
        $dragOnClassName.css({left:varchar.targetPosition.left,top:varchar.targetPosition.top}).removeClass(opt.dragOnClassName).addClass(opt.dragAllObjectClassName);$dragReadClassName.find(".dragModulePlaceholder").before($dragOnClassName).remove();if(reduceTime<300){if(opt.click){opt.click.call(_this);}
            return false;}
        if(opt.dragEnd){opt.dragEnd.call(_this);}}
    function mvsm(mouse){var rets="";var dragReadArray=$(this).closest(".dragReadClassName").data("dragReadClassName");var left=mouse.left,top=mouse.top;$.each(dragReadArray,function(i,n){if(left>=n.left&&top>=n.top&&left<=n.right&&top<=n.bottom){rets=n;}});return rets;}
    function mousePs(e){var ot=new Object();ot.left=parseFloat(e.pageX);ot.top=parseFloat(e.pageY);return ot;}
    function warpPs(){var ot={};var ps=$(options.dragBox).offset();ot.left=parseFloat(ps.left);ot.top=parseFloat(ps.top);return ot;}
    function eventPs(obj){var ot={};var ps=$(obj).offset();ot.left=parseFloat(ps.left);ot.top=parseFloat(ps.top);return ot;}
    function eventLT(obj){var ot={};var ps=$(obj);ot.left=parseFloat(ps.css("left"));ot.top=parseFloat(ps.css("top"));return ot;}
    function parentPs(obj){var ot=new Object();var ps=$(obj).parent().offset();ot.left=parseFloat(ps.left);ot.top=parseFloat(ps.top);return ot;}
    function limitMove(obj){var ot=new Object();var width=$(options.dragBox).width();var height=$(options.dragBox).height();var w=$(obj).eq(0).width();var h=$(obj).eq(0).height();ot.left1=0;ot.top1=0;ot.left2=width-w;ot.top2=0;ot.left3=0;ot.top3=height-h;ot.left4=width-w;ot.top4=height-h;return ot;}
    bind(_this);return{id:_this,destory:function destory(){unbind.call(this.id);},resize:resize};};return{};},{requires:["jquery"]});
(function(){
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/28 下午9:00
     * @Description:默认模块配置
     */
    var config = {
        "jquery":{
            "path":"./jquery/",
            "dependencies":{}
        },
        "jquery3":{
            "path":"./jquery.3/",
            "dependencies":{}
        },
        "zepto":{
            "path":"./zepto/",
            "dependencies":{}
        },
        "mobiscroll":{
            "path":"./mobiscroll/"
        },
        "perfectscrollbar":{
            "path":"./perfectscrollbar/"
        },
        "swiper":{
            "path":"./swiper/"
        },
        "gmap":{
            "path":"./gmap/"
        },
        "echarts":{
            "path":"./echarts/"
        },
        "echartsSimple":{
            "path":"./echarts/echarts-simple"
        },
        "echartsNormal":{
            "path":"./echarts/echarts-normal"
        },
        "toast":{
            "path":"./toast/"
        },
        "animate":{
            "path":"./animate/"
        },
        "compress":{
            "path":"./compress/"
        },
        "dragFloat":{
            "path":"./dragFloat/"
        },
        "message":{
            "path":"./zrModules/message/"
        },
        "tab":{
            "path":"./zrModules/tab"
        },
        "tmpl":{
            "path":"./tmpl/"
        }
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/30 下午9:49
     * @Description:所有内置模块的集合，需要压缩后处理
     */
//all inner modules code DEMO


    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/30 下午9:47
     * @Description:各个模块的配置,包含选择器名称与模块名称
     */
    var prefix = "zr";
    var moduleSelectors = [
        {
            selectorName:"."+prefix+"-dropdown",
            moduleName:"_dropdown",
            options:{
                showMenuClassName:prefix+"-dropdown-show",//显示下拉菜单
                centerClassName:prefix+"-dropdown-center",//居中名称
                menuClassName:prefix+"-dropdown-menu",//菜单名称
                domEventName:prefix+"-event",//获取触发事件的方法
                cacheName:prefix+"-show"//设置节点是否已缓存的名称
            }
        },
        {
            selectorName:"."+prefix+"-alert",
            moduleName:"_alert",
            options:{
                closeSelector:"."+prefix+"-alert-close",//关闭的样式名称
                isRemove:true,//关闭后，是否是移除，默认是移除,否则是隐藏
            }
        },
        {
            selectorName:"."+prefix+"-input",
            moduleName:"_input",
            options:{
                clearSelector:"."+prefix+"-input-clear",
                clearClassName:prefix+"-input-clear",
                groupSelector:"."+prefix+"-input-group",
            }
        },
        {
            selectorName:"."+prefix+"-textarea",
            moduleName:"_input",
            options:{
                txtNumSelector:"."+prefix+"-input-num",
                groupSelector:"."+prefix+"-input-group",
            }
        },
        {
            selectorName:"."+prefix+"-radio",
            moduleName:"_radio",
            options:{
                radioedClassName:prefix+"-radio-radioed",//选中的radio
                disabledClassName:prefix+"-radio-disable",//禁用的radio
                verticalClassName:prefix+"-radio-vertical"//垂直排列的radio
            }
        },
        {
            selectorName:"."+prefix+"-checkbox",
            moduleName:"_checkbox",
            options:{
                checkedAllClassName:prefix+"-checkbox-all",//全选
                checkedClassName:prefix+"-checkbox-checked",//选中
                disabledClassName:prefix+"-checkbox-disable",//禁用的checkbox
                containerClassName:prefix+"-checkbox-container",//全选的容器
                sigleContainerClassName:prefix+"-checkbox-sigle-container",//全选组件中的单选框
                allContainerClassName:prefix+"-checkbox-all-container",//全选组件中的全选框
                uncheckClassName:prefix+"-checkbox-uncheck"//全选按钮没有全部选中的情况下
            }
        },
        {
            selectorName:"."+prefix+"-select",
            moduleName:"_select",
            options:{
                hideClassName:prefix + "-select-hide",//隐藏
                disableClassName:prefix + "-select-disable",//禁用样式
                smClassName:prefix + "-select-sm",//sm
                lgClassName:prefix + "-select-lg",//lg
                titleClassName:"."+prefix + "-select-title",//显示选择项内容
                contentClassName:"."+prefix + "-select-content",//下拉选择项列表
                unselectClassName:"."+prefix + "-unselect"

            }
        },
        // {
        //     selectorName:"."+prefix+"-timeline",
        //     moduleName:"_timeline",
        //     options:{
        //     }
        // },
        {
            selectorName:"."+prefix+"-nav",
            moduleName:"_nav",
            options:{
                itemClassName:"."+prefix + "-nav-item", //item项
                treeClassName:prefix + "-nav-tree", //侧边导航
				disableClassName:prefix + "-nav-disable", //禁用效果
                showClassName:prefix + "-nav-show", //显示菜单
                selectedClassName:prefix + "-nav-selected", //选中
                shrinkClassName:prefix + "-nav-shrink", //收缩菜单
                buttonClassName:"." + prefix + "-nav-button", //控制收缩的button
                collapsedClassName:prefix + "-nav-collapsed" //展开菜单
            }
        },
        {
            selectorName: "." + prefix + "-upload",
            moduleName: "_upload",
            options: {
                moduleClassName: prefix + "-upload-module",
                explainClassName: prefix + "-upload-explain", //带说明文字
                avatarClassName: prefix + "-upload-avatar",  //上传头像
                pictureClassName: prefix + "-upload-picture",  //多图片上传
                photoClassName: prefix + "-upload-photo",  //图片列表
                verticalClassName: prefix + "-upload-list-vertical",  //图片列表垂直排列
                dragClassName: prefix + "-upload-drag",  //可拖拽上传
                manualClassName: prefix + "-upload-manual",  //手动上传
                listClassName: prefix + "-upload-list",  //默认列表
                pictureListClassName: prefix + "-upload-list-picture",  //多图片上传列表
                photoListClassName: prefix + "-upload-list-photo",  //图片列表
                hideClassName: prefix + "-upload-hide"
            }
        },
        {
            selectorName:"."+prefix+"-layout",
            moduleName:"_layout",
            options:{
                sideTriggerClassName:prefix + "-layout-side-trigger",
                sideClassName:prefix + "-layout-side",
                collapsedClassName:prefix + "-layout-collapsedClassName",
                collapsedNavClassName:prefix + "-nav-collapsed", //展开菜单
                navSelector:prefix+"-nav",
                trigger:prefix + "-layout-trigger",
                photo:prefix+"-layout-info-photo"
            }
        },
        {
            selectorName:"."+prefix+"-badge",
            moduleName:"_badge",
            options:{

            }
        }
    ]


// hasOwnProperty   = ObjProto.hasOwnProperty;
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/30 下午9:46
     * @Description:zr的继承方法
     */
    Zr.config({
        module:config,
        moduleSelectors:moduleSelectors,
        language:"zh-CN"
    })
})()


Zr.add("./zr/index",function(zr,$){
    //
    zr.global.init = zr.init = _init;
    zr.dom = {
        //初始化配置
        init:_init,
        //手动绑定组件到页面节点元素
        dispatch:_init_auto,
        //自动观察页面节点变化，并通知相应的组件进行相应
        autoDispatch:_init_observer,
        //手动查找页面节点元素
        find:_find,
        //所有ajax请求
        ajax:_ajax,
        //滚动队列
        scrollQueen:[],
        //点击队列
        clickQueen:[]
    }
    //



    var _alert={uid:40100000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.closeEvent(domObject);},options:{_obj:{},},events:{closeEvent:function(opt){var $ret="";$.each(opt.array,function(i,n){$ret=$(n).find(opt.options.closeSelector);if($ret.length>0){$ret.off("click",_alert.eventFn.closeFn).on("click",_alert.eventFn.closeFn);}})}},eventFn:{closeFn:function(){if(_alert.options._obj.options.isRemove){$(this).closest(_alert.options._obj.selector).remove();}else{$(this).closest(_alert.options._obj.selector).hide();}}},ajax:{}}
    var _checkbox={uid:30400000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.closeEvent(domObject);},options:{_obj:{},},events:{closeEvent:function(opt){if(opt.array.length>0){$.each(opt.array,function(index,elem){var pubClass=$(elem).prop("class");pubClass=pubClass.replace("zr-checkbox","");var str="",label=$("<label class='"+pubClass+"  zr-checkbox-module"+"'></label>");if($(elem).get(0).disabled){label.addClass("zr-checkbox-disable");}
        if($(elem).get(0).checked){label.addClass(_checkbox.options._obj.options.checkedClassName);}
        str+='<div class="zr-checkbox-simulation"><span class="zr-checkbox-normal">';str+='<span></span></span><div class="zr-checkbox-text">';$(elem).attr("title")==undefined?str+='</div></div>':str+=$(elem).attr("title")+'</div></div>';label.append(str);$(elem).after(label).addClass("zr-checkbox-hide");if($(elem).next().length>0){if($(elem).next().hasClass(_checkbox.options._obj.options.checkedAllClassName)&&$(elem).get(0).checked){var that=$(elem);var check=$(elem).parents(".zr-checkbox-container").eq(0).find(".zr-checkbox-sigle-container input[type='checkbox']");$.each(check,function(index,elem){$(elem).get(0).checked=that.get(0).checked;if($(elem).next().hasClass("zr-checkbox-module")){$(elem).get(0).checked?$(elem).next().addClass(_checkbox.options._obj.options.checkedClassName):$(elem).next().removeClass(_checkbox.options._obj.options.checkedClassName);}})}}
        label.off("click",_checkbox.eventFn.checkedFn).on("click",_checkbox.eventFn.checkedFn);})}}},eventFn:{checkedFn:function(){if($(this).hasClass(_checkbox.options._obj.options.disabledClassName)){return;}else{if($(this).hasClass(_checkbox.options._obj.options.checkedClassName)){$(this).removeClass(_checkbox.options._obj.options.checkedClassName);}else{$(this).addClass(_checkbox.options._obj.options.checkedClassName)}
        $(this).prev().get(0).checked=!$(this).prev().get(0).checked;if($(this).parent().hasClass(_checkbox.options._obj.options.allContainerClassName)){if($(this).hasClass(_checkbox.options._obj.options.checkedAllClassName)){var that_check=$(this).prev().get(0).checked;if(that_check){$(this).addClass(_checkbox.options._obj.options.checkedClassName);$(this).find(".zr-checkbox-normal").children("span").removeClass(_checkbox.options._obj.options.uncheckClassName)}
            var check=$(this).parents(".zr-checkbox-container").eq(0).find(".zr-checkbox-sigle-container input[type='checkbox']");$.each(check,function(index,elem){$(elem).get(0).checked=that_check;$(elem).get(0).checked?$(elem).next().addClass(_checkbox.options._obj.options.checkedClassName):$(elem).next().removeClass(_checkbox.options._obj.options.checkedClassName)})}}
        if($(this).parent().hasClass(_checkbox.options._obj.options.sigleContainerClassName)){var check=$(this).siblings("input[type='checkbox']"),is_check_num=0,all_check_status=$(this).parents("."+_checkbox.options._obj.options.containerClassName).eq(0).find(".zr-checkbox-all");if(check.length>0){$.each(check,function(index,elem){if($(elem).get(0).checked){is_check_num+=1;}})
            if(is_check_num==check.length){all_check_status.addClass(_checkbox.options._obj.options.checkedClassName);all_check_status.find(".zr-checkbox-normal").find("span").removeClass()
                all_check_status.prev().get(0).checked=true;}else{all_check_status.find(".zr-checkbox-normal").find("span").addClass(_checkbox.options._obj.options.uncheckClassName)
                all_check_status.addClass(_checkbox.options._obj.options.checkedClassName);all_check_status.prev().get(0).checked=false;}
            if(is_check_num==0){all_check_status.removeClass(_checkbox.options._obj.options.checkedClassName);all_check_status.find(".zr-checkbox-normal").find("span").removeClass()}}}}}},ajax:{}}
    var _dropdown={uid:20300000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.eventList(domObject.array);},options:{_obj:{},},events:{eventList:function(array){var eventName="",centerName="",_w1=0,$menu,_w2=0,_l1=0;$.each(array,function(i,n){var _this=this;centerName=$(this).hasClass(_dropdown.options._obj.options.centerClassName);if(centerName){_w1=parseFloat($(this).width());$menu=$(this).find("."+_dropdown.options._obj.options.menuClassName);if($menu.length){_w2=parseFloat($menu.width());_l1=_w1/2-_w2/2;$menu.css("left",_l1);}}
        eventName=$(this).attr(_dropdown.options._obj.options.domEventName);$(this).on(eventName==="click"?eventName:"click mouseover",function(ev){ev.stopPropagation();if(ev.type==="click"&&$(this).hasClass(_dropdown.options._obj.options.showMenuClassName)){$(this).removeData(_dropdown.options._obj.options.cacheName);$(this).removeClass(_dropdown.options._obj.options.showMenuClassName);return false;}
            $(this).data(_dropdown.options._obj.options.cacheName,1);$(this).addClass(_dropdown.options._obj.options.showMenuClassName);})
        if(eventName!=="click"){$(this).on("mouseout",function(ev){var _this=this;$(this).removeData(_dropdown.options._obj.options.cacheName);Zr.tools.later(function(){if(!$(_this).data(_dropdown.options._obj.options.cacheName)){$(_this).removeData(_dropdown.options._obj.options.cacheName);$(_this).removeClass(_dropdown.options._obj.options.showMenuClassName);}},150);})}
        $(this).find("."+_dropdown.options._obj.options.menuClassName).on("click",function(ev){ev.stopPropagation();Zr.tools.later(function(){$(_this).removeData(_dropdown.options._obj.options.cacheName);$(_this).removeClass(_dropdown.options._obj.options.showMenuClassName);},300);})})
        zr.dom.clickQueen.push(function(){$.each(array,function(i,n){$(this).removeClass(_dropdown.options._obj.options.showMenuClassName);})})}},eventFn:{listStatus:function(){}},ajax:{}}
    var _input={uid:30100000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.bindEvent(domObject);},options:{_obj:{},cacheName:"input_cache"},events:{bindEvent:function(opt){var $ret1="";if(opt.selector==".zr-textarea"){$.each(opt.array,function(i,n){$(n).data(_input.options.cacheName,_input.options._obj);if($(n).length>0){$(n).wrap("<div class='zr-input-group'></div>");var maxLength=$(n).attr("maxLength"),txtNum="<div class='zr-input-num'><span>0</span><span>/</span><span>"+maxLength+"</span></div>";if(maxLength){$(n).after(txtNum);$(n).off("keyup").on("keyup",_input.eventFn.inputNumFn);}}})}else{$.each(opt.array,function(i,n){if($(n).hasClass(opt.options.clearClassName)){$(n).data(_input.options.cacheName,_input.options._obj);$(n).wrap("<div class='zr-input-group'></div>");var iconHtml='<i class="zricon-close-circle"></i>';$(n).after(iconHtml);$ret1=$(n).closest(opt.options.groupSelector).find(".zricon-close-circle");$ret1.data(_input.options.cacheName,_input.options._obj);$(n).off("input").on("input",_input.eventFn.showIconFn);if($ret1.length>0){$ret1.off("click").on("click",_input.eventFn.clearFn);}}})}}},eventFn:{clearFn:function(){var _obj=$(this).data(_input.options.cacheName);$(this).closest(_obj.options.groupSelector).find(_obj.selector).val("");$(this).hide();},showIconFn:function(){var _obj=$(this).data(_input.options.cacheName);if($(this).val().length>0){$(this).closest(_obj.options.groupSelector).find(".zricon-close-circle").show();}else{$(this).closest(_obj.options.groupSelector).find(".zricon-close-circle").hide();}},inputNumFn:function(){var _obj=$(this).data(_input.options.cacheName);var txtLength=$.trim($(this).val()).length,maxLength=$(this).attr("maxLength");$(this).closest(_obj.options.groupSelector).find(_obj.options.txtNumSelector).find("span").eq(0).text(txtLength);if(txtLength==0){$(this).closest(_obj.options.groupSelector).find(_obj.options.txtNumSelector).find("span").eq(0).css("color","rgba(0,0,0,0.25)");}else if(txtLength<maxLength){$(this).closest(_obj.options.groupSelector).find(_obj.options.txtNumSelector).find("span").eq(0).css("color","rgba(0,0,0,0.45)");}else{$(this).closest(_obj.options.groupSelector).find(_obj.options.txtNumSelector).find("span").eq(0).css("color","red");}}},ajax:{}}
    var _layout={uid:10300000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.eventList(domObject);},options:{_obj:{},},events:{eventList:function(opt){var $ret1="";$.each(opt.array,function(i,n){if($(this).hasClass(_layout.options._obj.options.sideTriggerClassName)){$ret1=$(this).find("."+_layout.options._obj.options.navSelector);$ret1=$ret1.attr("trigger");if($ret1){_layout.events.eventTriggerother(this,$ret1);}}})},eventTriggerother:function(dom,domTrigger){$("#"+domTrigger).data("dom",dom).on("click",function(){var $dom=$($(this).data("dom"));var $nav=$dom.find("."+_layout.options._obj.options.navSelector),$side=$nav.closest("."+_layout.options._obj.options.sideClassName);if(!$side.hasClass(_layout.options._obj.options.collapsedClassName)){$side.addClass(_layout.options._obj.options.collapsedClassName);}else{$side.removeClass(_layout.options._obj.options.collapsedClassName);}})},eventTrigger:function(dom){var $trigger=$(dom).find("."+_layout.options._obj.options.trigger);if($trigger.length==0){$trigger=$(dom).parent().closest(_layout.options._obj.selector).find("."+_layout.options._obj.options.trigger);}
        $trigger.find("."+_layout.options._obj.options.trigger).on("click",function(){var $obj=$(this).closest("."+_layout.options._obj.options.sideTriggerClassName);alert($obj.length)
            var $side=$obj.find("."+_layout.options._obj.options.sideClassName),$nav=$obj.find("."+_layout.options._obj.options.navSelector);if(!$side.hasClass(_layout.options._obj.options.collapsedClassName)){$side.addClass(_layout.options._obj.options.collapsedClassName);}else{$side.removeClass(_layout.options._obj.options.collapsedClassName);}})}},eventFn:{},ajax:{}}
    var _nav={uid:20200000,version:"1.0.0",init:function(domObject){console.log(domObject);this.options._obj=domObject;this.events.eventList(domObject);},options:{_obj:{},cacheName:"nav_cache"},events:{eventList:function(opt){var $ret1="",tri,$ret2;$.each(opt.array,function(i,n){$ret1=$(n).find(opt.options.itemClassName);tri=$(n).attr("trigger");$ret2=$("#"+tri);$ret1.data(_nav.options.cacheName,_nav.options._obj);$ret2.data(_nav.options.cacheName,_nav.options._obj);if($ret1.length>0){$ret1.off('mouseover').on('mouseover',_nav.eventFn.showMenu);$ret1.off('mouseout').on('mouseout',_nav.eventFn.hideMenu);}
        if($(n).hasClass(opt.options.treeClassName)){$ret1.on('click',_nav.eventFn.showMenu);if($(n).hasClass(opt.options.shrinkClassName)){$ret2.on('click',_nav.eventFn.shrinkMenu);}}})}},eventFn:{showMenu:function(ev){var _obj=$(this).data(_nav.options.cacheName);if($(this).hasClass(_obj.options.disableClassName)){return false;}
        if(ev.type=='mouseover'){if($(this).closest(_obj.selector).hasClass(_obj.options.treeClassName)&&!($(this).closest(_obj.selector).hasClass(_obj.options.collapsedClassName))){return false;}else{$(this).addClass(_obj.options.showClassName).siblings().removeClass(_obj.options.showClassName);$(this).data(_obj.options.showClassName,1);}}else{ev.stopPropagation();if($(this).find(_obj.options.itemClassName).hasClass(_obj.options.disableClassName)){$(this).find('.'+_obj.options.disableClassName).addClass(_obj.options.showClassName);}else{$(this).find(_obj.options.itemClassName).removeClass(_obj.options.showClassName);}
            $(this).toggleClass(_obj.options.showClassName).siblings().removeClass(_obj.options.showClassName);if(!$(this).hasClass(_obj.options.showClassName)){$(this).find(_obj.options.itemClassName).removeClass(_obj.options.showClassName);}
            if($(this).find(_obj.options.itemClassName).length==0){$(this).closest(_obj.selector).find(_obj.options.itemClassName).removeClass(_obj.options.selectedClassName);$(this).addClass(_obj.options.selectedClassName);$(this).closest("."+_obj.options.collapsedClassName+">"+_obj.options.itemClassName).addClass(_obj.options.selectedClassName);}
            if(!$(this).attr("zr-isselected")){$(this).attr("zr-isselected","selected").siblings().attr("zr-isselected","");}else{$(this).attr("zr-isselected","")};}},hideMenu:function(){var _obj=$(this).data(_nav.options.cacheName);if($(this).closest(_obj.selector).hasClass(_obj.options.treeClassName)&&!($(this).closest(_obj.selector).hasClass(_obj.options.collapsedClassName))){return false;}else{var _this=this;$(this).removeData(_obj.options.showClassName);setTimeout(function(){if(!$(_this).data(_obj.options.showClassName)){$(_this).removeData(_obj.options.showClassName);$(_this).removeClass(_obj.options.showClassName);}},150);}},shrinkMenu:function(){var _obj=$(this).data(_nav.options.cacheName);var name=$(this).attr("id");var $target=$(".zr-nav[trigger='"+name+"']");$(this).children('.zricon-left').toggleClass('zricon-right');$target.toggleClass("zr-nav-collapsed");$target.find(_obj.options.itemClassName).removeClass(_obj.options.showClassName);$target.find("> "+_obj.options.itemClassName+"[zr-isselected=selected]").addClass(_obj.options.selectedClassName);if(!$target.hasClass("zr-nav-collapsed")){$target.find("> "+_obj.options.itemClassName+"[zr-isselected=selected]").removeClass(_obj.options.selectedClassName);}}},ajax:{}};var _radio={uid:30300000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.closeEvent(domObject);},options:{_obj:{},},events:{closeEvent:function(opt){if(opt.array.length>0){$.each(opt.array,function(index,elem){var pubClass=$(elem).prop("class");pubClass=pubClass.replace("zr-radio-vertical","zr-radio-middle").replace("zr-radio","");var str="",label=$("<label class='"+pubClass+" zr-radio-module"+"'></label>");if($(elem).get(0).disabled){label.addClass(_radio.options._obj.options.disabledClassName);}
        if($(elem).get(0).checked){label.addClass(_radio.options._obj.options.radioedClassName);}
        $(elem).after(label).addClass("zr-radio-hide");str+='<div class="zr-radio-simulation"><span class="zr-radio-normal"><span></span></span><div class="zr-radio-text">';$(elem).attr("title")==undefined?str+='</div></div>':str+=$(elem).attr("title")+'</div></div>';label.append(str);label.off("click",_radio.eventFn.radioFn).on("click",_radio.eventFn.radioFn);})}}},eventFn:{radioFn:function(){if($(this).hasClass(_radio.options._obj.options.radioedClassName)){return;}else{if($(this).hasClass(_radio.options._obj.options.disabledClassName)){return;}else{var name=$(this).siblings("[name='"+$(this).prev().attr("name")+"']");$.each(name,function(index,elem){$(elem).next().removeClass(_radio.options._obj.options.radioedClassName);})
        $(this).addClass(_radio.options._obj.options.radioedClassName);$(this).prev().click();}}}},ajax:{}}
    var _select={uid:30500000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.eventList(domObject);},options:{_obj:{},cacheName:"input_cache"},events:{eventList:function(opt){$.each(opt.array,function(i,n){$(n).data(_select.options.cacheName,_select.options._obj);_select.eventFn.getValue($(n));});Zr.dom.clickQueen.push(function(){$.each(opt.array,function(i,n){$(_select.options._obj.options.contentClassName).addClass(_select.options._obj.options.hideClassName);$(_select.options._obj.options.titleClassName).find(".zricon-arrow-down").removeClass("zricon-arrow-up")})})}},eventFn:{getValue:function(obj){var _obj=obj.data(_select.options.cacheName);obj.addClass(_obj.options.hideClassName);var opt=obj.find("option"),optArr=[];if(opt.length>0){for(var i=0,j=opt.length;i<j;i++){optArr.push({optVal:$(opt[i]).val(),optText:$(opt[i]).text()})};_select.eventFn.Unselect(obj,optArr);}},Unselect:function(obj,arr){var _obj=obj.data(_select.options.cacheName);var optHtml="",html="",selectAll='<dt class="zr-select-checkbox" zr-option-value=""><span class="zr-select-checkbox-normal"><span class=""></span></span><div class="zr-select-checkbox-text">全选</div></dt>';for(var i=0,j=arr.length;i<j;i++){if(obj.attr("multiple")){optHtml+='<dd class="zr-select-checkbox" zr-option-value="'+arr[i].optVal+'" zr-option-text="'+arr[i].optText+'"><span class="zr-select-checkbox-normal"><span></span></span><div class="zr-select-checkbox-text">'+arr[i].optText+'</div></dd>';}else{optHtml+='<dd zr-option-value="'+arr[i].optVal+'">'+arr[i].optText+'</dd>';}};if(obj.attr("disabled")){html='<div class="zr-unselect zr-select-disable"><div class="zr-select-title zr-input-group"><input type="text" placeholder="'+arr[0].optText+'" readonly="readonly" disabled="disabled" class="zr-input">'+'<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">'+optHtml+'</dl></div>';}else if(obj.attr("multiple")){html='<div class="zr-unselect"><div class="zr-select-title zr-input-group"><input type="text" placeholder="'+arr[0].optText+'" readonly="readonly" class="zr-input">'+'<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">'+selectAll+optHtml+'</dl></div>';}else if(obj.hasClass(_obj.options.smClassName)){html='<div class="zr-unselect"><div class="zr-select-title zr-input-group"><input type="text" placeholder="'+arr[0].optText+'" readonly="readonly" class="zr-input zr-input-sm">'+'<span class="zr-input-addon zr-input-sm"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide zr-select-content-sm">'+optHtml+'</dl></div>';}else if(obj.hasClass(_obj.options.lgClassName)){html='<div class="zr-unselect"><div class="zr-select-title zr-input-group"><input type="text" placeholder="'+arr[0].optText+'" readonly="readonly" class="zr-input zr-input-lg">'+'<span class="zr-input-addon zr-input-lg"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide zr-select-content-lg">'+optHtml+'</dl></div>';}else{html='<div class="zr-unselect"><div class="zr-select-title zr-input-group"><input type="text" placeholder="'+arr[0].optText+'" readonly="readonly" class="zr-input">'+'<span class="zr-input-addon"><i class="zricon-arrow-down"></i></span></div><dl class="zr-select-content zr-select-hide">'+optHtml+'</dl></div>';};obj.after(html);_select.eventFn.clickFn(_obj);},clickFn:function(_obj){$(_obj.options.titleClassName).off("click").on("click",function(ev){ev.stopPropagation();if($(this).closest(_obj.options.unselectClassName).hasClass(_obj.options.disableClassName)){return false;}else{$(this).closest(_obj.options.unselectClassName).children(_obj.options.contentClassName).toggleClass(_obj.options.hideClassName);$(this).find(".zricon-arrow-down").toggleClass("zricon-arrow-up");}});$(".zr-select-content dd").off("click").on("click",function(ev){ev.stopPropagation();if($(this).hasClass("zr-select-checkbox")){var optVal=$(this).attr("zr-option-value"),optText=$(this).attr("zr-option-text"),optArr=[],opt=$(this).closest(_obj.options.contentClassName).find("dd"),optLength=$(this).closest(_obj.options.contentClassName).find("dd").length;for(var i=0,j=opt.length;i<j;i++){if($(opt[i]).hasClass("zr-select-checkbox-checked")){optArr.push({optVal:$(opt[i]).attr("zr-option-value"),optText:$(opt[i]).attr("zr-option-text")})}};$(this).toggleClass("zr-select-checkbox-checked");if($(this).hasClass("zr-select-checkbox-checked")){optArr.push({optVal:optVal,optText:optText})}else{_select.eventFn.removeByValue(optArr,optVal);};_select.eventFn.appendDom($(this),_obj,optArr);_select.eventFn.deleteOpt(_obj);if(optArr&&optArr.length<optLength&&optArr.length>0){$(this).closest(_obj.options.contentClassName).find("dt").addClass("zr-select-checkbox-checked");$(this).closest(_obj.options.contentClassName).find("dt").find(".zr-select-checkbox-normal").find("span").addClass("zr-select-checkbox-uncheck");}else if(optArr&&optArr.length==optLength){$(this).closest(_obj.options.contentClassName).find("dt").addClass("zr-select-checkbox-checked");$(this).closest(_obj.options.contentClassName).find("dt").find(".zr-select-checkbox-normal").find("span").removeClass("zr-select-checkbox-uncheck");}else{var firstVal=$(this).closest(_obj.options.contentClassName).find("dd").eq(0).attr("zr-option-text");var html='<input type="text" placeholder="'+firstVal+'" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).addClass("zr-select-values").removeClass("zr-select-values").html(html);$(this).closest(_obj.options.contentClassName).css({"top":$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).height()+4});$(this).closest(_obj.options.contentClassName).find("dt").removeClass("zr-select-checkbox-checked");};_select.eventFn.bindVal($(this),_obj,optArr);}else{var optVal=$(this).attr("zr-option-value"),optText=$(this).text();$(this).closest(_obj.options.contentClassName).addClass(_obj.options.hideClassName);$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).find(".zricon-arrow-down").removeClass("zricon-arrow-up");$(this).closest(_obj.options.unselectClassName).find("input").val(optText);$(this).closest(_obj.options.unselectClassName).prev(_obj.selector).eq(0).val(optVal);}});$(".zr-select-content dt").off("click").on("click",function(ev){ev.stopPropagation();var optArr=[];$(this).toggleClass("zr-select-checkbox-checked");if($(this).hasClass("zr-select-checkbox-checked")){$(this).siblings("dd").addClass("zr-select-checkbox-checked");$(this).find(".zr-select-checkbox-normal").find("span").removeClass("zr-select-checkbox-uncheck");var ddArr=$(this).siblings("dd");for(var i=0,j=ddArr.length;i<j;i++){optArr.push({optVal:$(ddArr[i]).attr("zr-option-value"),optText:$(ddArr[i]).attr("zr-option-text")})};_select.eventFn.appendDom($(this),_obj,optArr);_select.eventFn.deleteOpt(_obj);}else{$(this).siblings("dd").removeClass("zr-select-checkbox-checked");var firstVal=$(this).siblings("dd").eq(0).attr("zr-option-text");var html='<input type="text" placeholder="'+firstVal+'" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).addClass("zr-select-values").removeClass("zr-select-values").html(html);$(this).closest(_obj.options.contentClassName).css({"top":$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).height()+4});};$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).find(".zricon-arrow-down").addClass("zricon-arrow-up");_select.eventFn.bindVal($(this),_obj,optArr);});},removeByValue:function(arr,val){for(var i=0;i<arr.length;i++){if(arr[i].optVal==val){arr.splice(i,1);break;}}},appendDom:function(obj,_obj,optArr){var html="";for(var i=0,j=optArr.length;i<j;i++){html+='<span>'+optArr[i].optText+'<i zr-close-text="'+optArr[i].optText+'" zr-close-val="'+optArr[i].optVal+'" class="zricon-close"></i></span>';};html=html+'<i class="zricon-arrow-down"></i>';obj.closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).addClass("zr-select-values").html(html);obj.closest(_obj.options.contentClassName).css({"top":obj.closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).height()+14});},deleteOpt:function(_obj){$(".zricon-close").off("click").on("click",function(ev){ev.stopPropagation();var closeDomArr=$(this).closest(_obj.options.titleClassName).find(".zricon-close"),closestDom=$(this).closest(_obj.options.unselectClassName);var optArr=[];for(var i=0,j=closeDomArr.length;i<j;i++){optArr.push({optVal:$(closeDomArr[i]).attr("zr-close-val"),optText:$(closeDomArr[i]).attr("zr-close-text"),});};_select.eventFn.removeByValue(optArr,$(this).attr("zr-close-val"));closestDom.find(".zr-select-checkbox[zr-option-value="+$(this).attr("zr-close-val")+"]").removeClass("zr-select-checkbox-checked");closestDom.find("dt").find(".zr-select-checkbox-normal").find("span").addClass("zr-select-checkbox-uncheck");_select.eventFn.bindVal($(this),_obj,optArr);if(optArr.length==0){closestDom.find("dt").removeClass("zr-select-checkbox-checked");var firstVal=closestDom.find("dd").eq(0).attr("zr-option-text");var html='<input type="text" placeholder="'+firstVal+'" readonly="readonly" class="zr-input"><span class="zr-input-addon"><i class="zricon-arrow-down"></i></span>';$(this).closest(_obj.options.unselectClassName).find(_obj.options.titleClassName).addClass("zr-select-values").removeClass("zr-select-values").html(html);};_select.eventFn.appendDom($(this),_obj,optArr);if(optArr.length==0){closestDom.find(_obj.options.contentClassName).css({"top":closestDom.find(_obj.options.titleClassName).height()+4});}else{closestDom.find(_obj.options.contentClassName).css({"top":closestDom.find(_obj.options.titleClassName).height()+14});}
        _select.eventFn.deleteOpt(_obj);})},bindVal:function(obj,_obj,optArr){var selectVal=[];for(var i=0,j=optArr.length;i<j;i++){selectVal.push(optArr[i].optVal);};obj.closest(_obj.options.unselectClassName).prev(_obj.selector).eq(0).val(selectVal);}},ajax:{}}
    var _upload={uid:30900000,version:"1.0.0",init:function(domObject){this.options._obj=domObject;this.events.uploadEvent(domObject);},options:{_obj:{}},events:{uploadEvent:function(opt){if(opt.array.length>0){$.each(opt.array,function(index,elem){var str="",a="<a class='zr-btn zr-btn-default'></a>",sDef="Click to upload",sDef2="Select File",label=$("<label class='zr-upload-module'></label>");if($(elem).hasClass(_upload.options._obj.options.avatarClassName)){label.addClass(_upload.options._obj.options.avatarClassName);str+="<i class='zricon-add'></i>";}else if($(elem).hasClass(_upload.options._obj.options.pictureClassName)){label.addClass(_upload.options._obj.options.pictureClassName);str+="<i class='zricon-add'></i>";}else if($(elem).hasClass(_upload.options._obj.options.dragClassName)){label.addClass(_upload.options._obj.options.dragClassName);str+="<i class='zricon-upload-empty'></i><h4>"+$(elem).attr('title')+"</h4><p>"+$(elem).attr('alt')+"</p>";}else if($(elem).hasClass(_upload.options._obj.options.manualClassName)){label=label.append(a).addClass(_upload.options._obj.options.manualClassName);str+="<i class='zricon-doc-empty'></i>";$(elem).attr("title")==undefined?str+=sDef2:str+=$(elem).attr("title");}else if($(elem).hasClass(_upload.options._obj.options.explainClassName)){var p=$('<p>'+$(elem).attr('alt')+'</p>');label=label.append(a).addClass(_upload.options._obj.options.explainClassName).append(p);str+="<i class='zricon-upload-1'></i>";$(elem).attr("title")==undefined?str+=sDef:str+=$(elem).attr("title");}else{label=label.append(a);str+="<i class='zricon-upload-1'></i>";$(elem).attr("title")==undefined?str+=sDef:str+=$(elem).attr("title");}
        $(elem).addClass(_upload.options._obj.options.hideClassName).wrap(label);$(elem).before(str);})}}},eventFn:{},ajax:{}}

     var _badge = window._badge;


    var _allModules = {
        _alert:_alert,
        _input:_input,
        _dropdown:_dropdown,
        _radio:_radio,
        _checkbox:_checkbox,
        _select:_select,
        // _timeline:_timeline,
        // _list:_list,
        _nav:_nav,
        _upload:_upload,
        _layout:_layout,
        _badge:_badge
    }
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;// FuncProto = Function.prototype;
    var
        // push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        // concat           = ArrayProto.concat,
        toString         = ObjProto.toString;
    var _ms = zr.global.baseConfig.moduleSelectors,
        _tools = zr.tools;
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/23 上午10:37
     * @Description:统一管理内置组件的公共方法
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _init(){

    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/2/2 下午9:48
     * @Description:查找模块名称
     */
    function _autoFindMoudle(selectorName){
        var _m = "";
        $.each(_ms,function(i,n){
            if(n.selectorName == selectorName){
                _m = n.moduleName;
                return false;
            }
        })
        return _m;
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/2/1 下午5:08
     * @Description:自动初始化各个模块
     * @params <Number> type
     * @paramsDescription  初始化哪种标记类型: 1,默认，表示返回未标示（选择后将被标示）,2表示返回已标示的，3表示返回所有类别:
     * @params return <Array>
     * @paramsDescription  返回已选的数组与对应的模块名称
     */
    function _init_auto(type){
        type = type ? type : 1;
        var _q = [],
            _retSelector = [],
            _selector = "",
            _options = "",
            _module = "";
        //
        $.each(_ms,function(i,n){
            _selector = n.selectorName;
            _options = n.options;
            _module = n.moduleName;
            _retSelector = _find(_selector,type);
            _q = [];
            if(_retSelector.length > 0){
                _retSelector = slice.call(_retSelector)
                _q = {
                    selector:_selector,
                    module:_module,
                    options:_options,
                    array:_retSelector
                }
                //
                //
                // _allModules[_module].init(_retSelector);
                _allModules[_module].init(_q);
            }
        })
        //
        return _q;
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/2/3 下午8:02
     * @Description:自动监听页面变化
     */
    function _init_observer(){
        $(function(){
            $(document).on("DOMNodeInserted",function () {
                _tools.later(function(){
                    _init_auto()
                },0)
            })
            $(document).on("DOMNodeRemoved",function () {
                _tools.later(function(){
                    _init_auto()
                },0)
            })
        })
    }



    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/23 上午10:41
     * @Description:查找所需的节点
     * @params <String> selectors
     * @paramsDescription  选择器
     * @params <Number> type
     * @paramsDescription  返回的类型:1,默认，表示返回未标示（选择后将被标示）,2表示返回已标示的，3表示返回所有类别
     */
    function _find(selector,type){
        var _s = $(selector),
            _cacheName = "zralready_1001",
            _r1 = [],
            _r2 = [],
            _r3 = [];
        type = type ? type : 1;
        if(_s.length > 0){
            // _s.data(_cacheName,_cacheName);
            $.each(_s,function(i,n){
                //如果是代码code则排除
                if($(this).closest(".c-code-inner").length > 0){
                    return;
                }
                if($(this).data(_cacheName)){
                    _r2.push(this);
                }else{
                    _r1.push(this);
                    $(this).data(_cacheName,_cacheName);
                }
                _r3.push(this);
            })
            if(type == 2){
                return _r2;
            }else if(type == 1){
                return _r1;
            }else{
                return _r3;
            }
        }
        return [];
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/30 下午9:45
     * @Description:ajax提交方法
     * @params <Object> options
     * @paramsDescription  jquery的配置入参 :
     */
    function _ajax(options){
        var defaults = {

        }
        options = $.extend(defaults,options);
        $.ajax(options);
    }


    // //手动触发一次
    $(function(){
        //页面初始化主动触发一次加载内置元素
        _init_auto();
    })
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/2/21 下午9:37
     * @Description:添加滚动事件
     */
    $(window).off("scroll").on("scroll",function(){
        var top = $(this).scrollTop();
        $.each(zr.dom.scrollQueen,function(i,n){
            n(top);
        })
    })
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/2/21 下午9:40
     * @Description:添加点击事件
     */
    $(window).off("click").on("click",function(){
        $.each(zr.dom.clickQueen,function(i,n){
            n();
        })
    })

    return zr;
},{requires:["jquery","./css/zr.min.css"]})
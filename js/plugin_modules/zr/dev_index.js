(function(){
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/1/28 下午9:00
     * @Description:默认模块配置
     */
    var config = {
        "jquery":{
            "path":"./jquery/cdn_index",
            "dependencies":{}
        },
        "jquery3":{
            "path":"./jquery.3/cdn_index",
            "dependencies":{}
        },
        "zepto":{
            "path":"./zepto/cdn_index",
            "dependencies":{}
        },
        "mobiscroll":{
            "path":"./mobiscroll/cdn_index"
        },
        "perfectscrollbar":{
            "path":"./perfectscrollbar/cdn_index"
        },
        "swiper":{
            "path":"./swiper/cdn_index"
        },
        "gmap":{
            "path":"./gmap/cdn_index"
        },
        "echarts":{
            "path":"./echarts/cdn_index"
        },
        "echartsSimple":{
            "path":"./echarts/cdn_echarts-simple"
        },
        "echartsNormal":{
            "path":"./echarts/cdn_echarts-normal"
        },
        "toast":{
            "path":"./toast/cdn_index"
        },
        "animate":{
            "path":"./animate/cdn_index"
        },
        "compress":{
            "path":"./compress/cdn_index"
        },
        "dragFloat":{
            "path":"./dragFloat/cdn_index"
        },
        "message":{
            "path":"./message/cdn_index"
        },
        "tab":{
            "path":"./zrModules/cdn_tab"
        },
        "tmpl":{
            "path":"./tmpl/cdn_index"
        },
        "lazyload":{
            "path":"./zrModules/cdn_lazyload"
        },
        "datatables":{
            "path":"./datatables/cdn_index"
        },
        "page":{
            "path":"./zrModules/cdn_page"
        },
        "modal":{
            "path":"./modal/cdn_index"
        },
        "jstree":{
            "path":"./jstree/cdn_index"
        },
        "ztree":{
            "path":"./ztree/cdn_index"
        },
        "mock":{
            "path":"./mock/cdn_index"
        },
        "datePicker":{
            "path":"./datePicker/cdn_index"
        },
        "notification":{
            "path":"./notification/cdn_index"
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
            prefix:prefix,
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
            prefix:prefix,
            options:{
                closeSelector:"."+prefix+"-alert-close",//关闭的样式名称
                isRemove:true,//关闭后，是否是移除，默认是移除,否则是隐藏
            }
        },
        {
            selectorName:"."+prefix+"-input",
            moduleName:"_input",
            prefix:prefix,
            options:{
                clearSelector:"."+prefix+"-input-clear",
                clearClassName:prefix+"-input-clear",
                groupSelector:"."+prefix+"-input-group",
                groupClassName: prefix + '-input-group', // 多个组件外层盒子
                iconCloseCircle: prefix + 'icon-close-circle', // 关闭图标
                wapperClassName: prefix + '-input-wapper', // 组合时外包盒子
            }
        },
        {
            selectorName:"."+prefix+"-textarea",
            moduleName:"_input",
            prefix:prefix,
            options:{
                txtNumSelector:"."+prefix+"-input-num",
                groupSelector:"."+prefix+"-input-group",
                groupClassName: prefix + '-input-group', // 多个组件外层盒子
                textareaClassName: "." + prefix + '-textarea', // 区分input和textarea
                txtNumClassName: prefix + '-input-num', // textarea输入字数显示
            }
        },
        {
            selectorName:"."+prefix+"-radio",
            moduleName:"_radio",
            prefix:prefix,
            options:{
                radioedClassName:prefix+"-radio-radioed",//选中的radio
                disabledClassName:prefix+"-radio-disable",//禁用的radio
                verticalClassName:prefix+"-radio-vertical"//垂直排列的radio
            }
        },
        {
            selectorName:"."+prefix+"-checkbox",
            moduleName:"_checkbox",
            prefix:prefix,
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
            prefix:prefix,
            options: {
                hideClassName: prefix + "-select-hide",//隐藏
                disableClassName: prefix + "-select-disable",//禁用样式
                smClassName: prefix + "-select-sm",//sm
                lgClassName: prefix + "-select-lg",//lg
                menuClassName: prefix + '-select-menu', // 下拉框列表
                receptionClassName: prefix + "-select-reception",//显示选择项内容
                simulationClassName: prefix + "-simulation",  // 模拟出的最外层盒子
                arrowUpClassName: prefix + "icon-arrow-up",    // 箭头向上的图标
                arrowDownClassName: prefix + "icon-arrow-down",    // 箭头向下的图标
                iconClose: prefix + "icon-close",   // 关闭图标
                selectValues: prefix + "-select-values", // 当模拟框有选中值时带的class
                multipleClassName: prefix + '-select-multiple', // 多选样式
                checkboxChecked: prefix + '-select-checkbox-checked', // 是否选中
                checkboxUncheck: prefix + '-select-checkbox-uncheck',    // 部分选中
                checkboxNormal: prefix + '-select-checkbox-normal',     // checkbox盒子样式
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
            prefix:prefix,
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
            prefix:prefix,
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
            prefix:prefix,
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
            selectorName:"."+prefix+"-tooltip",
            moduleName:"_tip",
            prefix:prefix,
            options:{
            }
        },
        {
            selectorName:"."+prefix+"-top",
            moduleName:"_top",
            prefix:prefix,
            options:{
            }
        },
        {
            selectorName:"."+prefix+"-badge",
            moduleName:"_badge",
            prefix:prefix,
            options:{
                normalClassName:"."+prefix+"-badge-normal"
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


Zr.add("./zr/dev_index",function(zr,$){
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
        //模版对象
        tmpl:tmpl,
        //滚动队列
        scrollQueen:[],
        //点击队列
        clickQueen:[],
        //resize队列
        resizeQueen:[]
    }
    //

    var _allModules = {
        _alert:window._alert || {init:function(){}},
        _input:window._input || {init:function(){}},
        _dropdown:window._dropdown || {init:function(){}},
        _radio:window._radio || {init:function(){}},
        _checkbox:window._checkbox || {init:function(){}},
        _select:window._select || {init:function(){}},
        // _timeline:_timeline,
        // _list:_list,
        _nav:window._nav || {init:function(){}},
        _upload:window._upload || {init:function(){}},
        _layout:window._layout || {init:function(){}},
        _tip:window._tip || {init:function(){}},
        _top:window._top || {init:function(){}},
        _badge:window._badge || {init:function(){}}
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
            _prefix = "",
            _module = "";
        //
        $.each(_ms,function(i,n){
            _selector = n.selectorName;
            _options = n.options;
            _module = n.moduleName;
            _prefix = n.prefix;
            _retSelector = _find(_selector,type);
            _q = [];
            if(_retSelector.length > 0){
                _retSelector = slice.call(_retSelector)
                _q = {
                    selector:_selector,
                    module:_module,
                    prefix:_prefix,
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

    /**
    * @Author: zhangjinglin
    * @Email: zhangjinglin@jd.com
    * @Date: Created in 2018/4/7 下午7:43
    * @Description:模版替换
    * @params html <Dom Object> html elements
    * @paramsDescription  html片段，这里面是已经装载好的tmpl模版语言
    * @params html <Data Object> 数据对象
    * @paramsDescription  用于替换模版内容的数据对象，可以是任意类型
    */
    function tmpl(str, data) {
        var f = !/[^\w\-.:]/.test(str)
            ? (tmpl.cache[str] = tmpl.cache[str] || tmpl(str))
            : new Function( // eslint-disable-line no-new-func
                tmpl.arg + ',tmpl',
                'var _e=tmpl.encode' +
                tmpl.helper +
                ",_s='" +
                str.replace(tmpl.regexp, tmpl.func) +
                "';return _s;"
            )
        return data
            ? f(data, tmpl)
            : function (data) {
                return f(data, tmpl)
            }
    }
    tmpl.cache = {}
    tmpl.load = function (id) {
        return document.getElementById(id).innerHTML
    }
    tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g
    tmpl.func = function (s, p1, p2, p3, p4, p5) {
        if (p1) {
            // whitespace, quote and backspace in HTML context
            return (
                {
                    '\n': '\\n',
                    '\r': '\\r',
                    '\t': '\\t',
                    ' ': ' '
                }[p1] || '\\' + p1
            )
        }
        if (p2) {
            // interpolation: {%=prop%}, or unescaped: {%#prop%}
            if (p2 === '=') {
                return "'+_e(" + p3 + ")+'"
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'"
        }
        if (p4) {
            // evaluation start tag: {%
            return "';"
        }
        if (p5) {
            // evaluation end tag: %}
            return "_s+='"
        }
    }
    tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
    tmpl.encMap = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
    }
    tmpl.encode = function (s) {
        return (s == null ? '' : '' + s).replace(tmpl.encReg, function (c) {
            return tmpl.encMap[c] || ''
        })
    }
    tmpl.arg = 'o'
    tmpl.helper =
        ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
        ',include=function(s,d){_s+=tmpl(s,d);}'

    // //手动触发一次
    $(function(){
        //页面初始化主动触发一次加载内置元素
        _init_auto();
        _init_observer();
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
    * @Date: Created in 2018/4/11 下午2:59
    * @Description:尺寸改变事件
    */
    $(window).off("resize").on("resize",function(){
        var width = $(this).width();
        $.each(zr.dom.resizeQueen,function(i,n){
            n(width);
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
},{requires:["jquery"]})
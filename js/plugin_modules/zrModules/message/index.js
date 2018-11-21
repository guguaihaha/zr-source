Zr.add("./zrModules/message/",function(zr,$){
    //todo something
    var tools = zr.tools,
        dom = zr.dom;
    var defaults = {
        //毫秒
        time:3000,
        //内容
        content:"",
        //替换已有的图标样式
        iconsClassName:"",
        //是否显示icons,默认是显示
        iconsShowStatus:1
    }

    function init(rets){

    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/12 下午9:14
     * @Description:参数分析
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _args(){
        var _s,_o;
        $.each(this,function(i,n){
            if(tools.isString(n)){
                _s = n;
            }
            if(tools.isObject(n)){
                _o = n;
            }
        })
        if(_s || _o){
            _o = _o ? _o : {};
            _s ? _o = $.extend({},defaults,_o,{content:_s}) : "";
        }else{
            throw("参数不能为空,请检查message模块的方法！");
        }
        return _o;
    }

    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/12 下午9:33
     * @Description:代码加工
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _rebuildHTML(status,o){
        var _o = {
            info:"zricon-info",
            success:"zricon-ok-circle",
            warning:"zricon-warning",
            error:"zricon-close-circle",
            loading:"zricon-spin2 animate-spin"
        }
        var _class = {
            info:"zr-message-info",
            success:"zr-message-success",
            warning:"zr-message-warning",
            error:"zr-message-error",
            loading:"zr-message-info"
        }
        var $message = $(".zr-message");
        if($message.length == 0) {
            var html = "<div class=\"zr-message\" style=\"display: block\">";
            html += "</div>";
            $(html).appendTo("body");
        }
        var html = "<div class=\"zr-message-notice\">";
        html += "<div class=\"zr-message-custom "+_class[status]+"\">";
        if(o.iconsShowStatus){
            var icons = o.iconsClassName ? o.iconsClassName : _o[status];
            html += "<i class=\""+icons+"\"></i>";
        }
        html += o.content;
        html += "</div></div>";
        var $dom = $(html).prependTo(".zr-message");
        tools.later(function(){
            $dom.remove();
        },o.time);
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/10 下午10:13
     * @Description:配置信息
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _config(options){
        defaults = $.extend(defaults,options);
    }
    //
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/10 下午10:13
     * @Description:信息警告
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _info(){
        var args = _args.call(arguments);
        _rebuildHTML("info",args);
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/10 下午10:13
     * @Description:信息成功提示
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _success(){
        var args = _args.call(arguments);
        _rebuildHTML("success",args);
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/10 下午10:14
     * @Description: 信息提示
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _warning(){
        var args = _args.call(arguments);
        _rebuildHTML("warning",args);
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/10 下午10:14
     * @Description:信息报错
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _error(){
        var args = _args.call(arguments);
        _rebuildHTML("error",args);
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/3/12 下午9:18
     * @Description:加载中
     * @params <String> paramName
     * @paramsDescription  paramName :
     */
    function _loading(){
        _loadingHide();
        var args = _args.call(arguments);
        var html = "<div id=\"zr-loading-id\" class=\"zr-message-notice\" style='position: fixed;top:40%;z-index: 20000'>"
        html += "<div class=\"zr-message-custom zr-message-info\">";
        if(args.iconsShowStatus){
            var icons = args.iconsClassName ? args.iconsClassName : "zricon-spin2 animate-spin";
            html += "<i class=\""+icons+"\"></i>";
        }
        html += args.content;
        html += "</div></div>";
        var $dom = $(html).appendTo("body")
        //
        var width = parseFloat($dom.width())/2 + "px";
        $dom.css("left","calc(50% - "+width+")")

    }
    function _loadingHide(){
        $("#zr-loading-id").remove();
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/4/9 下午8:39
     * @Description:信息提示的组装方法
     */
    function _rebuildInfoHTML(config){
        var html = "<div id='zr-message-modal' class=\"zr-modal fade zr-modal-enter\">";
        html += "<div class=\"zr-modal-dialog\">";
        html += "<div class=\"zr-modal-content\"> <div class=\"zr-modal-header\">";
        html += "<p class=\"zr-modal-title\">";
        html += "<span>"+config.title+"</span>";
        html += "<i class=\"zricon-close zr-modal-close\"></i></p></div>";
        html += "<div class=\"zr-modal-body\" style='text-align: center'>";
        // html += "<i class=\"zricon-info zr-modal-warning\"></i>";
        html += config.content;
        html += "</div> <div class=\"zr-modal-footer\">";
        if(config.status == "confirm"){
            html += "<button class=\"zr-btn zr-btn-default zr-modal-btn zr-modal-cancel\">"+config.closeText+"</button>";
            html += "<button class=\"zr-btn zr-btn-primary zr-modal-btn zr-modal-enter\">"+config.okText+"</button>";
        }else{
            html += "<button class=\"zr-btn zr-btn-primary zr-modal-btn zr-modal-cancel\">"+config.okText+"</button>";
        }
        html += "</div></div></div></div>";
        $("#zr-message-modal").remove();
        $(html).appendTo("body").addClass("zr-message-show").data("config",config);
        tools.later(function(){
            _reloadEvent();
        },0)
        return html;
    }

    function _reloadEvent(){
        var $dom = $("#zr-message-modal"),
            options = $dom.data("config");
        $dom.find(".zr-modal-cancel").off("click").on("click",function(){
            $dom.removeClass("zr-message-show");
            options.onClose.call($dom);
        })
        $dom.find(".zr-modal-close").off("click").on("click",function(){
            $dom.removeClass("zr-message-show");
            options.onClose.call($dom);
        })
        $dom.find(".zr-modal-enter").off("click").on("click",function(){
            $dom.removeClass("zr-message-show");
            options.onConfirm.call($dom);
            options.onClose.call($dom);
        })

    }

    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/4/9 下午8:33
     * @Description:信息警告提示框
     * @params <String> content
     * @paramsDescription  信息内容提示 :
     * @params <Object> options
     * @paramsDescription  配置信息 :
     */
    function _alert(content,options){
        var options = options || {};
        var defaults = {
            title:options.title || "",
            content:content || "",
            status:"alert",
            okText:"ok",
            onClose : function(){},
            onConfirm : function(){}
        }

        options = $.extend(defaults,options);
        _rebuildInfoHTML(options)
    }
    /**
     * @Author: zhangjinglin
     * @Email: zhangjinglin@jd.com
     * @Date: Created in 2018/4/9 下午8:33
     * @Description:信息确认提示框
     * @params <String> content
     * @paramsDescription  信息内容提示
     * @params <Object> options
     * @paramsDescription  配置信息 :
     */
    function _confirm(content,options){
        var options = options || {};
        var defaults = {
            title:options.title || "",
            content:content || "",
            status:"confirm",
            okText:"ok111",
            closeText:"cancel",
            onClose : function(){},
            onConfirm : function(){}
        }

        options = $.extend(defaults,options);
        _rebuildInfoHTML(options)
    }

    return {
        init:init,
        config:_config,
        info:_info,
        success:_success,
        warning:_warning,
        error:_error,
        loadingShow:_loading,
        loadingHide:_loadingHide,
        alert:_alert,
        confirm:_confirm
    }
},{requires:["jquery","/zrModules/message/css/index.css","/zrModules/modal/css/index.css"]})
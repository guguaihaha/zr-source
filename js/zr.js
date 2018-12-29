(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Zr = factory());
}(this, (function () { 'use strict';

    /**
     * Created by zhangjinglin on 16/9/2.
     */
        //
        var _Zr = {
            //全局函数
            global:{
                //加载模块挂载对象数组,一经使用立刻加载到MODULEArray中
                /*param
                * {
                *   moduleName:"",//模块被使用的名称
                *   total:"",//模块加载的总次数
                *   moduleCaller:[//模块引用的统计
                *     {
                *       moduleName:"",//当前模块引用名称
                *       total:"",//当前模块引用次数
                *     }
                *   ]
                * }
                * */
                MODULEArray:{},
                MODULES:{//当前所有模块名称列表

                },
                config:{

                }
            },
            log:function(msg){
                // console.log(msg);
            },
            error:function(msg){
                throw msg;
            },
            //状态
            Loader:{
                Status:{
                    /** error */
                    'ERROR': -1,
                    /** init */
                    'INIT': 0,
                    /** loading */
                    'LOADING': 1,
                    /** loaded */
                    'LOADED': 2,
                    /**dependencies are loaded or attached*/
                    'READY_TO_ATTACH': 3,
                    /** attaching */
                    'ATTACHING': 4,
                    /** attached */
                    'ATTACHED': 5
                }
            },
            //基本配置
            config:{
                base:""
            }
        };
        if(!window.__ZrGlobalStatus){
            window.Zr = _Zr;
        }

    /**
     * Created by zhangjinglin on 16/9/2.
     * *underscore1.7 and modify some methods
     */
       var $ = {};
       //
       //  var reg_html = /^\s*<(\w+|!)[^>]*>/,
       //      reg_selector = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/;
        //
        //
        var ArrayProto = Array.prototype, ObjProto = Object.prototype;// FuncProto = Function.prototype;
        //
        var
            // push             = ArrayProto.push,
            slice            = ArrayProto.slice,
            // concat           = ArrayProto.concat,
            toString         = ObjProto.toString;
            // hasOwnProperty   = ObjProto.hasOwnProperty;
        //
        var
            // nativeIsArray      = Array.isArray,
            nativeKeys         = Object.keys;
            // nativeBind         = FuncProto.bind,
            // nativeCreate       = Object.create;
        //
        // [root, dir, basename, ext]
        var splitPath = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/,
            RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g;
        //ready Dom
        //
        $.isArray = function(obj){
            return toString.call(obj) === "[object Array]";
        };
        $.isObject = function(obj){
            return toString.call(obj) === "[object Object]";
        };
        $.isPlainObject = function(obj){
              //确保不是dom节点与window对象
            if(!obj || !$.isObject(obj) || obj.nodeType || obj.window ==obj){
                return false;
            }
            //hasOwnProperty(不检测原型链),isPrototypeOf(对象原型中是否存在对象),constructor(创建此对象的数组函数的引用),instanceof(测试对象是否为标杆对象的实例)
            try{
                if(!ObjProto.hasOwnProperty.call(obj,"constructor") && !ObjProto.hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){
                    return false;
                }
            } catch(e){
                return false;
            }
            //
            for(var key in obj){}
            return ((key===undefined) || ObjProto.hasOwnProperty.call(obj,key));
        };
        $.isFunction = function(obj){
            return toString.call(obj) === "[object Function]";
        };
        $.isString = function(obj){
            return typeof obj === "string";
        };
        $.isRegExp = function(obj){
            return toString.call(obj) === "[object RegExp]";
        };
        $.isNumber = function(obj){
            return toString.call(obj) === "[object Number]";
        };
        $.isUndefined = function(obj){
            $.each(obj,function(i,n){
                if(i !== undefined){
                    return false;
                }
            });
            return true;
        };
        $.isNull = function(obj){
            if(null === obj){
                return true;
            }
        };
        $.isBoolean = function(obj){
            return toString.call(obj) === "[object Boolean]";
        };
        $.isDate = function(obj){
            return toString.call(obj) === "[object Date]";
        };
        $.isEmptyObject = function(obj){
            var isTrue = true;
            $.each(obj,function(){
                isTrue = false;
                return true;
            });
            return isTrue;
        };
        //
        $.each = function(obj,callback){
            obj = obj || [];
          if($.isArray(obj)){
              obj.forEach(function(currentValue,index,array){
                  callback.call(this,index,currentValue);
              });
              return;
          }
          var length = obj.length || 0;

          if(length > 0){
             for(var i = 0;i < obj.length; i++){
                callback.call(this,i,obj[i]);
             }
             return;
          }
            //
          for(var o in obj){
              if(obj.hasOwnProperty(o)){
                  callback.call(this,o,obj[o]);
              }
          }
        };
        //
        $.keys = function(obj){
            if(!$.isObject(obj)) return [];
            if(nativeKeys) return nativeKeys(obj);
            var keys = [];
            $.each(obj,function(i,n){
                keys.push(i);
            });
            return keys;
        };
        //
        $.values = function(obj){
            if(!$.isObject(obj)) return [];
            var array = [];
            $.each(obj,function(i,n){
                array.push(n);
            });
            return array;
        };
        //
        $.makeArray = function(obj){
            if(!obj) return [];
            if($.isArray(obj))return slice.call(obj);
            var array = [];
            if($.isObject(obj) && obj.length>=0){
                $.each(obj,function(i,n){
                    array.push(n);
                });
                return array;
            }
            $.each(obj,function(i,n){
                array.push({i:n});
            });
            return array;
            //
        };
        //
        $.grep = function(obj,callback,invert){

        };
        //
        $.map = function(obj,callback){

        };
        //
        $.indexArray = function(value,obj,fromIndex){

        };
        //
        $.merge = function(first,second){

        };
        //
        $.uniqueSort = function(array){

        };
        //
        $.trim = function(obj){
             return obj == null ? "" : (obj + "").replace(RE_TRIM,"");
        };
        //
        $.param = function(obj,traditional){

        };
        //
        $.size = function(obj){
            if(!obj) return 0;
            return obj.length >= 0 ? obj.length : $.keys(obj).length;
        };
        //
        $.stringArray = function(obj){
            if(!obj)return [];
            var splitAlt = ",";
            var args = arguments;
            if(args[1])splitAlt = args[1];
            if($.isString(obj))return obj.split(splitAlt);
            return [];
        };
        //
        $.extend = function(){
            var args = arguments;
            var deeps = false;
            var parent = args[0] || {},
                child = args[1] || {},
                i = 0,
                l = args.length;
            if($.isBoolean(args[0])){
                deeps = args[0];
                parent = args[1];
                child = args[2] || {};
                i = 3;
            }else{
                i = 2;
            }
            //
            //
            $.each(child,function(i,n){
                var copy = n;
                if(parent == copy)return;
                if(copy && $.isObject(copy) && deeps){
                    parent[i] = $.extend(deeps,parent[i] || {},copy);
                }else if(copy && $.isArray(copy) && deeps){
                    parent[i] = $.extend(deeps,parent[i] || [],copy);
                }else{
                    parent[i] = copy;
                }
            });
            //
            if(l > i){
                for(var m = i; m < l; m++){
                    parent = $.extend(deeps,parent,args[m]);
                }
            }
            //
            return parent;
        };
        //
        $.inherit = function(){
            var args = slice.call(arguments),
                starts = {},
                deep = "";
            if($.isBoolean(args[0])) {
                deep = args[0];
                args.splice(0,1);
            }
            $.each(args,function(i,n){
                (function (status,ret) {
                    if(status){
                        starts = $.fextend(deep,starts,ret);
                    }else{
                        starts = $.fextend(starts,ret);
                    }
                })(deep,n);
            });
            return starts;

        };
        //
        $.extname = function(path){
            var fileName = (path.match(splitPath) || [])[4] || "";
            return fileName.toLowerCase();
        };
        //
        $.later = function(fn,time,which){
            time = time || 0;
            var r = (which) ? setInterval(fn, time) : setTimeout(fn, time);
            return {
                id:r,
                interval:which,
                cancel:function(){
                    if(this.interval){
                        clearInterval(this.id);
                    }else{
                        clearTimeout(this.id);
                    }
                }
            }


        };
        //
        $.cookie = function(key,value,time){
            if(typeof(value)=="undefined"&&typeof(key)!="undefined"&&typeof(value)!="boolean"){
                var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
                // console.log(document.cookie);
                if(arr != null) return (unescape(arr[2])); return null;
            }else if(typeof(key)=="string"&&typeof(value)=="string"){
                //默认30天
                if(typeof(time)=="undefined"||typeof(time)!="number") time=30;
                var exp = new Date();
                exp.setTime(exp.getTime() + time*24*60*60*1000);
                document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
            }else if(typeof(value)=="boolean"){
                if(value===true){
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
                    if(arr[2]!=null) document.cookie= key + "="+arr[2]+";expires="+exp.toGMTString()+";path=/";
                }
            }
        };
        //第三个参数是否使用临时会话默认不使用
        $.storage = function(key,value){
            if(typeof(value) == "object"){
                value = JSON.stringify(value);
            }
            var arg = arguments[2],
                local = arg?sessionStorage:localStorage;
            if(key&&!value){
                //读取相关信息
                return local.getItem(key);
            }else if(key&&value&&typeof(value)!="boolean"){
                //存储信息
                local.setItem(key,value);
            }else if(key&&value&&typeof(value)=="boolean"){
                local.removeItem(key);
            }
            if(arguments[3] === true){
                local.clear();
            }
        };

        $.browser = {
            versions:function(){
                var u = navigator.userAgent;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    isSupportTouch : "ontouchend" in document ? true : false,//是否支持touch
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
        //
        //
        $.endWidth = function(str,suffix){
            var l = str.length - suffix.length;
            return l >= 0 && str.indexOf(suffix,l) === l;
        };
        //
        $.bind = function(r,fn,obj){
                function o(){}            var args = slice.call(arguments,3),
                    newFn = function(){
                           var inArgs = slice.call(arguments);
                           return fn.apply(this instanceof o ? this : obj || this,r ? inArgs.concat(args):args.concat(inArgs))
                    };
                o.prototype = fn.prototype;
                newFn.prototype = new o();
                return newFn;
        };
        //
        $.format = function(fmt,time){
            var date = new Date(time);
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
        };
        /**
         * 数字分割方法 e.g:"1000023 => 1,000,023"
         * @param {number} [number] 一个整数字
         * @param {split} [number] 以几位进行分割，默认是3
         * @param {qt} [string] 以什么字符进行分割
         * */
        $.splitNumber = function(number,split,qt){
            var split = split || 3,
                number = number + "",
                qt = qt || ",";
            number = number.split("");
            number = number.reverse();
            var ret = [];
            $.each(number,function(i,n){
                if(i != 0 && i % split == 0){
                    ret.push(qt);
                    ret.push(n);
                }else{
                    ret.push(n);
                }
            });
            ret = ret.reverse();
            ret = ret.join("");
            return ret;
        };
        //
        $.splitMoney = function(q){
            var r = parseInt(q)+"";
            if(r.length > 3){
                q = q / 100;
                q = Math.round(q);
                q = q /100;
                q = q + "万";
            }
            return q;
        };
        //
        $.transUrl = function(search){
            var ser = search.replace("?",""),
                o = ser.split("&"),
                p,
                rets = {};
            $.each(o,function(i,n){
                p = n.split("=");
                rets[p[0]] = p[1];
            });

            return rets;
        };
        $.reduce = function(){
        };
        //randomFlag为true，将取到取件位数
        $.getWords = function(randomFlag, min, max){
            var str = "",
            pos = 0,
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            // 随机产生
            if(randomFlag){
                range = Math.round(Math.random() * (max-min)) + min;
            }
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;

        };

    var Utils = {};

        function pluginAlias(runtime, name){
            //var index = name.indexOf("!");
            //if(index > -1){
            //   var pluginName = name.substring(0, index);
            //   name = name.substring(index+1);
            //}

            return name;
        }

        /**
         *名称改装以 / 结尾自动添加 index
         *
         * */
        function addIndexAndRemoveJsExt(modName){
              if($.isString(modName)){
                  return addIndexAndRemoveJsExtFromName(modName);
              }else{
                  return "";
              }
        }

        function addIndexAndRemoveJsExtFromName(modName){
             // 'x/' 'x/y/z/'
            if(modName.charAt(modName.length - 1) === "/") {
                modName += "index";
            }
            //以"/ or \"开头替换为"./"
            modName = modName.replace(/^[\/|\\]/g,"./");
            //
            if($.endWidth(modName,".js")){
                modName = modName.slice(0,-3);
            }
            return modName;
        }


        Utils = $.extend(Utils,{
            //filter path name
            extRouteName:function(name){
                // 'x/' 'x/y/z'
                if(name.charAt(name.length - 1) === "/"){
                    name += "index";
                }
                if($.endWidth(name, ".js")){
                    name = name.slice(0,-3);
                }
                return name;
            },
            //update config information
            addQueenRequire:function(config,factory){
                //if(factory.length > 1 && typeof factory === "function" && !config){
                //
                //}
                if(config && config.requires && !config.cjs){
                    config.cjs = 0;
                }
                return config;
           },
            /**
             * register Module to Zr,But not use and load right now
             * @param {String} [name]  this is Module's name
             * @param {function/String/Array} [factory]
             * @param {Object} [cfg] module config
             * @param {Object} [runtime] this if Global Object ,as Zr;
             * @return {null}
             * */
            registerModule:function(name,factory,cfg,runtime){
                name = this.extRouteName(name);
                //
                var mods = runtime.global.MODULES,
                    module = mods[name] || {};
                var loader = runtime.Loader;
                if(module && module.factory !== undefined){
                    runtime.log("The name of '"+name + "' is defined more than once");
                    return;
                }
                //
                //
                mods[name] = $.extend(module,{
                    name:name,
                    status:loader.Status.LOADED,
                    factory:factory
                },cfg);
            },

            /**
             * Get modules
             * @param {Object} [runtime] this if Global Object ,as Zr;
             * @param {String[]} modNames module names
             * @return {Array} modules exports
             * */
            getModules:function(runtime,modNames){
                //初始化清空
                runtime.alias = {};
                //
                 var module,
                     modFactory,
                     modExports,
                     modAlias,
                     mods = [runtime],
                    //  child_mods = [],
                     alias = {},
                     _c,
                     runtimeMods = runtime.global.MODULES;

                // var child_module;
                $.each(modNames,function(index,modName){
                    // child_mods = [];
                    module = runtimeMods[modName];
                    modName = module["name"] || modName;
                    modFactory = module["factory"];
                    modExports = module["exports"];
                    modAlias = module["alias"] || "";
                    // modRequires = module["requires"] || [];
                    //迭代依赖关系并建立回显内容
                    // $.each(modRequires,function(ind,mod){
                    //     child_module = runtimeMods[mod];
                    //     //
                    //     child_mods.push(child_module.exports);
                    // })
                    //
                    
                    
                    //
                    if(!modName || $.extname(modName) !== ".css"){
                        try {
                            _c = modExports ? modExports : modFactory();
                            mods.push(_c);
                            //注册alias关系
                            if(modAlias){
                                alias[modAlias] = _c;
                                // Utils.registerAliasExports(runtime,modAlias,modName);
                            }
                        } catch(err) {
                            console.log(err);
                            throw "请检查您的"+modName+"模块名称异常！";
                        }

                    }else{
                        mods.push(undefined);
                    }
                });
                //是否启用别名系统
                if(mods.length > 1){
                    $.each(mods,function(i,n){
                        if(i == 1){
                            runtime.alias = alias;
                        }
                        return false;
                    });
                }
                  
                return mods;
            },
            //注册依赖路径
            registerAliasExports:function(runtime,name,path){
                var module = runtime.global.baseConfig.module;
                if(!module[name]){
                    module[name] = {path:path};
                }

            },
            /**
             *
             * */
            normalDepModuleName:function(modName, depName){

            },

            /**
             * normalize module names with alias
             * @param {Object} [runtime] this if Global Object ,as Zr;
             * @param {String[]} modNames module names
             * @param [refModName] module to be referred if module name path is relative
             * @return {String[]} normalize module names with alias
             */
            normalizeModNamesWidthAlias:function(runtime, modNames, refModName){
                var ret = [];
                if(modNames){
                    $.each(modNames,function(index,modName){
                        if(modName){
                            ret.push(pluginAlias(runtime, addIndexAndRemoveJsExt(modName)));
                        }
                    });
                }
                //相对路径转化绝对路径
                if(refModName){
                    ret = Utils.normalDepModuleName(refModName,ret);
                }
                return ret;
            },
            /**
             * ./a/ => ./a/index || ./a/b.js => ./a/b
             * @param {String[]} modNames module names
             * @return {String[]} normalize module names with alias
             */
            extModnames:function(modNames){
                var ret = [];
                if(modNames && $.isArray(modNames)){
                    $.each(modNames,function(index,modName){
                        if(modName){
                            ret.push(addIndexAndRemoveJsExt(modName));
                        }
                    });
                }
                if(modNames && $.isString(modNames)){
                    ret = addIndexAndRemoveJsExt(modNames);
                }
                return ret;
            },
            /**
             * check import modules
             * 0 不用等待直接加载，1等待检查后再加载
             * */
            checkIsLoadingStatus:function(modNames,runtime){
                 var ret = 0,end = 0;
                 // runtime.global.MODULES
                 $.each(modNames,function(i,n){
                     var r = runtime.global.MODULES[n] || 0;
                     ret = (ret || r);
                 });
                if(!ret){
                     return 0;
                }
                //
                $.each(modNames,function(i,n){
                    var r = runtime.global.MODULES[n] || 0;
                    if(r){
                        end = (end || r.factory ? 0 : 1);
                    }
                });
                return end;
            },
            /**
             *
             *
             * */
            reloadModule:function(runtime,moduleName,cfg){
                var loader = runtime.Loader,
                    _module = this;
                if(!(_module instanceof Utils.reloadModule)){
                    return new Utils.reloadModule(runtime,moduleName,cfg);
                }
                //update current module status
                _module.status = loader.Status.INIT;
                //
                _module.name = undefined;
                _module.factory = undefined;
                //
                _module.cjs = 1;
                //
                _module = $.extend(_module,cfg);
                //
                _module.waitedCallbacks = [];
            },
            /**
             * create single module information
             * @param runtime is Module Object, as Zr
             * @param {String} modeName to be craeted module name
             * @param {Object} [cfg] module config
             * @return {Zr.Module}
             *
             * */
            createModuleInfo:function(runtime,modName,cfg){
                modName = this.extRouteName(modName);
                var mods = runtime.global.MODULES,
                    module = mods[modName];
                //检查是否已经配置到Zr模块上
                if(module){
                    return module;
                }
                //
                cfg = cfg || {};
                //如果没有,则需要重新登记模块到Zr
                 mods[modName] = module = this.reloadModule(runtime,modName,cfg);
                return module;
            },
            /**
             * check modules is exist
             * @param {Array} [modules]
             * @param {Object} [runtime] this if Global Object ,as Zr
             * @return {Boolean}
             * */
            checkModsLoadRecursively:function(modNames,runtime){
                var s = 1;
                $.each(modNames,function(i,n){
                    s = s && Utils.checkModLoadRecursively(n,runtime);
                });
                return !!s;
            },

            /**
             * Dependent on checkModsLoadRecursively
             * @param {Array} [modules]
             * @param {Object} [runtime] this if Global Object ,as Zr
             * @return {Boolean}
             * */
            checkModLoadRecursively:function(modName,runtime){
                 var mods = runtime.global.MODULES,
                     status,
                     m = mods[modName];
                 if(!m){
                     return false;
                 }
                status = m.status;
                return true;
            },

            /**
             *重新绑定关系
             * */
            bindModsRecursively:function(modNames,runtime){
                  $.each(modNames,function(i,n){
                      Utils.attachModRecursively(n,runtime);
                  });
            },
            attachModRecursively:function(modName,runtime){
                var mods = runtime.global.MODULES,
                    status,
                    m = mods[modName];
                status = m.status;
                if(status >= runtime.Loader.Status.ATTACHING){
                    return;
                }
                m.status = runtime.Loader.Status.ATTACHING;
                // Utils.attachMod(runtime,m);
                Utils.attachModFix(runtime,m);

            },
            attachModFix:function(runtime,module){
                var factory = module.factory,
                    mods = runtime.global.MODULES,
                    requires = module.requires,
                    array = [runtime],
                    callfn,
                    callback;
                //矫正加载的名称./a/b.js => ./a/b 或者 ./a/b/ => ./a/b/index
                requires = Utils.extModnames(requires);
                //根据模块名，获取正确的命名规则
                requires = Utils.checkFromModuleList(requires,runtime);
                requires = Utils.extModnames(requires);
                //
                if($.isFunction(factory)){
                    // var require;
                    if(factory.length > 1){
                        $.each(requires,function(i,n){
                            if(!mods[n]){
                                throw "请检查该模块:"+n+",是否已注册或者拼写是否有误！";
                                // return;
                            }
                            //
                            if($.extname(n) == ".css"){
                                callfn = undefined;
                            }else{
                                callfn = mods[n].exports ? mods[n].exports : mods[n].factory();
                            }
                            //

                            array.push(callfn);
                        });
                    }
                    callback = factory.apply(module,array);
                    if(callback){
                        module.exports = callback;
                    }
                }else{
                    module.exports = factory;
                }
                module.status = runtime.Loader.Status.ATTACHED;
            },

            attachMod:function(runtime,module){
                 var factory = module.factory,
                     myEx;

                 if($.isFunction(factory)){
                    var require;

                    if(factory.length > 1){
                        require = $.bind(module.requires,module);
                    }
                    //
                     myEx = factory.apply(module,runtime,require,module);
                     if(myEx){
                         module.exports = myEx;
                     }
                     //
                 }else{
                     module.exports = factory;
                 }
                 module.status = runtime.Loader.Status.ATTACHED;
            },
            /**
             * 以下只是测试版本的方法
             * 测试版本方法
             * **/

            checkDependOn:function(modName,runtime){
                var mods = runtime.global.MODULES,
                    // status,
                    m = mods[modName];
                if(!m){
                    // console.log("未查询到该模块,请加载后再执行");
                    return false;
                }else{
                    return true;
                }
            },
            getWaitingModName:function(mods){
               var modName;
                $.each(mods,function(i,n){
                    {
                        modName = i;
                        return false;
                    }
                });
                return modName;
            },
            dependOnMod:function(waitingModules,runtime){
                //如果不为空,则执行依次依赖执行
                var modName = Utils.getWaitingModName(waitingModules.waitMods);
                //
                //
                var modObj = runtime.global.MODULES[modName] || "";
                //
                //
                if(!modObj){
                    waitingModules.notifyAll();
                    return;
                }
                //
                waitingModules.remove(modName);
                //
                if(modObj.status > runtime.Loader.Status.LOADED){
                    //已加载继续执行
                    Utils.dependOnModEach(waitingModules,runtime);
                }else{
                    //已经开始加载
                    runtime.global.MODULES[modName].status = runtime.Loader.Status.READY_TO_ATTACH;
                    //未加载执行依次加载
                    var requires = modObj.requires;
                    if(requires){
                        requires = requires.join(",");
                        runtime.use(requires,function(){
                            Utils.dependOnModEach(waitingModules,runtime);
                        });
                    }else{
                        Utils.dependOnModEach(waitingModules,runtime);
                    }

                }
            },
            dependOnModEach:function(waitingModules,runtime){
                if(!$.isEmptyObject(waitingModules.waitMods)){
                    Utils.dependOnMod(waitingModules,runtime);
                }else{
                    waitingModules.notifyAll();
                }
            },
            checkRequireModules:function(modNames,runtime){
                var ret = [],
                    modObj,r,s;
                $.each(modNames,function(i,n){
                    modObj = runtime.global.MODULES[n];
                    r = modObj.requires;
                    s = modObj.status;
                    if(r && s <= runtime.Loader.Status.LOADED){
                        ret = ret.concat(modObj.requires);
                    }
                });
                return ret;
            },
            registerNameAndAddRequireName:function(name,deps,runtime){
                var r = Utils.checkNameRex(name);
                var ret = [];
                if(deps.length > 0 && r){
                    $.each(deps,function(i,n){
                        //判断当前是否是以"./  or .\"开头
                        var isExt = Utils.isAddExtName(n);
                        if(isExt){
                            n = n.replace(/^(\.[\/|\\])/g,"");
                            ret.push(r+n);
                            return;
                        }
                        //判断当前是否以"/ or \"开头
                        isExt = Utils.isAddExtshortName(n);
                        if(isExt){
                            n = n.replace(/^[\/|\\]/g,"");
                            ret.push("./"+n);
                            return;
                        }
                        //如果以上都不是那就是以别名进行命名的规则
                        ret.push(n);
                    });
                }
                //最后检查依赖是否有别名，有就替换，没有就继续
                ret = Utils.checkFromModuleList(ret,runtime);
                if(!ret.length){
                    ret = deps;
                }
                return ret;
            },
            isAddExtName:function(name){
                var ret = name.match(/^(\.[\/|\\])/g);
                return ret ? 1 : 0;
            },
            isAddExtshortName:function(name){
                var ret = name.match(/^[\/|\\]/g);
                return ret ? 1 : 0;
            },
            checkNameRex:function(name){
                var rex = /^\.[\/|\\]\w+[\/|\\]/;
                var rname = name.match(rex) || "";
                return rname;
            },
            checkFromModuleList:function(modNames,Zr){
                var config = Zr.baseConfig,
                    mod,mdname;
                //
                var repeat = {};    
                $.each(modNames,function(i,n){
                    mod = Utils.extModnames([n]);
                    if(repeat[mod]){
                        return;
                    }
                    mdname = config.module[mod];
                    if(mdname){
                        modNames[i] = mdname.version ? mdname.path.replace("@version",mdname.version) : mdname.path;
                    }
                    repeat[mod] = 1;
                });
                return modNames;
            },
            checkAttachStatus:function(modsNames,runtime){
                var ret = [],
                    mods = runtime.global.MODULES,
                    mod,
                    status;
                if(modsNames){
                    $.each(modsNames,function(i,n){
                        //
                        n = Utils.extModnames(n);
                        //
                        mod = mods[n] || {};
                        status = mod.status;
                        if(!status){
                            ret.push(n);
                        }
                    });
                }
                return ret;
            },
            //检查并返回第0项为伪数组转换为数组
            checkChildStringToArray:function(modules){
                if(!modules){
                    return modules;
                }
                var rets = modules[0];
                if(rets.lastIndexOf(",") > 0){
                    try{
                        rets = rets.split(",");
                    }catch(error){
                        throw "转换modules的String => Array 异常，请检查后重试";
                    }
                }else{
                    rets = modules;
                }
                return rets;
            }
        });
        // module.exports = Utils;
        var utils = Utils;

    var doc = document,
            headNode,
            norepeat = {};

        var getFile = function(url,success,charset){
             var defaults = success,
                 css = false,
                 error,
                 callbacks,
                 attrs,
                 timeout,
                 timer;
             var baseConfig = Zr.baseConfig;
            //
            var randomTime = +(new Date()),
            randomMath = Math.floor(Math.random() * 10000000);
            randomTime ="?requestTime="+randomTime + randomMath;
            if(url.lastIndexOf(".css",url.length) > 0){
                css = true;
            }
            //
            if($.isPlainObject(defaults)){
                success = defaults.success;
                error = defaults.error;
                timeout = defaults.timeout;
                charset = defaults.charset;
                attrs = defaults.attrs;
            }
            //存储并调用节点,以防重复加载数据;norepeat是根据url的关键key存储的数组
            callbacks = norepeat[url] = norepeat[url] || [];
            //将callbacks数组加入新方法
            success = success || function(){};
            error = error || function(){};
            callbacks.push([success,error]);
            //如果已存在url请求,则直接返回存储的节点名称即可
            if(callbacks.length > 1){
                return callbacks.node;
            }
            //
            //
            var node = doc.createElement(css ? 'link' : 'script'),
                clearTimer = function(){
                    if(timer){
                        timer.cancel();
                        timer = undefined;
                    }
                };
            //
            //
            if(attrs){
                $.each(timer,function(i,n){
                    node.setAttribute(i,n);
                });
            }
            //
            if(charset){
                node.charset = charset;
            }
            //
            //设置开发模式
            if(css){
                if(baseConfig.requestTime){
                    node.href = url + randomTime;
                }else{
                    node.href = url;
                }
                node.rel = 'stylesheet';
            }else{
                if(baseConfig.requestTime){
                    node.src = url + randomTime;
                }else{
                    node.src = url;
                }
                node.async = true;
            }
            //设置版本信息
            if(!baseConfig.requestTime && baseConfig.requestVersion && css){
                node.href = url + "?ver=" + baseConfig.requestVersion;
            }else if(!baseConfig.requestTime && baseConfig.requestVersion){
                node.src = url + "?ver=" + baseConfig.requestVersion;
            }
            //缓存节点
            callbacks.node = node;
            //遍历存储方法体,方便回调(不存储直接回调容易被重复调用其他函数体覆盖先前函数体)
            function n(index){
                var index = index,
                    fn;
                clearTimer();
                $.each(norepeat[url],function(i,n){
                    if((fn = n[index])){
                        fn.call(node);
                    }
                });
                delete callbacks[url];
            }
            //
            var supportLoad = "onload" in node,
                onEvent = supportLoad ? "onload" : "onreadystatechange";
            node[onEvent] = function(){
                node.onreadystatechange = node.onload = null;
                n(0);
            };
            if(timeout){
                timer = $.later(function(){
                    n(1);
                },timeout*1000);
            }
            //
            if(!headNode){
                headNode = doc.getElementsByTagName("head")[0] || doc.documentElement;
            }
            //
            if(css){
                headNode.appendChild(node);
            }else{
                headNode.insertBefore(node,headNode.firstChild);
            }
            //
        };

    var version = "v1.0.0";
    var config = {
        "version":version,
        "baseUrl":"",
        "cdnUrl":"//storage.360buyimg.com/"+version+"/",
        "requestTime":false,
        "moduleList":{},
        "module":{
            "zr":{
                // "path":"./zr/cdn_index"
                "path":"./zr/index"
            },
            "dp":{
                // "path":"./dp/cdn_index"
                "path":"./dp/index"
            }
        },
        "language":"CN",
        "requestVersion":""
    };

    /**
     * Created by zhangjinglin on 16/9/2.
     */
        //
        function moduleLoader(runtime,waitingModules){
            var _self = this;
            if(!(_self instanceof moduleLoader)){
                return new moduleLoader(runtime,waitingModules);
            }
            $.extend(this,{
                runtime:runtime,
                waitingModules:waitingModules
            });
            //
            return _self;
        }

        $.extend(moduleLoader.prototype,{
            /**
             *
             *
             *
             * */
            // use:function(normalizedModNames){
            //     var _self = this,
            //         allModNames,
            //         comboUrls,
            //         moduleUrl,
            //         timeout ;
            //     var length = normalizedModNames.length,
            //         index = 1;
            //     var array = [];
            //     $.each(normalizedModNames,function(i,n){
            //         moduleUrl = config.baseUrl + n;
            //         var type = $.extname(n);
            //         if(type == ".js"){
            //             array.push(n);
            //         }
            //        getFile(moduleUrl,function(){
            //            index++;
            //            if(index == length){
            //                array.push(function(){
            //                    alert("run")
            //                    _self.waitingModules.notifyAll();
            //                })
            //                Zr.use.apply("",array);
            //            }
            //        })
            //     })
            //
            // },
            /**
             * 因为Zr.use方法使用的方法至少有一种未加载，所以将所有use方法挂起，并逐一检查与加载
             * 第一步挂起use的方法到loader.fn中
             * 第二部将use的使用js插件与css分别挂起到到loader.waitMods中
             * 第三步开始执行挂起loader.waitMods的文件---->寻找策略（）
             * 1.已加载的Zr.global.MODULES列表中查找
             * 2.config配置文件的Zr.config.module中查找
             * 3.直接到config配置根目录插件列表中查找相应文件
             * 故使用如下方法进行文件加载，首先分析模块信息
             *
             *
             * */
            use:function(normalizedModNames,runtime){
                var _self = this,
                    modules;
                            // allModNames,
                            // comboUrls,
                            // timeout ;
                    //从config文件中查找对应的路径文件
                    normalizedModNames = utils.checkFromModuleList(normalizedModNames,runtime);
                    // console.log(normalizedModNames)
                    //开始第一步筛查已存在的对象,并登记未使用对象到Zr.global.MODULES中
                    modules = _self.calculate(normalizedModNames);
                    //开始遍历加载模块到页面
                    if(!$.isEmptyObject(modules)){
                        _self.eachLoadModules(modules);
                    }

                //

                //
            },
            // calculate:function(modNames, cache, ret){
            //     var m,
            //         mod,
            //         modStatus,
            //         self = this,
            //         waitingModules = self.waitingModules,
            //         runtime = self.runtime;
            //     ret = ret || {};
            //     //
            //     // console.log(self.runtime.global.MODULES)
            //     //
            //     $.each(modNames,function(i,n){
            //       mod = utils.createModuleInfo(runtime,n);
            //       modStatus = mod.status;
            //       m = utils.extModnames([n]);
            //        if(modStatus >= runtime.Loader.Status.READY_TO_ATTACH){
            //            //再次判定当前是否存在
            //            waitingModules.remove(m[0]);
            //            //remove this
            //            return;
            //        }
            //        if(modStatus !== runtime.Loader.Status.LOADED){
            //            if(waitingModules.contains(m)){
            //                if(modStatus !== runtime.Loader.Status.LOADING){
            //                    mod.status = runtime.Loader.Status.LOADING;
            //                    ret[n] = 1;
            //                }
            //            }else{
            //                mod.status = runtime.Loader.Status.INIT;
            //                ret[n] = 0;
            //            }
            //        }
            //     })
            //     return ret;
            //
            // },
            calculate:function(modNames, cache, ret){
                var m,
                    mod,
                    modStatus,
                    self = this,
                    waitingModules = self.waitingModules,
                    runtime = self.runtime;
                ret = ret || [];
                //
                // console.log(self.runtime.global.MODULES)
                //
                $.each(modNames,function(i,n){
                    mod = utils.createModuleInfo(runtime,n);
                    modStatus = mod.status;
                    m = utils.extModnames([n]);
                    if(modStatus >= runtime.Loader.Status.READY_TO_ATTACH){
                        //再次判定当前是否存在
                        waitingModules.remove(m[0]);
                        //remove this
                        return;
                    }
                    if(modStatus !== runtime.Loader.Status.LOADED){
                        if(waitingModules.contains(m)){
                            if(modStatus !== runtime.Loader.Status.LOADING){
                                mod.status = runtime.Loader.Status.LOADING;
                                ret.push(n);
                            }
                        }else{
                            mod.status = runtime.Loader.Status.INIT;
                            ret.push(n);
                        }
                    }
                });
                return ret;

            },
            // checkFromModuleList:function(modNames){
            //     var config = this.runtime.baseConfig,
            //         mod,mdname
            //     $.each(modNames,function(i,n){
            //         mod = utils.extModnames([n]);
            //         mdname = config.module[mod];
            //         if(mdname){
            //             modNames[i] = mdname.path;
            //         }
            //     })
            //     return modNames;
            // },
            checkCDNStatus:function(modName){
                var status = 1;
                if(!modName.match(".cdn")){
                    status = 0;
                }
                return status;
            },
            eachLoadModules:function(normalizedModNames){
                var cssArray = [],jsArray =[],allLength=0,index = 0,moduleUrl,type,m;
                var _self = this;
                $.each(normalizedModNames,function(i,n){
                    //
                    //
                    m = utils.extModnames(n);
                    // alert(_self.waitingModules.contains(m));
                    // if(!_self.waitingModules.contains(m)){
                    //     _self.waitingModules.remove(m);
                    //     return;
                    // }
                    //
                    type = $.extname(n);
                    //再次筛查等待列表是否有此次任务名称
                    if(type == ".css"){
                        cssArray.push(n);
                    }
                    if(type == ".js"){
                        jsArray.push(n);
                    }
                    if(!type){
                        m += ".js";
                        jsArray.push(m);
                    }
                    allLength++;
                });
                //
                //
                $.each(cssArray,function(a,b){
                    //
                    if(_Zr.global.MODULES[b].status == _Zr.Loader.Status.ATTACHED){
                        index++;
                        return;
                    }
                    //
                    if(_self.checkCDNStatus(b)){
                        moduleUrl = config.cdnUrl + b;
                    }else{
                        moduleUrl = config.baseUrl + b;
                    }
                    moduleUrl = moduleUrl.replace(/\.[\/|\\]+/,"");
                    getFile(moduleUrl,function(){
                                   index++;
                                   _self.waitingModules.remove(b);
                                   if(index == allLength){
                                       _self.waitingModules.notifyAll();
                                   }
                                   //css载入后直接更改为已绑定依赖状态
                                   _Zr.global.MODULES[b].status = _Zr.Loader.Status.ATTACHED;
                               });
                });
                //
                $.each(jsArray,function(c,d){
                    if(_self.checkCDNStatus(d)){
                        moduleUrl = config.cdnUrl + d;
                    }else{
                        moduleUrl = config.baseUrl + d;
                    }
                    moduleUrl = moduleUrl.replace(/\.[\/|\\]+/,"");
                    m = utils.extModnames(d);
                    _self.runtime.global.MODULES[m].status = _self.runtime.Loader.Status.LOADING;
                    getFile(moduleUrl,function(){
                        index++;
                        _self.waitingModules.remove(m);
                        if(index == allLength){
                             _self.waitingModules.notifyAll();
                        }
                    });
                });

            }
        });

    /**
     * Created by zhangjinglin on 16/9/2.
     */

        var loader = _Zr.Loader;
        var ModulesObject = {};
        //
        $.extend(ModulesObject,{
            Modules:function(){
                //沙箱模式
                var args = Array.prototype.slice.call(arguments),
                    callback = args.pop(),
                    error,
                    sync,
                    loader,
                    waitingModules,
                    finalCallback,
                    tryCount= 0,
                    _self = this,
                    modules = (args[0] && typeof(args[0]) === "string")?args:args[0];

                if(!(_self instanceof ModulesObject.Modules)){
                    return new ModulesObject.Modules(modules,callback);
                }
                //check list
                if($.isObject(callback)){
                    error = callback.error;
                    sync = callback.sync;
                    callback = callback.success;
                }
                if(typeof(callback) !== "function"){
                    throw "Callback must be a function";
                }
                //将结果集返回到回到函数体内, 此函数只有在依赖载入完毕,模块功能生效时调用
                finalCallback = function(){
                    callback.apply(_Zr,utils.getModules(_Zr,modules));
                };
                //根据模块名称进行修改 => 获取正确模块名称
                modules = utils.extModnames(modules);
                //
                //
                function loadReady(){
                    ++tryCount;
                    var start = +new Date(),
                        ret;
                    // console.log("开始执行模块依赖加载");
                    ret = utils.checkModsLoadRecursively(modules,_Zr);
                    _Zr.log(tryCount + " check duration :" + (+(new Date()) - start)+"ms");
                    if(ret){
                        // console.log("检测模块是否依赖");
                        utils.attachModsRecursively(modules,_Zr);
                    }else{
                        // console.log("您有模块未注册,正在注册该模块");
                        waitingModules.fn = loadReady();
                        loader.use();
                        finalCallback();
                    }
                }
                //(new)新建等待对象,将需要等待的模块名称添加到其中
                waitingModules = ModulesObject.waitingModules(loadReady);
                //(new)创建新loader对象,可以异步加载数据
                loader = moduleLoader(_Zr,waitingModules);
                //

                //模块加载
                if(sync){
                    //是否执行同步任务,同步则立即执行
                    waitingModules.notifyAll();
                }
                return _Zr;
            },
            ModulesFix:function(){
                //沙箱模式
                var args = Array.prototype.slice.call(arguments),
                    // error,
                    // sync,
                    // allModNames,
                    loader,
                    waitingModules,
                    finalCallback,
                    tryCount= 0,
                    // attachFn,
                    // modName,
                    modNames,
                    modObj,
                    _self = this,
                    modules = (args[0] && typeof(args[0]) === "string")?args:args[0];
                var callback = args[args.length - 1];
                if($.isFunction(callback)){
                    callback = args.pop();
                }else{
                    callback = function(){};
                }
                if(!(_self instanceof ModulesObject.ModulesFix)){
                    return new ModulesObject.ModulesFix(modules,callback);
                }
                //check list
                if($.isObject(callback)){
                    // error = callback.error;
                    // sync = callback.sync;
                    callback = callback.success;
                }
                if(typeof(callback) !== "function"){
                    throw "callback was not defined";
                }
                //==========补丁=======>因为modules传入是string类型的数组，所以需要进行判断分析后转化为数组进行操作
                modules = utils.checkChildStringToArray(modules);
                //根据模块名称进行修改 => 获取正确模块名称
                var extModules = utils.extModnames(modules);
                //根据模块名，获取正确的命名规则
                modNames = utils.checkFromModuleList(extModules,_Zr);
                modNames = utils.extModnames(modNames);
                //将结果集返回到回到函数体内, 此函数只有在依赖载入完毕,模块功能生效时调用
                finalCallback = function(){
                    var rets = utils.getModules(_Zr,modNames);
                    callback.apply(_Zr,rets);
                };
                //
                function loadReady(){
                    ++tryCount;
                    var start = +new Date(),
                        ret;
                    //检查模块是否全部都已经加载就绪，缺少一项则需要挂起后执行加载后才能再次执行此方法
                    // ret = utils.checkModsLoadRecursively(extModules,Zr);
                    ret = utils.checkModsLoadRecursively(modNames,_Zr);
                    _Zr.log(tryCount + " check duration :" + (+(new Date()) - start)+"ms");
                    if(ret){
                        //因为需要的模块已经成功载入，但是还没有检查该模块是否有需要依赖的模块
                        modObj = utils.checkRequireModules(modNames,_Zr);
                        if(modObj.length){
                             modObj.push(function(){
                                 //检查模块是否已经大于loaded，如果是，则重新从缓存中绑定模块关系，否则无法回调使用！！
                                 utils.bindModsRecursively(modNames,_Zr);
                                 //
                                 //
                                 finalCallback();
                             });
                             _Zr.use.apply(this,modObj);
                            return;
                        }
                        //检查模块是否已经大于loaded，如果是，则重新从缓存中绑定模块关系，否则无法回调使用！！
                        if(modNames.length){
                            utils.bindModsRecursively(modNames,_Zr);
                        }
                        //
                        //
                        finalCallback();
                    }else{
                        // console.log("您有模块未注册,正在注册该模块");
                        waitingModules.fn = loadReady;
                        //检查模块是否已经载入并检测状态
                        modules = utils.checkAttachStatus(modules,_Zr);
                        //
                        loader.use(modules,_Zr);
                        // finalCallback();
                    }
                }
                //(new)新建等待对象,将需要等待的模块名称添加到其中
                waitingModules = ModulesObject.waitingModules(loadReady);
                //(new)创建新loader对象,可以异步加载数据
                loader = moduleLoader(_Zr,waitingModules);
                //开始进行所有操作进行检查挂起,如果状态为2以内,则需要进行函数执行操作
                //第一步,全部挂起
                if(extModules.length > 0){
                    $.each(extModules,function(i,n){
                        waitingModules.add(n);
                    });
                }
                //并将第一步方法存储
                waitingModules.fn = loadReady;
                //分析模块并开始执行加载依赖
                function startAnalyse(waitingModules){
                    if(!$.isEmptyObject(waitingModules.waitMods)){
                        utils.dependOnMod(waitingModules,_Zr);
                    }else{
                        //直接执行
                        waitingModules.notifyAll();
                    }
                }
                function checkWaiting(modNames,waitingModules){
                    startAnalyse(waitingModules);
                }
                //
                function reCheck(modNames,waitingModules){
                    if(utils.checkIsLoadingStatus(modNames,_Zr)){
                        (function(modNames,waitingModules){
                            setTimeout(function(){
                                reCheck(modNames,waitingModules);
                            },30);
                        })(modNames,waitingModules);
                    }else{
                        //直接执行
                        checkWaiting(modNames,waitingModules);
                    }
                }
                //第二步,开始分析并执行
                if($.isEmptyObject(_Zr.global.MODULES)){
                    checkWaiting(modNames,waitingModules);
                }else{
                    reCheck(modNames,waitingModules);
                }
                // checkWaiting(modNames,waitingModules);
                //waitingModules.notifyAll();
                return _Zr;
            },
            ModulesAdd:function(name,factory,deps){
                var deps = deps || {},
                    config = deps;
                deps = deps.requires || [];
                //分析name格式，将保留./name/这样形式的字符到requires
                deps = utils.registerNameAndAddRequireName(name,deps,_Zr);
                config.requires = deps;
                //
                //
                if(arguments.length == 3 && $.isArray(factory)){
                    var tmp = factory;
                    factory = deps;
                    deps = tmp;
                    config = {
                        requires:deps,
                        status:1
                    };
                }
                //
                //
                config = utils.addQueenRequire(config,factory);
                //
                utils.registerModule(name,factory,config,_Zr);
            },
            /**
            * 计算动态依赖模块加载
            * */
            calculate:function(modNames, cache, ret){
                var m,
                    modStatus,
                    mod;

                cache = cache || {};
                // ret = ret || {};
                $.each(modNames,function(i,n){
                    m = n;
                    if(cache[m]){
                        return;
                    }
                    cache[m] = 1;
                    mod = utils.createModuleInfo(_Zr,m);
                    modStatus = mod.status;
                    if (modStatus >= loader.Status.READY_TO_ATTACH) {
                        return
                    }
                    if(modStatus != loader.Status.LOADED);
                });
            },
            /**
            * 依赖模块加载处理方法
            * */
            waitingModules:function(fn){
                var _self = this;
                if(!(_self instanceof ModulesObject.waitingModules)){
                    return new ModulesObject.waitingModules(fn);
                }
                //
                $.extend(_self,{
                    fn:fn,
                    waitMods:{},
                    notifyAll:function(){
                        var fn = _self.fn;
                        if(fn && $.isUndefined(_self.waitMods)){
                            _self.fn = null;
                            fn();
                        }
                    },
                    add:function(modName){
                        _self.waitMods[modName] = 1;
                    },
                    remove:function(modName){
                        delete _self.waitMods[modName];
                    },
                    contains:function(modName){
                        return _self.waitMods[modName];
                    }
                });
                //

                //
                return _self;
            }

        });
        //
        ModulesObject.Modules.prototype = {


        };

    /**
     * Created by zhangjinglin on 16/9/2.
     * *underscore1.7 and modify some methods
     */
    var event = {};

    /**
     * Created by zhangjinglin on 16/9/2.
     */
    //
    if(!window.__ZrGlobalStatus){
        _Zr.global.document = _Zr.document = document;
        _Zr.global.window = _Zr.window = window;
        _Zr.global.baseConfig = _Zr.baseConfig = config;
        _Zr.global.config = _Zr.config = function(options){
            _Zr.global.baseConfig = _Zr.baseConfig = $.extend(true,_Zr.global.baseConfig,options);
        };
        
        _Zr.global._config = _Zr._config = function(options){
            _Zr.global.baseConfig = _Zr.baseConfig = $.extend(true,options,_Zr.global.baseConfig);
        };
        //添加完后执行别名执行操作
        //Zr.global.use = Zr.use = modules.Modules;
        _Zr.global.use = _Zr.use = ModulesObject.ModulesFix;
        _Zr.global.add = _Zr.add = ModulesObject.ModulesAdd;
        _Zr.global.require = _Zr.require = getFile;
        _Zr.global.tools = _Zr.tools = $;
        _Zr.global.extend = _Zr.extend = $.extend;
        // Zr.global.dom = Zr.dom = dom;
        // Zr.global.init = Zr.init = dom.init;
        _Zr.global.event = _Zr.event = event;
        //
        _Zr.global.readyQueen = _Zr.readyQueen = [];
        _Zr.global.ready = _Zr.ready = function(fn){
            _Zr.readyQueen.push(fn);
        };
        _Zr.tools.later(function(){
            _Zr.use("zr","dp",function(zr){
                _Zr.tools.each(_Zr.readyQueen,function(i,n){
                    n();
                });
            });
        },0);
    }

    if(!window.__ZrGlobalStatus){
        window.Zr = _Zr;
        window.__ZrGlobalStatus = 1;
    }

    return Zr;

})));

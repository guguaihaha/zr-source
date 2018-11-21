//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require("gulp-less"),
    concat = require('gulp-concat'),//合并文件 --合并只是放一起--压缩才会真正合并相同样式
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    autoprefixer = require("gulp-autoprefixer"),
    webserver = require('gulp-webserver'),
    // cssBase64 = require('gulp-css-base64'),
    // base64 = require('gulp-base64'),
    watch = require('gulp-watch');
//combin

gulp.task('less', function () {
    gulp.src(['css/less/core/zr.less',"font/css/fontello.css","font/css/animation.css"]) //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 5 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('zr.css'))
        // .pipe(concatCss('font/css/fontello.css')) //合并css
        .pipe(gulp.dest('js/plugin_modules/zr/css')) //将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("js/plugin_modules/zr/css"))
});

gulp.task('contentLess', function () {
    gulp.src('css/less/custom/content.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('frontPage/css')) //将会在src/css下生成index.css
        .pipe(minifyCss())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("frontPage/css"))
});


gulp.task("minjs",function(){
    gulp.src("frontPage/js/**/*.js")
        .pipe(concat('inner.js'))
        .pipe(minifyJs())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("frontPage/min"))
})
//公共外置组件压缩js
var  moduleName = "datePicker"
gulp.task("outminjs",function(){
    gulp.src("js/plugin_modules/"+moduleName+"/**/*.js")
        .pipe(minifyJs())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("js/plugin_modules/"+moduleName))
})

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            port:9999,
            open: true
    }));
});

//外置组件引用处
var outerName = "datePicker";
gulp.task("outerLess",function(){
    gulp.src('./css/outerLess/'+outerName+"/**/*.less")
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest("js/plugin_modules/"+outerName+"/css"))
})
//
gulp.task("init",function(){
    //"src/css/**/*.css","src/js/**/*.js",
    //less
    var lessWatcher = gulp.watch("css/less/**/*.less",["less","contentLess"]),
        jsMinWatcher = gulp.watch("frontPage/js/**/*.js",["minjs"]),
        outerLessWatcher = gulp.watch('./css/outerLess/'+outerName+"/**/*.less",["outerLess"]);

    outerLessWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    lessWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    jsMinWatcher.on("change",function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})

gulp.task('default',['init','webserver']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
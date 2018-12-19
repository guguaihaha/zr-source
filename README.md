Zr-source
====

> 如何安装

下载后运行npm install，如果安装失败，请使用淘宝镜像安装cnpm install。 安装完毕后运行命令 gulp 即可

<br/>
<br/>
<br/>

> 如何贡献组件

很简单，直接fork `zr-source` 这个项目到你的GitHub账号下即可。然后开发完了可以push到你的账号下同时发送pull通知给我
同时表明组件的用途，最好还有一个不错的文档哦。

<br/>
<br/>
<br/>

> 如何引用Zr

这个也是很方便，简单粗暴，直接引入css和javascript文件即可。当然如果您的页面主架构的CSS代码也建议您提前引入

引入如下,以一个index.html为例，同时还有一个组件index.js：

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Zr demo</title>
    <!--引用主框架预加载样式，防止页面瞬间白屏或者结构变形而影响体验-->
    <link rel="stylesheet" href="//www.xxx.com/static/index.min.css" />
    <!--引入Zr主要样式文件-->
    <link rel="stylesheet" href="//storage.360buyimg.com/v1.0.0/zr/css/cdn_zr.min.css" />
</head>
<body>
<div id="app">

<!-- 其他页面Dom结构 -->

</div>

<script type="text/javascript"  src="//storage.360buyimg.com/v1.0.0/zr.min.js"></script>
<script>
    //全局配置
    Zr.config({
      //配置静态路径
      baseUrl:"/static/",
      //开发模式下建议开启，上线后请删除
      requestTime:true
      //上线前的版本修改
      requestVersion:"20190101"
    })
    //Zr准备就绪可以使用了
    Zr.ready(function(){
        Zr.use("./index",function(zr,index){
            //使用本页面index入口模块和根据业务逻辑暴露的方法
            index.init()
        })
    })
    </script>
</body>
</html>

```

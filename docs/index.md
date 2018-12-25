### Zr API 导航

> 名词解释

+ 内置组件

   内置组件的特点就是只需要在实际Dom节点上添加className或者添加自定义属性，如下:
   
```html
   <button type="button" class="zr-tooltip" data-tip-text="tip position tl" data-ip-position="tl">
     <span>show me</span>
   </button>
```

   可以看到，添加了zr-tooltip 的className即可将按钮变成了文字提示，提示位置`data-ip-position`和内容`data-tip-text`又是自定义的属性来控制。
   
   当然如果需要控制具体回调事件的操作，每个内置组件基本都会在文档中说明是否嵌入了onzrchange，具体详细参考各个内置模块的api[了解更多](http://gtp-zr.jd.com/docs?languageCode=CN&columnUid=41c513f9dd334a1ebb0fbbd76d71e973&directoryUid=)
   
   [内置组件讨论和改进意见](//github.com/guguaihaha/zr-source/issues/36)
   
   

+ 外置组件

   外置组件的特点就是要是用[Zr.use](//github.com/guguaihaha/zr-engine/blob/master/docs/API.md#user-content-use)是用插件和[Zr.add](://github.com/guguaihaha/zr-engine/blob/master/docs/API.md#user-content-add )封装插件了
   外置组件是用灵活，扩展性强，当然如果再外置组件有问题，可以在[外置组件讨论和改进意见](//github.com/guguaihaha/zr-source/issues/37)，
   同时外置组件分为以下两点：
  
  * 外置平台间
  
    通常是指Zr的team研发的组件，负责修改和更新。比如`message`,`modal`等
  
  * 外置第三方组件
  
    通常指封装的第三方组件，文档和内容都是外链的。比如`jquery`,`swiper`等
  
   <br/> 
   <br/>
   <br/>


> 导航树 <span id="guide">#</span>

---

| 组件名称     | Demo地址   |  API地址  |  讨论地址  |
| --------    | :----- | :----:  | :----:  |
| Zr的API  |    | [API](//github.com/guguaihaha/zr-engine/blob/master/docs/API.md)    |  |
| 快速使用  |    | [API](//github.com/guguaihaha/zr-engine/blob/master/docs/quick.md)    | [讨论](//github.com/guguaihaha/zr-engine/issues/3) |
| 组件封装技巧  |    | [API](//github.com/guguaihaha/zr-engine/blob/master/docs/API.md#user-content-add)    | [讨论](//github.com/guguaihaha/zr-engine/issues/5) |
| PRO的使用  |    | [API](//github.com/guguaihaha/zr-pro-flex)    | [讨论](//github.com/guguaihaha/zr-pro-flex/issues) |
|   |    |    |  |
| button 按钮  | [Demo](http://gtp-zr.jd.com/docs?languageCode=CN&columnUid=41c513f9dd334a1ebb0fbbd76d71e973&directoryUid=d6ffabab29694e338a2e9aba2e3ea3d0&directoryName=Button%20%E6%8C%89%E9%92%AE)   | [API](./inner/button.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/2) |
| icon 图标  | [Demo](http://gtp-zr.jd.com/docs?languageCode=CN&columnUid=41c513f9dd334a1ebb0fbbd76d71e973&directoryUid=8fd3459c5ba04cf681494941b2db31e2&directoryName=Icon%20%E5%9B%BE%E6%A0%87)   | [API](./inner/icon.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/3) |
| grid 栅格  | [Demo](http://gtp-zr.jd.com/docs?languageCode=CN&columnUid=41c513f9dd334a1ebb0fbbd76d71e973&directoryUid=211290909d2f484ab834218f3cc7830f&directoryName=Grid%20%E6%A0%85%E6%A0%BC)   | [API](./inner/grid.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/4) |
| layout 布局  | [Demo](http://gtp-zr.jd.com/docs?languageCode=CN&columnUid=41c513f9dd334a1ebb0fbbd76d71e973&directoryUid=f709304e0f6d4333ad6ccd11f87b7918&directoryName=Layout%20%E5%B8%83%E5%B1%80)   | [API](./inner/layout.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/5) |
| breadcrumb 面包屑  | [Demo]()   | [API](./inner/breadcrumb.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/6) |
| dropdown 下拉菜单  | [Demo]()   | [API](./inner/dropdown.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/7) |
| nav 导航和导航菜单  | [Demo]()   | [API](./inner/nav.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/8) |
| step 步骤条  | [Demo]()   | [API](./inner/step.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/9) |
| input 输入框  | [Demo]()   | [API](./inner/input.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/10) |
| radio 单选框  | [Demo]()   | [API](./inner/radio.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/11) |
| checkbox 复选框  | [Demo]()   | [API](./inner/checkbox.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/12) |
| select 下拉选择  | [Demo]()   | [API](./inner/select.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/13) |
| upload 上传  | [Demo]()   | [API](./inner/upload.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/14) |
| form 表单  | [Demo]()   | [API](./inner/form.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/15) |
| alert 警告提示  | [Demo]()   | [API](./inner/alert.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/16) |
| timeline 时间轴  | [Demo]()   | [API](./inner/timeline.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/17) |
| list 列表  | [Demo]()   | [API](./inner/list.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/18) |
| table 表格  | [Demo]()   | [API](./inner/table.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/19) |
| card 卡片  | [Demo]()   | [API](./inner/card.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/20) |
| divide 分割线  | [Demo]()   | [API](./inner/divide.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/21) |
| photo 头像  | [Demo]()   | [API](./inner/photo.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/22) |
| tooltip 文字提示  | [Demo]()   | [API](./inner/tooltip.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/23) |
| badge 徽标  | [Demo]()   | [API](./inner/badge.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/24) |
| top 返回顶部  | [Demo]()   | [API](./inner/top.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/25) |
| tab 选项卡  | [Demo]()   | [API](./inner/tab.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/26) |
| modal 弹框  | [Demo]()   | [API](./inner/modal.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/27) |
| page 分页  | [Demo]()   | [API](./inner/page.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/28) |
| message 全局提示  | [Demo]()   | [API](./inner/message.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/29) |
| datePicker 日期控件  | [Demo]()   | [API](./inner/datePicker.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/30) |
| popover 气泡卡片  | [Demo]()   | [API](./inner/popover.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/31) |
| affix 固钉  | [Demo]()   | [API](./inner/affix.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/32) |
| tag 标签  | [Demo]()   | [API](./inner/tag.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/33) |
| notification 通知提醒  | [Demo]()   | [API](./inner/notification.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/34) |
| progress 进度条  | [Demo]()   | [API](./inner/progress.md)    | [讨论](//github.com/guguaihaha/zr-source/issues/35) |
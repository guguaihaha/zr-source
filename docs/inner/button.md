# Button 按钮

这是一个基础空间

---

###使用方法

+ 按钮触发应用的功能，存在于页面的许多地方。按钮可以是“图标按钮”，也可以是“文字按钮”，也可以“图文结合”。

+ 使用“文字按钮”时，注意使用动词或动词短语来描述按钮所执行的操作。

+ 按钮有4种状态：默认、点击、选中、禁用。

+ 按钮最多会有3种状态：默认、点击、禁用，也可以只有2种状态：默认、点击或者默认、选中（只有默认、选中的按钮作用）

+ 按钮支持按下后逃逸行为，即按下按钮后再移出热区区域即为取消操作。

<br/>

因为是内置组件，所以就是采用基本用法。此内置组件不含有任何事件。

+ 标准按钮

```html
    <button type="button" class="zr-btn zr-btn-primary">Primary</button>
```

<br/>

+ 多种标签

```html
    <a href="#" class="zr-btn zr-btn-default">A target</a>
    <button type="button" class="zr-btn zr-btn-default">Button target</button>
    <a href="#" type="button" class="zr-btn zr-btn-danger">A target</a>
    <button type="button" class="zr-btn zr-btn-danger">Button target</button>
```
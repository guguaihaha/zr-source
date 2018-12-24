
# Grid 栅格

栅格系统是参考了Bootstrap，但是采用的是24栅格方式，灵活性更强。

---

### 使用方法

栅格使用时候必须建立在行(row)与列(col)基础上，这样就能正常使用栅格系统

+ 栅格通过row建立一组布局

+ 内容放置在col内，并且其父层就是row，要养成良好的书写习惯，否则容易产生异常布局

+ 栅格数值按照1—24，一行数量总和小于等于24（当然算上offset的距离），超出则另起一行

<br/>

### 设计思路

经过实践，Zr重新设计栅格，在原来的12个栅格拓展到24个栅格，更能适应更多应用场景。建议横向排列的栅格单位最多4个，最少一个。

+ 一行1列栅格布局代码

```html
    <div class="zr-row">
        <div class="zr-col-24">zr-col-24（100%)</div>
    </div>
```
<br/>

+ 一行2列栅格布局代码

```html
    <div class="zr-row">
        <div class="zr-col-12">zr-col-12 (50%)</div>
        <div class="zr-col-12">zr-col-12 (50%)</div>
    </div>
```
<br/>

+ 另外一种一行2列的布局

```html
    <div class="zr-row">
        <div class="zr-col-16">zr-col-16 (66.66%)</div>
        <div class="zr-col-8">zr-col-8 (33.33%)</div>
    </div>
```
<br/>

+ 一行3列栅格布局代码

```html
    <div class="zr-row row">
        <div class="zr-col-8">zr-col-8 (33.33%)</div>
        <div class="zr-col-8">zr-col-8 (33.33%)</div>
        <div class="zr-col-8">zr-col-8 (33.33%)</div>
    </div>
```
<br/>

+ 一行4列栅格布局代码（建议布局最多一行4列）

```html
    <div class="zr-row">
        <div class="zr-col-6">zr-col-6 (25%)</div>
        <div class="zr-col-6">zr-col-6 (25%)</div>
        <div class="zr-col-6">zr-col-6 (25%)</div>
        <div class="zr-col-6">zr-col-6 (25%)</div>
    </div>
```
<br/>

### 基础栅格

使用单一的一组row与col栅格，列（col）必须在行中（row）

代码示例如下：

```html
    <div class="zr-row">
        <div class="zr-col-12">zr-col-12</div>
        <div class="zr-col-12">zr-col-12</div>
    </div>
    <div class="zr-row">
        <div class="zr-col-6">zr-col-6</div>
        <div class="zr-col-6">zr-col-6</div>
        <div class="zr-col-6">zr-col-6</div>
        <div class="zr-col-6">zr-col-6</div>
    </div>
    <div class="zr-row">
        <div class="zr-col-8">zr-col-8</div>
        <div class="zr-col-8">zr-col-8</div>
        <div class="zr-col-8">zr-col-8</div>
    </div>
```


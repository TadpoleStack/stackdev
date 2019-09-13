### 常用正则表达式

#### 格式化金额

```js
// 格式化金额
var formatAmount = amount=>{
    amount = amount.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
    amount = amount.replace(/^\./g, ""); //必须保证第一个为数字而不是.
    amount = amount.replace(/^0{2,}/g, 0); //0只能于首位出现一次
    amount = amount.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
    amount = amount.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出两次以上
    amount = amount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    amount = amount.replace(/^0.00{1}/, '0');//不允许输入0.00
    amount = amount.replace(/^0[1-9]/, parseInt(amount));//过滤01-09开头的0
    return amount;
}
```

#### 判断设备系统Android、IOS、winPhone

```js
var AppType = () => {
	let u = navigator.userAgent
	let Android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
    let IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    let winPhone = u.indexOf('Windows Phone')>-1
	return Android ? 'Android' : (IOS?'IOS':'winPhone')
}
```
#### 检测浏览器类型
```js
var getBrowserInfo = ()=>{
        var ua = navigator.userAgent.toLocaleLowerCase();
        var browserType=null;
        if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
            browserType = "IE";
            browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
        }else if (ua.match(/firefox/) != null) {
            browserType = "火狐";
        }else if (ua.match(/ubrowser/) != null) {
            browserType = "UC";
        }else if (ua.match(/opera/) != null) {
            browserType = "欧朋";
        } else if (ua.match(/bidubrowser/) != null) {
            browserType = "百度";
        }else if (ua.match(/metasr/) != null) {
            browserType = "搜狗";
        }else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            browserType = "QQ";
        }else if (ua.indexOf('MicroMessenger') > -1){
            browserType = "微信"
        }else if (ua.match(/maxthon/) != null) {
            browserType = "遨游";
        }else if (ua.match(/chrome/) != null) {
            var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
            var _mime = (option, value)=>{
                var mimeTypes = navigator.mimeTypes;
                for (var mt in mimeTypes) {
                    if (mimeTypes[mt][option] == value) {
                        return true;
                    }
                }
                return false;
            }
            if(is360){
                browserType = '360';
            }else{
                browserType = 'chrome'
            }
        }else if (ua.match(/safari/) != null) {
            browserType = "Safari";
        }
        return browserType;
}
```
#### 检测手机号

```js
var phone = number=>{
    return number.test(/^[1][3,4,5,7,8][0-9]{9}$/)
}
```
#### Email地址
```js
var emailTest = email=>{
    return email.test(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
}
```
#### 删除首尾空字符
```js
var trim = str=>{
    return str.replace(/^\s*|\s*$/,'')
}
```
#### 校检身份证号
```js
var person = number=>{
    return number.test(/^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$/)
}
```
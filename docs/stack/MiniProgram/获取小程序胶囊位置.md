### 获取小程序胶囊位置

```js
var getMenuPosition = ()=>{
    const systemInfo = wx.getSystemInfoSync();
    let top = 4
    let right = 7
    let width = 87
    let height = 32
    if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') === -1) {
        top = 6
        right = 10
    }
    else if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') != -1) {
        top = 8
        right = 10
    }
    else if (systemInfo.system.indexOf('Android') != -1) {
        top = 8
        right = 10
        width = 95
    }
    return {
        top: systemInfo.statusBarHeight + top,
        left: systemInfo.windowWidth - width - right,
        width: width,
        height: height
    }
}
//调用
getMenuPosition();
```
### 图片懒加载的实现

现在的网页图片是比较多，要加载比较多的资源。同一时间发送哼多的请求，服务器压力是非常大的。所以通常对于图片资源进行懒加载的处理。

```html
//图片要有类似 class="lazyload"一样的标识，data-src是图片的真实路径
<img class="lazyload" data-src="https://www.mewebsite.cn/demo-img.jpg" alt="">
```

```js
 class LazyLoad {//这里通过es6的方式来写
        constructor(el) {
          this.list = Array.from(document.querySelectorAll(el)); //NodeList通过Array.from来转换
          this.init(); 
        }
        canILoad() {
          for(let i=this.list.length-1;i>=0;i--){
              this.getBound(this.list[i]) && this.loadImage(this.list[i], i);
          }
        }
        // 获取图片与窗口的信息返回能否达到加载条件
        getBound(el) {//这里通过图片距离窗口距离和视窗高度判断
          let bound = el.getBoundingClientRect();
          let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          return bound.top <= clientHeight; 
         //想要提前加载的话可以加一段距离
         //return bound.top <= clientHeight + 200
        }
        loadImage(el, index) {
          el.src = el.getAttribute('data-src');
          // 避免重复判断，已经确定加载的图片应当从imglist移除
          this.list.splice(index, 1);
        }
        // 当浏览器滚动的时候，继续判断
        bindEvent() {
          window.addEventListener('scroll', () => {
            this.list.length && this.canILoad();
          });
        }
        init() {
          this.canILoad();
          this.bindEvent();
        }
       }
```
#### 调用
```js
//页面加载完毕后进行调用
var lazy = new LazyLoad('.lazyload')
//异步加载通过lazy.list访问懒加载类中的数组，在进行动态添加图片资源
//lazy.list.push(Array.from(document.querySelectorAll(img)))
```
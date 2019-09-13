### js常用算法

#### 冒泡排序
```js
var bubbleSort = arr=>{
    for(let i = 1,len = arr.length;i < len - 1; ++1){
        for(let j = 0;j <= len - i; ++j){
            if(arr[j] > arr[j + 1]){
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```
#### 快速排序（一）
```js
var qSort = arr=>{
    //声明并初始化左边的数组和右边的数组
    let left = [],right = [];
    //使用数组的第一个元素作为基准数据
    let base = arr[0];
    //当数组长度只有1或者为空时，直接返回数组，不需要排序
    if(arr.length<=1)return arr;
    //进行遍历
    for(let i = 1,len = arr.length;i < len; i++){
        if(arr[i]<=base)left.push(arr[i])//小于基准值，push到左边的数组
        else right.push(arr[i])//大于基准值，push到右边的数组
    }
    //递归合并数组
    return [...qSort(left),...[base],...qSort(right)];
}
```
#### 快速排序（二）
```js
var qSort = arr=>{
    var swap = (arr,i,j)=>{
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    var partition = (arr,left,right)=>{
        let index = left;
        let pivot = arrar[right];
        for(let i = left; i < right; i++){
             if(arr[i] < pivot){swap(arr,index,i);index++;}
        }
        swap(arr,right,index);
        return index
    }
    var sort = (arr,left,right)=>{
        if(left > right)return;
        let storeIndex = partition(arr,left,right);
        sort(arr,left,storeIndex-1);
        sort(arr,storeIndex+1,right);
    }
    sort(arr,0,,arr.length - 1);
    return arr;
}
```
#### 插入排序
```js
var insertionSort = arr=>{
    let n = arr.length;
    for(let i = 1; i < n; i++){
        //取下一个新元素，在已排序的元素序列中从后向前与新元素比较大小
        for(let j = i - 1; j >= 0; j--){
            if(arr[i] >= arr[j]){
                //若新元素arr[i]大于等于已排序的元素序列的arr[j],则arr[i]插入arr[j]的下一位置
                arr.splice(j + 1,0,arr.splice(i , 1)[0]);
                break;
            }else if (j === 0){
                //arr[j]比已排序序列的元素都要小，将它插入到序列最前面
                arr.splice(j,0,arr.splice(i,1)[0]);
            }
        }
    }
    return arr;
}
```
#### 二分法查找
```js
var binary_search = (arr,l,r,v)=>{
    if(l>r)return -1;
    let m = parseInt((l + r)/2);
    if(arr[m] === v)return m;
    else if(arr[m]<v)return binary_search(arr,m+1,r,v);
    else return binary_search(arr,l,m-1,v);
}
```

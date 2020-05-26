// 防抖 就是在用户操作频繁操作输入框时 结束输入之后才会出触发事件，(个人理解)

// 截流 每隔几分钟或多少秒 触发一次 


/**
 * wait 等待时间
 * immediate true 表立即执行，false 表非立即执行
 * */

// 防抖
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      }else {
        timeout = setTimeout(function () {
            func.apply(context, args)
        }, wait)
      }
  }
}
// 截流
/**
 * 有时间戳和定时器
 * func
 * wait 等待时间
 * type 1 是时间戳版本 2 是定时器版本
 * */
function throttle(func, wait, type) {
   let previous;
   let timeout;
   if (type===1) {
     previous=1
   } else if (type===2) {
    timeout=null
   } 
   return function() {
       let context = this; // 上下文
       let args = arguments; // 传过来的值
       if (type===1) {
          let now = Date.now();
          if (now-previous>wait) {
            func.apply(context,args);
            previous = now;
          }
       } else if (type===2) {
          if (!timeout) {
              timeout = setTimeout(()=>{
                timeout = null;
                func.apply(context,args);
              },wait)
          }
       }
   } 
}
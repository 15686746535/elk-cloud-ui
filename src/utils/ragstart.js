// 参数列表
var params = {
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  flag: false
}
// 获取相关CSS属性
var getCss = function(o, key) {
  // getComputedStyle是为了兼容FF浏览器
  return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
}

// 拖拽的实现
export function startDrag(desk, callback) {
  var target = document.getElementById('desktop-startDrag-' + desk)
  var apps = document.getElementById('desktop-' + desk)
  var disX = 0
  // 首先获取目标元素的left、top属性值
  if (getCss(target, 'left') !== 'auto') {
    params.left = getCss(target, 'left')
  }
  if (getCss(target, 'top') !== 'auto') {
    params.top = getCss(target, 'top')
  }

  target.onmousedown = function(event) {
    if (!event.toElement.getAttribute('app')) {
      // 当鼠标按下时表示元素可以移动，将标记设为true
      params.flag = true
    }
    target.style.zIndex = '50'
    /* 为了阻止拖动浏览器中元素时发生默认事件，
    例如拖动图片时会出现一个新窗口显示该图片，下面代码可以阻止这种事件发生
    */
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }

    var e = event
    params.currentX = e.clientX
    params.currentY = e.clientY
  }
  target.onmouseup = function() {
    // 当鼠标松开时将标记设为false，表示不可移动
    params.flag = false
    // 当鼠标松开时再次更新元素的位置
    if (desk === '1' && disX < -100) {
      callback('2')
    } else if (desk === '2' && disX > 100) {
      callback('1')
    }
    target.style.left = '0px'
    apps.style.left = '0px'
    target.style.zIndex = '20'
    disX = 0
  }
  target.onmousemove = function(event) {
    var e = event ? event : window.event
    /* 当params.flag==true时才可以移动，表明此时鼠标时按下状态
    */
    if (params.flag) {
      // 获取到当前鼠标的位置
      var nowX = e.clientX // , nowY = e.clientY
      // 获取当前鼠标移动的距离，即当前鼠标位置减去初始位置
      disX = nowX - params.currentX// , disY = nowY - params.currentY
      if (disX > 150) {
        disX = 150
      }
      if (disX < -150) {
        disX = -150
      }
      // 将元素的位置更新，parsenInt为了将属性值变为数字类型
      target.style.left = parseInt(params.left) + disX + 'px'
      apps.style.left = parseInt(params.left) + disX + 'px'
      // target.style.top = parseInt(params.top) + disY + 'px'
    }
  }
}

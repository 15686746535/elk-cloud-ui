
const clientsize = {
  width: document.documentElement.clientWidth || document.body.clientWidth,
  height: document.documentElement.clientHeight || document.body.clientHeight,
  getHeight(surplus) {
    return (document.documentElement.clientHeight - surplus || document.body.clientHeight - surplus)
  },
  getWidth(surplus) {
    return (document.documentElement.clientWidth - surplus || document.body.clientWidth - surplus)
  }
}

export default clientsize

//
// /* 网页正文全文宽 */
// document.documentElement.scrollWidth || document.body.scrollWidth
// /* 网页正文全文高 */
// document.documentElement.scrollHeight || document.body.scrollHeight
// /* 网页可见区域宽，不包括工具栏和滚动条（浏览器窗口可视区域大小） */
// document.documentElement.clientWidth || document.body.clientWidth
// /* 网页可见区域高，不包括工具栏和滚动条（浏览器窗口可视区域大小） */
// document.documentElement.clientHeight || document.body.clientHeight
// /* 网页可见区域宽，包括滚动条等边线（会随窗口的显示大小改变）  offsetWidth = scrollWidth + 左右滚动条 +左右边框；*/
// document.documentElement.offsetWidth || document.body.offsetWidth
// /* 网页可见区域高，包括滚动条等边线（会随窗口的显示大小改变） offsetHeight = scrollHeight + 上下滚动条 + 上下边框；*/
// document.documentElement.offsetHeight || document.body.offsetHeight


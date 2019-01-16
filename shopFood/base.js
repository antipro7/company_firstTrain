function offset (element) {
  var offest = {
    top: 0,
    left: 0
  };
  var _position;
  getOffset(element, true);
  return offest;

  // 递归获取 offset, 可以考虑使用 getBoundingClientRect
  function getOffset(node, init) {
    // 非Element 终止递归
    if (node.nodeType !== 1) {
      return;
    }
    _position = window.getComputedStyle(node)['position'];
    // position=static: 继续递归父节点
    if (typeof(init) === 'undefined' && _position === 'static') {
      getOffset(node.parentNode);
      return;
    }
    offest.top = node.offsetTop + offest.top - node.scrollTop;
    offest.left = node.offsetLeft + offest.left - node.scrollLeft;
    // position = fixed: 获取值后退出递归
    if (_position === 'fixed') {
      return;
    }
    getOffset(node.parentNode);
  }
}

function hasClass(elements,cName){ 
  return elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); 
}; 
function addClass (elements,cName){ 
  if(!hasClass(elements,cName)){ 
    elements.className += " " + cName; 
  };
}; 
function removeClass (elements,cName){ 
  if(hasClass(elements,cName)){ 
    elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)" ), " ");
  }; 
};

function siblings (o) {
  let arr = [] ; //保存兄弟节点
  let prev = o.previousSibling; //o的前一个同胞节点
  //先往上查询兄弟节点
  while(prev){
      if(prev.nodeType == 1&&prev.tagName == o.tagName){
          arr.unshift(prev);//数组头部插入数组，保证节点顺序
      }
      prev = prev.previousSibling;//把上一节点赋值给prev
  }
  //往下查询兄弟节点
  let next = o.nextSibling;//o的后一个同胞节点
  while(next){
      if(next.nodeType == 1 &&next.tagName == o.tagName){
          arr.push(next);//数组尾部插入，保证节点顺序
      }
      next = next.nextSibling;//下一节点赋值给next，用于循环
  }
  return arr;
}
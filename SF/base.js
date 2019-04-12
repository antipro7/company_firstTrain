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

// function hasClass(elements,cName){ 
//   if(elements){
//     return elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); 
//   }
// }; 
// function classInstall(elements,cName){
//   if(!hasClass(elements,cName)){ 
//     elements.className += " " + cName; 
//   }else{
//     elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)" ), " ");
//   }
// }
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

// function adjustClass (elements,cName){ 
//   if(!hasClass(elements,cName)){ 
//     elements.className += " " + cName; 
//   }else if (hasClass(elements,cName)){
//     elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)" ), " ");
//   }
// }; 


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

// function install(num1,num2, type){
//   var precision;// 精度
//   var baseNum1 = num1.toString().split(".")[1].length ? num1.toString().split(".")[1].length : 0
//   var baseNum2 = num2.toString().split(".")[1].length ? num1.toString().split(".")[1].length : 0
//   var baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
//   if(type === 'add'){
//     return (num1 * baseNum + num2 * baseNum) / baseNum;
//   }else{
//     precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
//     return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
//   }
// }

/*
加法运算，避免数据相加小数点后产生多位数和计算精度损失。param num1加数1 | num2加数2
  */
window.Add = function(num1, num2) {
  var baseNum, baseNum1, baseNum2;
  try {
      baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
      baseNum1 = 0;
  }
  try {
      baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
      baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/*
减法运算，避免数据相减小数点后产生多位数和计算精度损失。param num1被减数  |  num2减数
*/
window.Minus = function(num1, num2) {
  var baseNum, baseNum1, baseNum2;
  var precision;// 精度
  try {
      baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
      baseNum1 = 0;
  }
  try {
      baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
      baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};
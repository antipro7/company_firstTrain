var foodData = [
  {
      "type":"热销",
      data: [
        {"name": "二块奥尔良烤翅","price": "12.5"},
        {"name": "二块香辣鸡翅","price": "11"},
        {"name": "新奥尔良烤鸡腿堡","price": "18.5"},
        {"name": "香辣鸡腿堡","price": "18"},
      ]
  },
  {
      "type":"汉堡",
      data: [
        {"name": "香辣鸡腿堡","price": "18"},
        {"name": "新奥尔良烤鸡腿堡","price": "18.5"},
        {"name": "劲脆鸡腿堡","price": "18"},
        {"name": "老北京鸡肉卷","price": "16"},
      ]
  },
  {
      "type":"鸡翅",
      data: [
        {"name": "四块香辣鸡翅","price": "22"},
        {"name": "十块香辣鸡翅","price": "46"},
        {"name": "十块新奥尔良烤翅","price": "50"},
        {"name": "二块新奥尔良烤翅","price": "12"},
      ]
  },
  {
      "type":"小食",
      data: [
        {"name": "劲爆鸡米花（小）","price": "11"},
        {"name": "劲爆鸡米花（大）","price": "13.5"},
        {"name": "醇香土豆泥","price": "6"},
      ]
  },
  {
      "type":"饮料",
      data: [
        {"name": "香醇奶茶","price": "9.5"},
        {"name": "红豆酒酿饮","price": "11"},
        {"name": "热柠檬红茶","price": "11"},
        {"name": "九珍果汁饮料","price": "11"},
        {"name":"1.25升装百事可乐","price":"14"}
      ]
  },
  {
      "type":"甜品",
      data: [
        {"name": "葡式蛋挞2只装","price": "15"},
        {"name": "葡式蛋挞6只装","price": "37"},
        {"name": "红豆派","price": "6.5"},
        {"name": "冰激凌","price": "6"},
        {"name": "蛋挞","price": "4.5"},
        {"name": "4只装蛋挞","price": "15"},
      ]
  },
];

function init () {
  //定义变量
  var foodType = document.getElementById("foodType");
  var foodList = document.getElementById("foodList");
  var length = foodData.length;

  //左下角购物区域
  var sumIcon = document.getElementById('sum-icon');
  var iconCount = Number(sumIcon.innerHTML);
  var sumMoney = document.getElementById('sum-money');
  var numberCount = Number(sumMoney.innerHTML);

  var arrOffsetTop = [];//右栏向上滚动距离数组
  var rightOuter = document.getElementById('rightOuter'); //选中右栏
  var fragment1 = document.createDocumentFragment();//右栏内容Fragment
  var fragment2 = document.createDocumentFragment();//左栏内容Fragment

  for(var i = 0;i < length;i++) {
    //添加左侧食物类型
    var type = foodData[i].type;
    var liType = document.createElement('li');
    liType.innerHTML = type;

    liType.setAttribute("index",i);
    liType.setAttribute("onclick","move(this)");
    fragment2.appendChild(liType);
    if(i===0){
      liType.setAttribute("class","active");
    }
  }
  foodType.appendChild(fragment2);

  for (let i = 0;i < length;i++) {
    //添加右侧主栏食物详情信息,一定要在两次for循环里创建Element
    var dataLength = foodData[i].data.length;

    for (let j=0; j<dataLength; j++){
      var li = document.createElement('li');
      li.innerHTML = "<img src='img/foodImg.png'>" + 
      "<p class='intro'>" + foodData[i].data[j].name + "</p>" + 
      "<p class='price'>" + foodData[i].data[j].price + "</p>" +
      "<div class='plus-minus'>" + 
      "<div id=" + "minus" + i + j +">"+"</div>" + 
      "<span id=" + "content" + i + j + ">"+"</span>" +
      "<div id=" + "plus" + i + j + ">"+"</div>" + 
      "</div>";
      li.setAttribute("typeindex",i); 
      fragment1.appendChild(li);
    } 
  }
  foodList.appendChild(fragment1);
  //为每一列表加减绑定事件
  for (let i = 0;i < length;i++) {
    var dataLength = foodData[i].data.length;
    for (let j=0; j<dataLength; j++){
      document.querySelector("[id='minus"+i+j+"']").setAttribute("onclick","PlusMinus(this)");
      document.querySelector("[id='plus"+i+j+"']").setAttribute("onclick","PlusMinus(this)");
    } 
  }
  
  var indexCount = document.querySelectorAll("[typeindex]").length;
  var maxIndex = parseInt(document.querySelectorAll("[typeindex]")[indexCount-1].getAttribute('typeindex'));

  for (let i=0;i<maxIndex+1;i++){
    arrOffsetTop.push(offset(document.querySelector("[typeindex='"+i+"']")).top);
  }

  var liHeight = document.querySelector('li[typeindex]').offsetHeight;  //获取每个li的高度

  //实现 点击左侧菜单栏，右侧食物栏滚动
  window.move = function(obj) {
    var topBar_height = document.querySelector('.top-bar');
    var local_height = document.querySelector('.location-bar');

    //向上滚动是默认情况会滚到屏幕最上沿，要去掉上面两栏的高度scrollHeight
    var scrollHeight = arrOffsetTop[obj.getAttribute("index")]-topBar_height.offsetHeight-local_height.offsetHeight;
    obj.setAttribute('class','active');

    //禁止  点击左栏使右栏滚动，又引起的active类循环显示问题
    // rightOuter.removeEventListener('scroll',scrollFn);

    //去掉其他标签的active
    var otherLi = siblings(obj);
    for (var j=0;j<otherLi.length;j++){
      removeClass(otherLi[j],'active');
    }
    
    //滚动样式
    rightOuter.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    })
  }

  //添加右栏滚动事件监听器
  rightOuter.addEventListener('scroll',scrollFn);
  function scrollFn() {
    for(var i=0;i<document.querySelectorAll('li[typeindex]').length;i++){
      if(rightOuter.scrollTop > Minus(arrOffsetTop[i],liHeight)) {
        var targetLi = document.querySelector('li[index="'+i+'"]');
        addClass(targetLi,'active');
        var otherLi = siblings(targetLi);
        for (var j=0;j<otherLi.length;j++){
          removeClass(otherLi[j],'active');
        }
      }
    }
  }
  //最后一类型如果数据过少，点击不会出现active类

  window.PlusMinus = function(obj) {
    if(obj.id.substring(0,4)==="plus") {
      plusNumber(obj);
    }else if (obj.id.substring(0,5)==="minus"){
      minusNumber(obj);
    }
    //点击增加(+)按钮
    function plusNumber(obj) {
      var i = obj.id.substring(4,5);
      var j = obj.id.substring(5,6);
      var content = document.getElementById('content'+ i+j);
      var value = content.innerHTML;
      var price = foodData[i].data[j].price;
        
      if (!value || value == 0) {
        content.innerHTML = 1;
        document.getElementById('minus'+ i+j).style.display = "block";
      }else {
        content.innerHTML ++; 
      }
      numberCount = Add(numberCount,price);
      sumMoney.innerHTML = numberCount;
      iconCount ++;
      sumIcon.innerHTML = iconCount;
      sumIcon.style.display = "block";
    }

    //点击减少(-)按钮.
    function minusNumber(obj) {
      var i = obj.id.substring(5,6);
      var j = obj.id.substring(6,7);
      var content = document.getElementById('content'+ i+j);
      var price = foodData[i].data[j].price;
  
      content.innerHTML --;
      numberCount = Minus(numberCount,price);
      sumMoney.innerHTML = numberCount;
      iconCount --;
      sumIcon.innerHTML = iconCount;
      if (content.innerHTML == 0){
        document.getElementById('minus'+i+j).style.display = "none";
        content.innerHTML = "";
      }
      if (iconCount === 0) {
        sumIcon.innerHTML = "";
      }
    }
  }
}

init();
/**三个页面的打开/关闭 */
var pageLocation = document.getElementById('pageLocation');
function openLocation () {
  pageLocation.style.display = 'block';
}
var shadePage = document.getElementById('shade');
shadePage.onclick = function () {
  pageLocation.style.display = 'none';
}

var pagePaixu = document.getElementById('pagePaixu');
function openPaixu () {
  pagePaixu.style.display = 'block';
}
var shadePaixuPage = document.getElementById('shadePaixu');
shadePaixuPage.onclick = function () {
  pagePaixu.style.display = 'none';
}

var pageShaixuan = document.getElementById('pageShaixuan');
function openShaixuan () {
  pageShaixuan.style.display = 'block';
}
var shadeShaixuan = document.getElementById('shadeShaixuan');
shadeShaixuan.onclick = function () {
  pageShaixuan.style.display = 'none';
}

var locationJson = [
  {
    "region":"湖里区",
    "place":["软件园2期观日路66号","高林居住区","高崎机场"]
  },
  {
    "region":"集美区",
    "place":["石鼓路7号","集美大道668号","嘉庚体育馆"]
  },
  {
    "region":"思明区",
    "place":["沙坡尾文化艺术街","厦门大学思明校区","中山路步行街"]
  },
  {
    "region":"同安区",
    "place":["方特梦幻王国","乐海城市广场","禹洲大学城"]
  },
  {
    "region":"海沧区",
    "place":["阿罗海城市广场","SEC泰地海西中心"]
  },
  {
    "region":"翔安区",
    "place":["火炬翔安产业园"]
  }
];

var contentList = document.getElementById('region-list');
var placeList = document.getElementById('place-list');
var length = locationJson.length;
var fragment1 = document.createDocumentFragment();//左栏fragment
var fragment2 = document.createDocumentFragment();//右栏fragment
//右栏变量
var place = locationJson[0].place;
var l = place.length;

//载入左栏区域列表内容
for (let i = 0;i < length;i++) {
  let region = locationJson[i].region;

  var span = document.createElement("span");
  span.innerHTML = region;
  span.setAttribute("id","li"+[i]);
  fragment1.appendChild(span);
}
contentList.appendChild(fragment1);

//添加右栏具体地址,首次只加载第一个区
//将每条地址插入列表
for (var j = 0;j<l;j++){
  var placeItem = place[j];
  var p = document.createElement("p");
  p.innerHTML = placeItem;
  fragment2.appendChild(p);
}
placeList.appendChild(fragment2);

//当点击左栏列表 新地区时清空列表内容，载入新列表的数据
for (let k =0;k<length;k++){
  var a = document.getElementById("li"+[k]);
  a.onclick = function () {
    openDiv(k);
  }
}

function openDiv (obj) {
  placeList.innerHTML = "";
  var place = locationJson[obj].place;
  var l = place.length;
  var f = document.createDocumentFragment();
  for (var j = 0;j<l;j++){
    var placeItem = place[j];
    var p = document.createElement("p");
    p.innerHTML = placeItem;
    f.appendChild(p);
  }
  placeList.appendChild(f);
}


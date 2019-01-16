/**JSON数据 */
var Json = [
    {
        "name":"鼎丰财富中心店",
        "address":"湖里区高林中路503号鼎丰财富中心一层",
        "distance":"3.6km",
    },
    {
        "name":"海西金融中心店",
        "address":"湖里区东皇路213号海西金融广场",
        "distance":"641m",
    },
    {
        "name":"观音山店",
        "address":"思明区塔普东路",
        "distance":"1.6km",
    },
    {
        "name":"厦门软件园二期",
        "address":"思明区观日路40号楼一层大堂",
        "distance":"2.6km",
    },
    {
        "name":"湾悦城",
        "address":"湖里区钟宅西路日圆二里",
        "distance":"3.0km",
    },
]

/**声明变量 */
var local = document.querySelector(".local");
var shade = document.querySelector("#shade");
var pageLocation = document.getElementById('pageLocation');
var listItem = document.querySelector("#listItem");
var length = Json.length;
var fragment = document.createDocumentFragment();

local.onclick = function () {
    pageLocation.style.display = 'block';
}
shade.onclick = function () {
    pageLocation.style.display = 'none';
}

/**遍历每个li，添加数据 */
for (var i = 0;i < length;i++) {
  var name = Json[i].name;
  var address = Json[i].address;
  var distance = Json[i].distance;

  /**添加每个li的内容，用innerHTML最方便，不用appendChild一个个添加 */
  var list = document.createElement('li');
  list.innerHTML = '<span class="name">' + name + '</span>' + '<span class="address">' + address + '</span>' + '<span class="distance">' + distance + '</span>';

  fragment.appendChild(list);
}
listItem.appendChild(fragment);
























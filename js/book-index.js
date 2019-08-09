var url = "http://127.0.0.1:3000"; //服务器请求地址

window.onload = function () {


    //--------------------------------------分类接口----------------------------------
    var cUrl = `${url}/type`;
    fetch(cUrl).then(data => data.json()).then(res => {
        var arr = res.data;
        var oUl = document.createElement('ul');
        arr.forEach(item => {
            oUl.appendChild(showData(item)); //调用创建ol函数
        });
        var bookClass = document.querySelector(".bookClassify")
        bookClass.appendChild(oUl);
    })

    // --------------------------------列表书籍接口-----------------------------------
    var lUrl = `${url}/list?cid=242`;
    fetch(lUrl).then(data => data.json()).then(res => {
        var resArr = res.data;
        console.log(resArr); //result数组
        contentTags(resArr); //调用创建内容标签函数
        // 判断用户是否登录；-------------------------------------------cookie
        var cook = document.cookie;
        var aHref = document.getElementsByTagName('a');
        var bHref = document.querySelectorAll('.p_con');
        console.log(aHref)
        if (cook.indexOf('username') === -1) {
            stopClick(aHref); //----------------------------------------如果用户没有登录提醒
            stopClick(bHref);
        }
    })



} 
//调用span下a标签的点击事件,分类对应书籍信息------------------------------------------------------------------------------------------

function showID(cid) {
    let ourl = `${url}/list?cid=${cid}`;
    console.log(ourl)
    fetch(ourl).then(data => data.json()).then(data => {
        var pUl = document.getElementById('p_ul');
        pUl.innerHTML = '';
        console.log(data.data)
        contentTags(data.data); //调用创建内容标签函数
    })
}

//内容标签创建
function contentTags(conArr) {
    for (var i in conArr) {
        // console.log(conArr[i]);//书籍信息
        var crr = conArr[i].online.split(" "); //把书籍对应的网址超链接字符串转换成数组crr
        var online; //定义最终超链接
        crr.forEach(function (item) { //遍历数组crr查找属于当当网的超链接
            if (item.includes('当当')) { //如果此数组项里的字符串含有“当当”，则进行截取
                online = item.substring(item.indexOf(":") + 1); //将截取后的数据进行赋值
            }
        });

        var p_li = document.createElement('li'); //创建li,并且制定内容
        p_li.innerHTML = `
            <div class="p_img">
                <a href="${online}" target="_blank">
                    <img src="${conArr[i].img}" alt="${conArr[i].sub1}">
                </a>
                <a href="${online}"><span class="title">《${conArr[i].title}》</span></a>
            <div class="p_con">
                <div class="p_catalog"><span>分类：</span>${conArr[i].catalog}</div>
                <div class="p_tags"><span>标签：</span>${conArr[i].tags}</div>
                <div class="p_sub2"><span>简介：</span>${conArr[i].sub2}</div>
                <div class="p_car"><a href="">加入购物车</a></div>
                <div class="p_collect"><a href="">收藏</a></div>
                <div class="p_reading">${conArr[i].reading}</div>
                <div class="p_bytime"><span>出版时间：</span> ${conArr[i].bytime}</div>
            </div> 
            </div>`;
        document.querySelector("#p_ul").appendChild(p_li);
    }
};

//创建ol
function showData(msg) {
    var ol = document.createElement('ol');
    ol.innerHTML =
        `<span class='menu'><a href="javascript:void(0);" onclick="showID(${msg.id})" cid='${msg.id}' >${msg.catalog}</a></span>`;
    return ol;
}






function stopClick(aHref) {

    //给所有a标签添加阻止默认事件
    var mask = document.getElementsByClassName("mask")[0];
    var popWindow = document.getElementsByClassName("popWindow")[0];
    for (var i in aHref) {
        aHref[i].onclick = function (e) {
            e.preventDefault();
            // alert('请先登录');
            //弹出遮罩成
            mask.style.left = "0px";
            popWindow.style.left = "50%";
            //给body添加样式，阻止页面滚动
            document.querySelector('body').className = 'notScroll';
        }
    }
    //点击btn，关闭遮罩成
    document.getElementById("okBtn").onclick = closeWindow;

    //topbar中的登录注册按钮也是一个a标签
    var logA = document.getElementById('log');
    logA.onclick = function () {
        // 强行跳转登录注册页面
        window.location.href = './membe.html';
    }
}

// 关闭遮罩
function closeWindow() {
    var mask = document.getElementsByClassName("mask")[0];
    var popWindow = document.getElementsByClassName("popWindow")[0];

    mask.style.left = "-120%";
    popWindow.style.left = "-200%";
    document.querySelector('body').className = '';

}
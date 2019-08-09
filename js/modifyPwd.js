window.onload = function () {
    //用户名
    let txtName = document.querySelector('#username');

    //手机号
    let txtPhone = document.querySelector('#userPhone');

    //新密码
    let txtPwd = document.querySelector('#userPassword');

    let url = "http://localhost:3000"; //服务器地址
    //验证
    document.querySelector('#v_btn ').onclick = function () {
        // 用户名校验
        checkUsername();
        //手机号校验
        checkPhone();
        if (fusername && fphone) {
            modify(); //--------------------------------------调用验证函数---------------------------------------------
            return true;
        }
        return false;
    };
    //新密码
    document.querySelector('#sig_btn').onclick = function () {

        if (fpwd) {
            newPwd(); //--------------------------------------调用新密码函数---------------------------------------------
            return true;
        }
        return false;
    };
    //------------------------------------------验证-------------------------------
    function modify() {
        let username = txtName.value.trim(); //取值，并且去除首尾空格
        let phone = txtPhone.value.trim();
        let postData = {
            username: username,
            phone: phone
        }
        //post方式提交，参数应该拼接到URL之后
        let myUrl = `${url}/modify`;
        fetch(myUrl, {
            method: 'POST',
            body: JSON.stringify(postData),
            mode: 'cors',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then(data => data.json()).then(res => {
            console.log(res);
            var msg = res.msg
            if (res.code == 600) {
                hint(msg);
                disInt();
            }else{
                hint(msg)
            }
        });
    }

    //------------------------------------------新密码-------------------------------
    function newPwd() {
        let username = txtName.value.trim(); //取值，并且去除首尾空格
        let newPwd = txtPwd.value.trim();
        let postData = {
            username: username,
            pwd: newPwd
        }
        //post方式提交，参数应该拼接到URL之后
        let myUrl = `${url}/modify/newPwd`;
        fetch(myUrl, {
            method: 'POST',
            body: JSON.stringify(postData),
            mode: 'cors',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then(data => data.json()).then(res => {
            console.log(res);
            var msg = res.msg;
            if(res.code==603){
                hint(msg);
                setTimeout(skip,3000);
            }else{
                hint(msg);
            }
        });
    }

    //解除禁用新密码input框
    function disInt() {
        $(function () {
            $('#userPassword').removeAttr('disabled').focus();
        })
    }

    //响应用户提示信息
    function hint(msg) {
        $(function () {
            $('.error').fadeIn(1000).text(msg);
            $('.error').fadeOut(3000);
        })
    }

    //2秒执行函数跳转页面
    function skip() {
        window.location.href = "./membe.html";
    }

    //--------------------------------------校验----------------------------
    var otips = document.getElementsByClassName("error_tip"); //所有错误
    //注册
    var ousername = document.getElementById("username");
    var ophone = document.getElementById("userPhone");
    var opwd = document.getElementById("userPassword");

    // 设置记录是否正确的变量
    var fusername = false;
    var fphone = false;
    var fpwd = false;

    // 校验用户名
    ousername.onblur = checkUsername;

    //校验手机号
    ophone.onblur = checkPhone;

    //校验密码
    opwd.onblur = checkPwd;

    // 校验注册用户名
    function checkUsername() {
        if (ousername.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[0].innerHTML = "用户名不能为空";
            otips[0].style.display = "block";
            fusername = false;
        } else if (!isValid(ousername.value)) { // 说明内容不正确
            otips[0].innerHTML = "内容不正确有非法字符";
            otips[0].style.display = "block";
            fusername = false;
        } else {
            otips[0].innerHTML = "";
            otips[0].style.display = "none";
            fusername = true;
        }
    }

    //注册手机号校验
    function checkPhone() {
        if (ophone.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[1].innerHTML = "手机号不能为空";
            otips[1].style.display = "block";
            fusername = false;
        } else if (ophone.value.length < 6) { // 说明长度不够
            otips[1].innerHTML = "手机号长度不够";
            otips[1].style.display = "block";
            fusername = false;
        } else {
            otips[1].innerHTML = "";
            otips[1].style.display = "none";
            fphone = true;
        }
    }

    //注册校验密码
    function checkPwd() {
        if (opwd.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[2].innerHTML = "密码不能为空";
            otips[2].style.display = "block";
            fusername = false;
        } else if (opwd.value.length < 6) { // 说明长度不够
            otips[2].innerHTML = "密码长度不够";
            otips[2].style.display = "block";
            fusername = false;
        } else {
            otips[2].innerHTML = "";
            otips[2].style.display = "none";
            fpwd = true;
        }
    }
    
}

function isValid(s) {
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c >= '0' && c <= '9') {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
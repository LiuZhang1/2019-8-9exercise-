window.onload = verify;

function verify() {
    // -----------------------------------------------------------注册-----------------------------------------
    //用户名
    let txtName = document.querySelector('#username');
    // 密码
    let txtPwd = document.querySelector('#userPassword');
    //手机号
    let txtPhone = document.querySelector('#userPhone');
    // 邮箱
    let txtEmail = document.querySelector('#userEmail');
    // 性别
    let txtGender = document.getElementsByName('userGender');
    let url = "http://localhost:3000"; //服务器地址
    //点击注册按钮
    document.querySelector('#login_btn').onclick = function () {
        // 用户名校验
        checkUsername();
        // 密码校验
        checkPwd();
        //手机号校验
        checkPhone();
        //邮箱校验
        checkEmail();
        // console.log(fusername,fpwd)
        if (fusername && fpwd && fphone && femail) {
            register(); //--------------------------------------调用注册函数---------------------------------------------
            return true;
        }
        return false;
    };
    // -----------------------------------------------------------注册结束-----------------------------------------


    // -----------------------------------------------------------登录-----------------------------------------
    //找元素
    //用户名
    let L_txtName = document.querySelector('.L_username');
    // 密码
    let L_txtPwd = document.querySelector('.L_userPassword');

    let L_url = "http://localhost:3000"; //服务器地址
    
    document.querySelector('#sig_btn').onclick = function () {
        // 用户名校验
        checkLUsername()
        // 密码校验
        checkLPwd();
        if (fusername && fpwd) {
            login(); //------------------------------调用登录函数----------------------------------------------
            return true;
        }
        return false;
    };
    // -----------------------------------------------------------登录结束-----------------------------------------

    //--------------------------------------封装注册fetch---------------------------
    function register() {
        let username = txtName.value.trim(); //取值，并且去除首尾空格
        let pwd = txtPwd.value.trim();
        let phone = txtPhone.value.trim();
        let email = txtEmail.value.trim();
        let sex;
        for (i = 0; i < txtGender.length; i++) {
            if (txtGender[i].checked === true) {
                sex = txtGender[i].value;
            }
        }
        let postData = {
            username: username,
            pwd: pwd,
            phone: phone,
            email: email,
            sex: sex
        }
        //post方式提交，参数应该拼接到URL之后
        let myUrl = `${url}/register`;
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
            if (res.code == '100') {
                // window.location.href = "./membe.html";
                hint(msg);
                logClick(); //调用注册成功后的函数
                RclearVul();//清空输入框的值
            }
            if (res.code == '102') {
                // alert('系统出错，注册失败')
                hint(msg);
            }
            if (res.code == '101') {
                // alert('用户名已存在，注册失败')
                hint(msg);
                RclearVul();
            }
        });
    }

    //--------------------------------------封装登录fetch---------------------------
    function login() {
        let username = L_txtName.value.trim(); //取值，并且去除首尾空格
        let pwd = L_txtPwd.value.trim();

        let L_postData = {
            username: username,
            pwd: pwd,
        }

        //post方式提交，参数应该拼接到URL之后
        let L_myUrl = `${L_url}/login`;

        fetch(L_myUrl, {
            method: 'POST',
            body: JSON.stringify(L_postData),
            mode: 'cors',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then(data => data.json()).then(res => {
            // console.log(res);
            var msg = res.msg;
            if (res.code == '200') {
                // 将用户信 息写入cookie
                document.cookie = `username=${username}`;
                hint(msg);
                setTimeout(skip, 3000);
            } else {
                // alert('登录失败！！！')
                hint(msg); //响应用户提示框
                // logClick();
                LclearVul();
            }
        });
    }
    //2秒执行函数跳转页面
    function skip() {
        window.location.href = "./book-index.html";
    }

    //响应用户提示框
    function hint(msg) {
        $(function(){
            $('.error').fadeIn(1000).text(msg);  
            $('.error').fadeOut(3000);  
        })
    }

    //登录失败点击注册
    function regClick() {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }

    //注册成功点击登录
    function logClick() {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }

    //清空注册输入框的值
    function RclearVul() {
        txtName.value = '';
        txtPwd.value = '';
        txtPhone.value = '';
        txtEmail.value = '';
        txtName.focus(); //聚焦
    }

    //清空登录输入框的值
    function LclearVul() {
        L_txtName.value = '';
        L_txtPwd.value = '';
        L_txtName.focus(); //聚焦
    }

    var otips = document.getElementsByClassName("error_tip"); //所有错误
    //注册
    var ousername = document.getElementById("username");
    var opwd = document.getElementById("userPassword");
    var ophone = document.getElementById("userPhone");
    var oemail = document.getElementById("userEmail");

    //登录
    var Lusername = document.querySelector('.L_username')
    var Lpwd = document.querySelector('.L_userPassword')

    // 设置记录是否正确的变量
    var fusername = false;
    var fpwd = false;
    var fphone = false;
    var femail = false;

    // 校验用户名
    ousername.onblur = checkUsername;
    Lusername.onblur = checkLUsername;
    // 校验密码
    opwd.onblur = checkPwd;
    Lpwd.onblur = checkLPwd;
    //校验手机号
    ophone.onblur = checkPhone;
    // 校验邮箱 
    oemail.onblur = checkEmail;

    // 校验注册用户名
    function checkUsername() {
        if (ousername.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[2].innerHTML = "用户名不能为空";
            otips[2].style.display = "block";
            fusername = false;
        } else if (!isValid(ousername.value)) { // 说明内容不正确
            otips[2].innerHTML = "内容不正确有非法字符";
            otips[2].style.display = "block";
            fusername = false;
        } else {
            otips[2].innerHTML = "";
            otips[2].style.display = "none";
            fusername = true;
        }
    }

    //注册校验密码
    function checkPwd() {
        if (opwd.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[3].innerHTML = "密码不能为空";
            otips[3].style.display = "block";
            fusername = false;
        } else if (opwd.value.length < 6) { // 说明长度不够
            otips[3].innerHTML = "密码长度不够";
            otips[3].style.display = "block";
            fusername = false;
        } else {
            otips[3].innerHTML = "";
            otips[3].style.display = "none";
            fpwd = true;
        }
    }

    //注册手机号校验
    function checkPhone() {
        if (ophone.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[4].innerHTML = "手机号不能为空";
            otips[4].style.display = "block";
            fusername = false;
        } else if (ophone.value.length < 6) { // 说明长度不够
            otips[4].innerHTML = "手机号长度不够";
            otips[4].style.display = "block";
            fusername = false;
        } else {
            otips[4].innerHTML = "";
            otips[4].style.display = "none";
            fphone = true;
        }
    }

    //注册邮箱校验
    function checkEmail() {
        if (oemail.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[5].innerHTML = "邮箱不能为空";
            otips[5].style.display = "block";
            fusername = false;
        } else if (!isEmail(oemail.value)) { // 说明格式不正确
            otips[5].innerHTML = "格式不正确";
            otips[5].style.display = "block";
            fusername = false;
        } else {
            otips[5].innerHTML = "";
            otips[5].style.display = "none";
            femail = true;
        }
    }

    // 校验登录用户名
    function checkLUsername() {
        if (Lusername.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[0].innerHTML = "用户名不能为空";
            otips[0].style.display = "block";
            fusername = false;
        } else if (!isValid(Lusername.value)) { // 说明内容不正确
            otips[0].innerHTML = "内容不正确有非法字符";
            otips[0].style.display = "block";
            fusername = false;
        } else {
            otips[0].innerHTML = "";
            otips[0].style.display = "none";
            fusername = true;
        }
    }

    // 校验登录密码
    function checkLPwd() {
        if (Lpwd.value === '') { // 未输入任何内空
            // 提示错误信息
            otips[1].innerHTML = "密码不能为空";
            otips[1].style.display = "block";
            fusername = false;
        } else if (Lpwd.value.length < 6) { // 说明长度不够
            otips[1].innerHTML = "密码长度不够";
            otips[1].style.display = "block";
            fusername = false;
        } else {
            otips[1].innerHTML = "";
            otips[1].style.display = "none";
            fpwd = true;
        }
    }

}

// 工具函数
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

function isEmail(e) {
    return e.indexOf(".") !== -1 && e.indexOf("@") !== -1
}
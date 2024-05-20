function log_in_send() {
    var uname = document.getElementById('username').value;
    var psd = document.getElementById('password').value;

    var msg = info_check(uname, psd, psd);
    if (msg != 'true') {
        alert(msg);
    } else {
        // if success, send ajax request to the back end
        const data = { // construct the json data
            "request": "login",
            "username": uname,
            "password": encryptPassword(psd)
        };

        $.ajax({
            type:"POST",
            url:"../php/entry_backend.php", // the corresponding back-end script
            data: data,
            async:true,
            dataType:"json",
            success:function(res) {  // if get the return successfully
                console.log(res);
                if (res['status'] != 0) {
                    alert(res['msg']);
                } else {
                    alert("登录成功, 正在重定向...");
                    window.location.replace('../index.php');
                }
            },
            error:function(res) { // if failed
                console.log(res);
                var str_array = res['responseText'].split('\n');
                var msg_json = $.parseJSON(str_array[str_array.length - 1]);
                alert(msg_json['msg']);
            }
        })
    }

}


function sign_up_send() {
    // get the value in inputbox
    var uname = document.getElementById('username').value;
    var psd = document.getElementById('password1').value;
    var re_psd = document.getElementById('password2').value;

    var msg = info_check(uname, psd, re_psd);
    
    if (msg != 'true') {
        alert(msg);
    } else {
        // if success, send ajax request to the back end
        const data = { // construct the json data
            "request": "signup",
            "username": uname,
            "password": encryptPassword(psd)
        };

        $.ajax({
            type:"POST",
            url:"../php/entry_backend.php", // the corresponding back-end script
            data: data,
            async:true,
            dataType:"json",
            success:function(res) {  // if get the return successfully
                console.log(res);
                if (res['status'] != 0) {
                    alert(res['msg']);
                } else {
                    alert("注册成功, 正在重定向...");
                    window.location.replace('../index.php');
                }
            },
            error:function(res) { // if failed
                console.log(res);
                var str_array = res['responseText'].split('\n');
                var msg_json = $.parseJSON(str_array[str_array.length - 1]);
                alert(msg_json['msg']);
            }
        })
    }
}

function info_check(uname, psd, re_psd) {
    var patt=/^\w{2,16}$/;
    var msg="true";
    
    if (uname === "") { // check the username
        msg = "用户名不能为空";
    } else if (uname.length < 2 || uname.length > 16) {
        msg = "用户名长度应该在2~16之间";
    } else if (!patt.test(uname)) {
        msg = "用户名应该仅由字母、数字、下划线组成";
    } else { // check username finished
        // check the password
        if (psd === "") {
            msg = '密码不能为空!';
        } else if (psd.length < 6 || psd.length > 16) {
            msg = '密码长度应该在6~16之间';
        } else { //check the password finished
            // check the re-password
            if (re_psd === "") {
                msg = '请重复输入密码!';
            } else if (!(psd === re_psd)) {
                msg = '两次输入的密码不相同!';
            }
        }
    }

    return msg;
}

function encryptPassword(password) {
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA63YuVyfywbFxetYN0O2i
hy69PiWnmeBfCKfYaSmrBqXFR3BmppwNHZfnXEpFuEOuXOPzjSf2cXrYRZ/wfrgJ
KtnJnF0PEmt8bYnSikkp2gPnoWJSe83maL/2QgDVO7Q/6lNNvSfrfFBjBCZluMWP
P9JGDmZkwZBu7hMlPU8XEO7LRthC1baSMR6pRTifxS7IJTuRd4PwkE1fpVv8aSZp
UN/+tvfTBokCZJ90+qVBBKR6LkS/jXwK2NU/tlcaQ+chHn0atrEOkybzbkAMMnBw
EpqgGvZregsKIPM7I84Y3KI2lbRXDmbmNNsj5nmWVfcJWb45DjkAfl5EY0s6COBD
RwIDAQAB
-----END PUBLIC KEY-----
`;
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(password);
}


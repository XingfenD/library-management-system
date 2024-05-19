function info_send() {
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
            "username": uname
        };

        $.ajax({
            type:"POST",
            url:"../php/sign_up_backend.php", // the corresponding back-end script
            data: data,
            async:true,
            dataType:"json",
            success:function(res) {  // if get the return successfully
                alert("success");
                console.log("send json success");
            },
            error:function(res) { // if failed
                console.log(res);
                alert('error');
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
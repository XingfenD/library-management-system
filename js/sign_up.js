function info_send() {
    var uname = document.getElementById('username').value;
    var psd = document.getElementById('password1').value;
    var re_psd = document.getElementById('password2').value;
    if (uname === "") {
        alert("用户名不能为空");
    } else if (psd === "") {
        alert('密码不能为空!');
    } else if (re_psd === "") {
        alert('请重复输入密码!');
    } else if (!(psd === re_psd)) {
        alert('两次输入的密码不相同!');
    } else {
        // send ajax request to the back end
        const data = {
            "username": uname
        };

        $.ajax({
        type:"POST",
        url:"../php/sign_up_backend.php", // send ajax post to back-end script
        data: data,
        async:true,            
        dataType:"json",       
        success:function(res) { 
            alert("success");
            console.log("send json success");
        },
        error:function(res) {
            console.log(res);
            alert('error');
        }
    })
    }
}
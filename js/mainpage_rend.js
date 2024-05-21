const rending = [
    async function (content) { // 0首页
        console.log("rending the nav0 page");
        
        var uname_auth = await request_uname_auth();
        var para1 = document.createElement("div");
        para1.setAttribute("class", "text title");
        var text1 = document.createTextNode(`你好`);
        var para2 = document.createElement("div");
        para2.setAttribute("class", "text para");
        var text2 = document.createTextNode(`${uname_auth['username']}，你的权限是${uname_auth['authority']}`);

        para1.appendChild(text1);
        para2.appendChild(text2);
        content.appendChild(para1);
        content.appendChild(para2);
        // content.innerHTML = `<p>你好，用户${uname_auth['username']}</p>\n`
            // + `<p>你的权限是${uname_auth['authority']}</p>`;
    },
    async function (content) { // 1详情
        console.log("rending the nav1 page");
    },
    async function (content) { // 2个人中心
        console.log("rending the nav2 page");
    },
    async function (content) { // 3管理员页面
        console.log("rending the nav3 page");
    },
    async function (content) { // 4关于
        console.log("rending the nav4 page");
    }
]

async function request_uname_auth() {
    var rt;
    await $.ajax({
        type: "GET",
        url: "../php/uname_auth_backend.php", // the corresponding back-end script
        async: true,
        success: function(res) {  // if get the return successfully
            console.log(res);
            rt = res;
        }
    })
    return rt;
}
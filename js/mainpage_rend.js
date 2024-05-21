const rending = [
    async function (content) { // 0首页
        console.log("rending the nav0 page");
        var uname_auth = await request_uname_auth();
        rend_hori_bar(["1", "2", "3", "4", "1", "2", "3", "4"], content, uname_auth);
        var box = document.createElement("div");
        box.setAttribute("class", "box");
        var para1 = document.createElement("div");
        para1.setAttribute("class", "text title");
        var text1 = document.createTextNode(`你好`);
        var para2 = document.createElement("div");
        para2.setAttribute("class", "text para");
        var text2 = document.createTextNode(`${uname_auth['username']}，你的权限是${uname_auth['authority']}`);

        para1.appendChild(text1);
        para2.appendChild(text2);
        box.appendChild(para1);
        box.appendChild(para2);
        content.appendChild(box);
        
        // content.innerHTML = `<p>你好，用户${uname_auth['username']}</p>\n`
            // + `<p>你的权限是${uname_auth['authority']}</p>`;
    },
    async function (content) { // 1书库
        console.log("rending the nav1 page");
        var uname_auth = await request_uname_auth();

        rend_hori_bar(["1", "2", "3", "4", "1", "2", "3", "4"], content, uname_auth);
    },
    async function (content) { // 2个人中心
        console.log("rending the nav2 page");
    },
    async function (content) { // 3设置
        console.log("rending the nav3 page");
    },
    async function (content) { // 4管理者界面
        console.log("rending the nav4 page");
    },
    async function (content) { // 5关于
        console.log("rending the nav5 page");
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

function rend_hori_bar(btn_str_lst, content, uname_auth) {
    var nav = document.createElement("nav");
    var ul = document.createElement("ul");

    // buttons on the navigator bar
    ul.setAttribute("class", "nav-hori");
    btn_str_lst.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a")
        a.setAttribute("class", "hori-button");
        var a_text = document.createTextNode(item);
        a.appendChild(a_text);
        li.appendChild(a);
        ul.appendChild(li);
    });
    nav.appendChild(ul);
    

    // user info and logout
    var hori_bar_info = document.createElement("div");
    var h_user = document.createElement("div");
    var h_out = document.createElement("div");
    var btn_out = document.createElement("a");
    var user_text = document.createTextNode(`当前用户:${uname_auth['username']}`);
    var out_text = document.createTextNode("退出");


    hori_bar_info.setAttribute("class", "info");
    btn_out.setAttribute("class", "hori_btn_out")
    h_user.setAttribute("class", "h_user");
    h_out.setAttribute("class", "h_out");

    // build connection
    btn_out.appendChild(out_text);
    h_user.appendChild(user_text);
    h_out.appendChild(btn_out);
    h_out.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
    </svg>`;
    hori_bar_info.appendChild(h_user);
    hori_bar_info.appendChild(h_out);
    nav.appendChild(hori_bar_info);

    content.appendChild(nav);
}
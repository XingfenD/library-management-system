const rending = [
    async function (content) { // 首页
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "1": {
                "authority": 1,
                "icon": 
                ``
            },
            "2": {
                "authority": 2,
                "icon": 
                ``,
            },
            "3": {
                "authority": 3,
                "icon": 
                ``
            },
            "4": {
                "authority": 4,
                "icon": 
                ``
            },
        }

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 书库
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "原神2.1": {
                "authority": 1,
            },
            "原神2.2": {
                "authority": 1,
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 用户列表
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "借阅记录": {
                "authority": 1,
                "icon":
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 0 .5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 2h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 4h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 6h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
                </svg>`
            },
            "我的信息": {
                "authority": 1,
                "icon":
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                    <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
                </svg>`
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 系统管理
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "原神4.1": {
                "authority": 1,
            },
            "原神4.2": {
                "authority": 1,
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 个人中心
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "原神5.1": {
                "authority": 1,
            },
            "原神5.2": {
                "authority": 1,
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 设置
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "原神6.1": {
                "authority": 1,
            },
            "原神6.2": {
                "authority": 1,
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    },
    async function (content) { // 关于
        var uname_auth = await request_uname_auth();
        var btn_info_lst = {
            "原神7.1": {
                // "authority": 1,
            },
            "原神7.2": {
                // "authority": 1,
            }
        };

        rend_hori_bar(btn_info_lst, content, uname_auth);
        document.querySelector(".hori-button").click();
    }
];

async function request_uname_auth() { // request username & authority from the server
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

function rend_hori_bar(btn_info_lst, content, uname_auth) { // rend the content actually
    var nav = document.querySelector("nav.hori");
    var ul = document.querySelector("ul.nav-hori");
    var box = document.querySelector("div.box");

    // remove the previous elements of the nav
    for (var i = nav.children.length - 1; i >= 0; i--) {
        nav.children[i].remove();
    }

    // buttons on the navigator bar
    for (const [key, value] of Object.entries(btn_info_lst)) {
        if (!value.hasOwnProperty('authority')) {
            value['authority'] = 1;
        }
        if (uname_auth['authority'] >= value['authority']) {
            var li = document.createElement("li");
            var a = document.createElement("a");

            // set the attribute
            a.setAttribute("class", "hori-button");
            var a_text = document.createTextNode(key); // the text
            
            // add event listener
            if (hori_btn_func.hasOwnProperty(key)) {
                a.addEventListener("click", function() {
                    hori_btn_func[key](uname_auth, box); // params
                });
            }

            // build father-son relationship
            if (value.hasOwnProperty('icon')) {
                a.innerHTML = value['icon']; // the icon
            }
            a.appendChild(a_text);
            li.appendChild(a);
            ul.appendChild(li);
        }
    }
    

    // user info and logout
    var hori_bar_info = document.createElement("div");
    var h_user = document.createElement("div");
    var h_out = document.createElement("div");
    var btn_out = document.createElement("a");
    var user_text = document.createTextNode(`当前用户:${uname_auth['username']}`);
    var out_text = document.createTextNode("退出");

    // set attribute
    box.setAttribute("class", "box");
    hori_bar_info.setAttribute("class", "info");
    btn_out.setAttribute("class", "hori_btn_out")
    h_user.setAttribute("class", "h_user");
    h_out.setAttribute("class", "h_out");

    // add listener logout
    btn_out.addEventListener("click", async function () {
        await $.ajax ({
            type: "POST",
            url: "../php/logout_backend.php", // the corresponding back-end script
            async: true,
            data: {
                "username": this.parentElement.previousElementSibling.textContent.substr(5)
            },
            success: function(res) {  // if get the return successfully
                console.log(res);
                if (res['status'] == 0) {
                    alert("退出登录成功，正在重定向...");
                    window.location.replace('../html/log_in.html');
                } else {
                    alert("退出登录失败");
                }
            },
            error: function(res) {
                console.log(res);
                alert("error");
                alert(res);
            }
        })
    });

    // build father-son relationship
    btn_out.appendChild(out_text);
    btn_out.innerHTML += 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
    </svg>`;
    h_user.appendChild(user_text);
    h_out.appendChild(btn_out);
    hori_bar_info.appendChild(h_user);
    hori_bar_info.appendChild(h_out);
    nav.appendChild(hori_bar_info);
}
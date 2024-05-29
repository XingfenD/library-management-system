async function rending(title) {
    var uname_auth = await request_uname_auth();
    var btn_info_lst = {
        "首页": {
            "仪表盘": {
                "authority": 3,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44365 41.5564C4.46243 37.5751 2 32.0751 2 26C2 13.8497 11.8497 4 24 4C36.1503 4 46 13.8497 46 26C46 32.0751 43.5376 37.5751 39.5564 41.5564" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.1005 35.8995C11.567 33.366 10 29.866 10 26C10 18.268 16.268 12 24 12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><path d="M24 26V18" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            },
            "推荐": {
                "authority": 0,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C32.2347 44 38.9998 37.4742 38.9998 29.0981C38.9998 27.0418 38.8953 24.8375 37.7555 21.4116C36.6157 17.9858 36.3861 17.5436 35.1809 15.4279C34.666 19.7454 31.911 21.5448 31.2111 22.0826C31.2111 21.5231 29.5445 15.3359 27.0176 11.6339C24.537 8 21.1634 5.61592 19.1853 4C19.1853 7.06977 18.3219 11.6339 17.0854 13.9594C15.8489 16.2849 15.6167 16.3696 14.0722 18.1002C12.5278 19.8308 11.8189 20.3653 10.5274 22.4651C9.23596 24.565 9 27.3618 9 29.4181C9 37.7942 15.7653 44 24 44Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/></svg>`
            }
        },
        "书库": {
            "查询馆藏": {
                "authority": 1,
                "icon":
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>`
            },
            "借阅记录": {
                "authority": 1,
                "icon":
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 0 .5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 2h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 4h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 6h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-13 2a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
                </svg>`
            },
            "图书入库": {
                "authority": 2,
                "icon":  `<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="36" height="36" rx="3" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/><path d="M24 16V32" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 24L32 24" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            }
        },
        "用户列表": {
            "用户列表": {
                "authority": 2,
                "icon": 
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                    <path fill-rule="evenodd" d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>`
            }
        },
        "系统管理": {
            "SQL执行": {
                "authority": 4,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36.8281 33.8281L40.9997 37.9997" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 31C38 32.1046 37.5523 33.1046 36.8284 33.8284C36.1046 34.5523 35.1046 35 34 35C31.7909 35 30 33.2091 30 31C30 28.7909 31.7909 27 34 27C36.2091 27 38 28.7909 38 31Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 31C44 36.5228 39.5228 41 34 41" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            },
            "备份与恢复": {
                "authority": 3,
                "icon": `<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 12V20V21C31.0449 21 28.3892 22.2818 26.5585 24.3198C24.9678 26.0906 24 28.4323 24 31C24 31.5789 24.0492 32.1463 24.1436 32.6983C24.6579 35.7046 26.5143 38.2529 29.0741 39.7046C26.4116 40.5096 22.8776 41 19 41C10.7157 41 4 38.7614 4 36V28V20V12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 31C44 36.5228 39.5228 41 34 41C32.2091 41 30.5281 40.5292 29.0741 39.7046C26.5143 38.2529 24.6579 35.7046 24.1436 32.6983C24.0492 32.1463 24 31.5789 24 31C24 28.4323 24.9678 26.0906 26.5585 24.3198C28.3892 22.2818 31.0449 21 34 21C39.5228 21 44 25.4772 44 31Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 12C34 14.7614 27.2843 17 19 17C10.7157 17 4 14.7614 4 12C4 9.23858 10.7157 7 19 7C27.2843 7 34 9.23858 34 12Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 28C4 30.7614 10.7157 33 19 33C20.807 33 22.5393 32.8935 24.1436 32.6983" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20C4 22.7614 10.7157 25 19 25C21.7563 25 24.339 24.7522 26.5585 24.3198" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 27L37.4641 29V33L34 35L30.5359 33V29L34 27Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            }
        },
        "个人中心": {
            "我的信息": {
                "authority": 0,
                "icon":
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                    <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
                </svg>`
            },
            "修改信息": {
                "authority": 1,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/></svg>`
            }
        },
        "关于": {
            // "系统信息": {
            //     "authority": 0,
            //     "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 8H4V38H19L24 43L29 38H44V8Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 23V32" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><path d="M24 16V17" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/></svg>`
            // },
            "帮助文档": {
                "authority": 0,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 30L31 30" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 36H24" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="17" y="12" width="14" height="10" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            },
            "项目介绍": {
                "authority": 0,
                "icon": `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 8H4V38H19L24 43L29 38H44V8Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 23V32" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><path d="M24 16V17" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/></svg>`
            }
        }
    };

    rend_hori_bar(btn_info_lst[title], uname_auth);
    document.querySelector(".hori-button").click();
}

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

function rend_hori_bar(btn_info_lst, uname_auth) { // rend the content actually
    var content = document.querySelector(".content");
    var nav = document.createElement("nav");
    var ul = document.createElement("ul");
    var box = document.createElement("div");
    var idx = 0;
    // buttons on the navigator bar

    ul.setAttribute("class", "nav-hori");
    for (const [key, value] of Object.entries(btn_info_lst)) {
        if (!value.hasOwnProperty('authority')) {
            value['authority'] = 1;
        }
        if (uname_auth['authority'] >= value['authority']) {
            var li = document.createElement("li");
            var a = document.createElement("a");

            // set the attribute
            a.setAttribute("class", "hori-button");
            a.setAttribute("id", `hori-nav${idx++}`);
            var a_text = document.createTextNode(key); // the text
            
            // add event listener
            a.addEventListener("click", function() {
                btns = this.parentElement.querySelectorAll("a[type='active']");
                btns.forEach(function (item) {
                    item.setAttribute("type", '');
                });
                this.setAttribute("type", "active");
                slider = this.parentElement.parentElement.querySelector(".hori-slider");
                slider.setAttribute("style", `left:${-133 * (slider.parentElement.childElementCount - 1 - Number(this.getAttribute("id").substr(8)))}px`)
            });
            if (hori_btn_func.hasOwnProperty(key)) {
                a.addEventListener("click", async function() {
                    await hori_btn_func[key](uname_auth, box); // params
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
    var hori_slider = document.createElement("div");

    hori_slider.setAttribute("class", "hori-slider");
    // hori_slider.setAttribute("style", `left:${ul.childElementCount * -133}px`);
    ul.appendChild(hori_slider);
    nav.appendChild(ul);
    

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
    content.appendChild(nav);
    content.appendChild(box);
}
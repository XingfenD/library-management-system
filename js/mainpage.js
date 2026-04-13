// ==================== 应用初始化 ====================

var APP_USER = null;

(async function () {
    // 0. 加载外部模板文件
    try {
        var resp = await fetch("./html/templates.html");
        var html = await resp.text();
        var container = document.createElement("div");
        container.innerHTML = html;
        // 将所有 <template> 注入到 document.body
        var templates = container.querySelectorAll("template");
        templates.forEach(function (tpl) {
            document.body.appendChild(tpl);
        });
    } catch (e) {
        alert("模板加载失败");
        return;
    }

    // 1. 调用后端 API 获取登录状态
    try {
        APP_USER = await $.ajax({
            type: "GET",
            url: "./php/uname_auth_backend.php",
            dataType: "json"
        });
    } catch (e) {
        alert("服务器连接失败");
        return;
    }

    // 2. 未登录则跳转
    if (!APP_USER.username || APP_USER.username === "visitor") {
        alert("未登录请先登录");
        window.location.replace("./html/log_in.html");
        return;
    }

    // 3. 根据权限显示菜单元素
    var auth = APP_USER.authority;
    document.querySelectorAll("[data-auth]").forEach(function (el) {
        if (auth >= parseInt(el.getAttribute("data-auth"))) {
            el.style.display = "";
        }
    });

    // 4. 填充共享 info 栏的用户名
    document.querySelector("#shared-info .h_user").textContent = "当前用户:" + APP_USER.username;

    // 5. 显示页面（初始 body 是隐藏的，防止未登录时闪烁）
    document.body.style.display = "";

    // 6. 初始化导航
    initNavigation();
})();

// ==================== 导航控制 ====================

function initNavigation() {
    var navBtns = document.querySelectorAll(".nav-btn");
    var visibleNavBtns = [];
    var groups = document.querySelectorAll(".page-group");
    var vertiSlider = document.querySelector(".verti-slider");
    var sharedInfo = document.getElementById("shared-info");

    // 收集可见的垂直导航按钮并编号
    navBtns.forEach(function (btn) {
        var li = btn.parentElement;
        if (li.style.display !== "none") {
            btn.setAttribute("id", "nav" + visibleNavBtns.length);
            visibleNavBtns.push(btn);
        }
    });

    // 垂直导航点击：切换页面分组
    visibleNavBtns.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
            // 更新 active 状态
            document.querySelectorAll('.nav-btn[type="active"]').forEach(function (a) {
                a.setAttribute("type", "");
            });
            this.setAttribute("type", "active");

            // 移动垂直滑块
            vertiSlider.style.top = "-" + (41 * (visibleNavBtns.length - i)) + "px";

            // 切换页面分组显隐
            var groupName = this.getAttribute("data-group");
            groups.forEach(function (g) {
                if (g.style.display !== "none" || g.getAttribute("data-group") === groupName) {
                    g.style.display = (g.getAttribute("data-group") === groupName) ? "" : "none";
                }
            });

            // 自动点击该分组的第一个可见水平按钮
            var activeGroup = document.querySelector('.page-group[data-group="' + groupName + '"]');
            var firstVisibleBtn = activeGroup.querySelector("li:not([style*='display: none']) .hori-button");
            if (firstVisibleBtn) firstVisibleBtn.click();
        });
    });

    // 水平导航点击：切换子页面
    groups.forEach(function (group) {
        var visibleHoriBtns = [];
        group.querySelectorAll(".hori-button").forEach(function (btn) {
            var li = btn.parentElement;
            if (li.style.display !== "none") {
                visibleHoriBtns.push(btn);
            }
        });

        var horiSlider = group.querySelector(".hori-slider");
        var box = group.querySelector(".box");

        visibleHoriBtns.forEach(function (btn, idx) {
            btn.setAttribute("id", "hori-nav" + idx);

            btn.addEventListener("click", function () {
                // 更新水平 active 状态
                group.querySelectorAll('.hori-button[type="active"]').forEach(function (a) {
                    a.setAttribute("type", "");
                });
                this.setAttribute("type", "active");

                // 移动水平滑块
                horiSlider.style.left = (-133 * (visibleHoriBtns.length - idx)) + "px";

                // 渲染页面内容
                var pageName = this.getAttribute("data-page");
                if (hori_btn_func[pageName]) {
                    box.innerHTML = '';
                    hori_btn_func[pageName](APP_USER, box);
                }
            });
        });
    });

    // 退出登录（只有一个共享按钮）
    sharedInfo.querySelector(".logout-btn").addEventListener("click", async function () {
        try {
            var res = await $.ajax({
                type: "POST",
                url: "./php/logout_backend.php",
                dataType: "json",
                data: { username: APP_USER.username }
            });
            if (res.status == 0) {
                alert("退出登录成功，正在重定向...");
                window.location.replace("./html/log_in.html");
            } else {
                alert("退出登录失败");
            }
        } catch (e) {
            alert("error");
        }
    });

    // 初始化：点击第一个垂直导航
    if (visibleNavBtns.length > 0) visibleNavBtns[0].click();
}

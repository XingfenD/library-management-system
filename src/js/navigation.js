function collectVisibleButtons(buttonSelector) {
    var buttons = [];

    document.querySelectorAll(buttonSelector).forEach(function (button) {
        var item = button.parentElement;
        if (item.style.display !== "none") {
            buttons.push(button);
        }
    });

    return buttons;
}

function getFirstVisibleHorizontalButton(group) {
    var items = group.querySelectorAll("li");

    for (var i = 0; i < items.length; i++) {
        if (items[i].style.display === "none") {
            continue;
        }

        var button = items[i].querySelector(".hori-button");
        if (button) {
            return button;
        }
    }

    return null;
}

function bindVerticalNavigation(visibleNavBtns, groups, vertiSlider) {
    visibleNavBtns.forEach(function (btn, index) {
        btn.setAttribute("id", "nav" + index);

        btn.addEventListener("click", function () {
            document.querySelectorAll('.nav-btn[type="active"]').forEach(function (activeBtn) {
                activeBtn.setAttribute("type", "");
            });
            this.setAttribute("type", "active");

            vertiSlider.style.top = "-" + (41 * (visibleNavBtns.length - index)) + "px";

            var groupName = this.getAttribute("data-group");
            groups.forEach(function (group) {
                var isActiveGroup = group.getAttribute("data-group") === groupName;
                if (group.style.display !== "none" || isActiveGroup) {
                    group.style.display = isActiveGroup ? "" : "none";
                }
            });

            var activeGroup = document.querySelector('.page-group[data-group="' + groupName + '"]');
            var firstVisibleBtn = getFirstVisibleHorizontalButton(activeGroup);
            if (firstVisibleBtn) {
                firstVisibleBtn.click();
            }
        });
    });
}

function bindHorizontalNavigation(group, appUser) {
    var visibleHoriBtns = [];
    group.querySelectorAll(".hori-button").forEach(function (btn) {
        var li = btn.parentElement;
        if (li.style.display !== "none") {
            visibleHoriBtns.push(btn);
        }
    });

    var horiSlider = group.querySelector(".hori-slider");
    var box = group.querySelector(".box");

    visibleHoriBtns.forEach(function (btn, index) {
        btn.setAttribute("id", "hori-nav" + index);

        btn.addEventListener("click", function () {
            group.querySelectorAll('.hori-button[type="active"]').forEach(function (activeBtn) {
                activeBtn.setAttribute("type", "");
            });
            this.setAttribute("type", "active");

            horiSlider.style.left = (-133 * (visibleHoriBtns.length - index)) + "px";

            var pageName = this.getAttribute("data-page");
            if (!mountPageTemplate(box, pageName)) {
                return;
            }

            if (hori_btn_func[pageName]) {
                hori_btn_func[pageName](appUser, box);
            }
        });
    });
}

function bindLogout(sharedInfo, appUser) {
    sharedInfo.querySelector(".logout-btn").addEventListener("click", async function () {
        try {
            var res = await appApi.logout(appUser.username);
            if (res.status == 0) {
                showToast("退出登录成功，正在重定向...");
                window.location.replace("./html/log_in.html");
            } else {
                showToast("退出登录失败");
            }
        } catch (e) {
            showToast("error");
        }
    });
}

function initNavigation(appUser) {
    var visibleNavBtns = collectVisibleButtons(".nav-btn");
    var groups = document.querySelectorAll(".page-group");
    var vertiSlider = document.querySelector(".verti-slider");
    var sharedInfo = document.getElementById("shared-info");

    bindVerticalNavigation(visibleNavBtns, groups, vertiSlider);
    groups.forEach(function (group) {
        bindHorizontalNavigation(group, appUser);
    });
    bindLogout(sharedInfo, appUser);

    if (visibleNavBtns.length > 0) {
        visibleNavBtns[0].click();
    }
}

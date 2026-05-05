var APP_USER = null;

function ensureAuthenticated(user) {
    if (!user.username || user.username === "visitor") {
        showToast("未登录请先登录");
        window.location.replace("./html/log_in.html");
        return false;
    }

    return true;
}

(async function bootstrapApp() {
    try {
        await loadAppTemplates();
    } catch (e) {
        showToast("模板加载失败");
        return;
    }

    try {
        APP_USER = await appApi.getCurrentUser();
    } catch (e) {
        showToast("服务器连接失败");
        return;
    }

    if (!ensureAuthenticated(APP_USER)) {
        return;
    }

    appRenderer.showAuthorizedElements(APP_USER.authority);
    appRenderer.fillSharedUserInfo(APP_USER);
    appRenderer.showApp();
    initNavigation(APP_USER);
})();

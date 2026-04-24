hori_btn_func["仪表盘"] = async function (user, box) {
    dashboardRenderer.setWelcomeUser(box, user);

    try {
        dashboardRenderer.renderRecentBooks(box, await dashboardApi.getRecentBooks());
    } catch (e) {
        dashboardRenderer.renderRecentBooks(box, []);
    }

    if (user.authority >= 2) {
        dashboardRenderer.setRecentUsersVisible(box, true);
        try {
            dashboardRenderer.renderRecentUsers(box, await dashboardApi.getRecentUsers());
        } catch (e) {
            dashboardRenderer.renderRecentUsers(box, []);
        }
    } else {
        dashboardRenderer.setRecentUsersVisible(box, false);
    }

    if (user.authority >= 3) {
        dashboardRenderer.setRequestBlockVisible(box, true);
        try {
            dashboardRenderer.renderRequestChart(box, await dashboardApi.getRequestList());
        } catch (e) {
            dashboardRenderer.setRequestBlockVisible(box, false);
        }
    } else {
        dashboardRenderer.setRequestBlockVisible(box, false);
    }
};

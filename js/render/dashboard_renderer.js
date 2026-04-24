var dashboardRenderer = {
    setWelcomeUser: function (box, user) {
        var authList = ["游客", "普通用户", "管理员", "中级管理员", "超级管理员"];
        box.querySelector(".welcome-user").textContent = authList[user.authority] + ": " + user.username;
    },

    setRecentUsersVisible: function (box, visible) {
        box.querySelector("#block3").style.display = visible ? "" : "none";
    },

    setRequestBlockVisible: function (box, visible) {
        box.querySelector("#block4").style.display = visible ? "" : "none";
    },

    renderRecentBooks: function (box, data) {
        tableRenderer.fillBodyByKeys(box.querySelector(".book-in-week-body"), data, ["书籍编号", "书名", "入库日期"]);
    },

    renderRecentUsers: function (box, data) {
        tableRenderer.fillBodyByKeys(box.querySelector(".user-in-week-body"), data, ["uuid", "用户名", "注册日期"]);
    },

    renderRequestChart: function (box, data) {
        var canvas = box.querySelector(".request-chart");
        if (canvas._chartInstance) {
            canvas._chartInstance.destroy();
        }

        canvas._chartInstance = new Chart(canvas.getContext("2d"), {
            type: "line",
            data: {
                labels: ["一小时内", "两小时", "三小时", "四小时", "五小时"],
                datasets: [{
                    label: "近五个小时内访问数",
                    data: data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "black",
                    borderWidth: 1
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
};

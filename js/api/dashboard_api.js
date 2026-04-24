var dashboardApi = {
    getRecentBooks: function () {
        return apiPost({ oper: "get", ctnt: "book-in-week" });
    },

    getRecentUsers: function () {
        return apiPost({ oper: "get", ctnt: "user-in-week" });
    },

    getRequestList: function () {
        return apiPost({ oper: "get", ctnt: "request-list" });
    }
};

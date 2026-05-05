var accountApi = {
    getUserList: function (select, input) {
        return apiPost({
            oper: "get",
            ctnt: "user-list",
            select: select,
            input: input
        });
    },

    changeUserInfo: function (uuid, select, setContent) {
        return apiPost({
            oper: "post",
            ctnt: "change-info",
            uuid: uuid,
            select: select,
            set_ctnt: setContent
        });
    },

    getUserInfo: function () {
        return apiPost({ oper: "get", ctnt: "user-info" });
    },

    updateUserInfo: function (postData) {
        return apiPost(postData);
    },

    updateAccountInfo: function (username, password) {
        return apiPost({
            oper: "post",
            ctnt: "acct-info",
            username: username,
            password: password
        });
    }
};

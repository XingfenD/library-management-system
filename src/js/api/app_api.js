var appApi = {
    getCurrentUser: function () {
        return apiGetJson("./php/uname_auth_backend.php");
    },

    logout: function (username) {
        return apiPostJson("./php/logout_backend.php", { username: username });
    }
};

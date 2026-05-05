var appRenderer = {
    showAuthorizedElements: function (authority) {
        document.querySelectorAll("[data-auth]").forEach(function (element) {
            if (authority >= parseInt(element.getAttribute("data-auth"), 10)) {
                element.style.display = "";
            }
        });
    },

    fillSharedUserInfo: function (user) {
        document.querySelector("#shared-info .h_user").textContent = "当前用户:" + user.username;
    },

    showApp: function () {
        document.body.style.display = "";
    }
};

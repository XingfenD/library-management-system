var accountRenderer = {
    fillMyInfo: function (box, user, data) {
        var keys = ["u_name", "card_number", "u_tele", "u_email", "u_address"];
        box.querySelector("#person-name").textContent = user.username;

        keys.forEach(function (key, index) {
            box.querySelector("#info_ctnt" + index).textContent = tableRenderer.getDisplayText(data[key]);
        });
    },

    fillChangeInfoForm: function (box, user, data, infoMap) {
        box.querySelector("#acct-input-ctnt0").value = user.username;

        Object.keys(infoMap).forEach(function (label, index) {
            var key = infoMap[label];
            if (data[key] != undefined) {
                box.querySelector("#input-ctnt" + index).value = data[key];
            }
        });
    }
};

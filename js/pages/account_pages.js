hori_btn_func["用户列表"] = async function (user, box) {
    var tbody = box.querySelector("#user-ls-body");

    box.querySelector(".search-btn").addEventListener("click", async function () {
        var rcv = await accountApi.getUserList(
            box.querySelector("#user-selector").value,
            box.querySelector("#search-ctnt").value
        );
        tableRenderer.fillBody(tbody, rcv);
    });

    box.querySelector(".edit-btn").addEventListener("click", async function () {
        var uuid = box.querySelector(".edit-uuid").value;
        if (!/^\d{12}$/.test(uuid)) {
            alert("请输入12位数字的uuid!");
            return;
        }

        try {
            var rcv = await accountApi.changeUserInfo(
                uuid,
                box.querySelector(".edit-field").selectedOptions[0].textContent,
                box.querySelector(".edit-value").value
            );
            alert(rcv.msg);
        } catch (e) {
            alert("Something went wrong");
        }
    });
};

hori_btn_func["我的信息"] = async function (user, box) {
    accountRenderer.fillMyInfo(box, user, await accountApi.getUserInfo());
};

hori_btn_func["修改信息"] = async function (user, box) {
    var infoMap = {
        "姓名": "u_name",
        "卡号": "card_number",
        "联系电话": "u_tele",
        "电子邮箱": "u_email",
        "住址": "u_address"
    };

    accountRenderer.fillChangeInfoForm(box, user, await accountApi.getUserInfo(), infoMap);

    box.querySelector("#self-info-btn").addEventListener("click", async function () {
        var inputs = box.querySelectorAll("#self-info-form .info-input-ctnt");
        for (var i = 0; i < inputs.length; i++) {
            var placeholder = inputs[i].placeholder;
            var value = inputs[i].value;

            if (placeholder === "卡号" && !/^\d{13}$/.test(value)) {
                alert("校园卡号应为13位数字");
                return;
            }
            if (placeholder === "联系电话" && !/^\d{11}$/.test(value)) {
                alert("电话号码应为11位数字");
                return;
            }
            if (placeholder === "电子邮箱" && !/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(value)) {
                alert("邮箱格式非法!");
                return;
            }
        }

        var postData = { oper: "post", ctnt: "user-info" };
        inputs.forEach(function (input) {
            postData[infoMap[input.placeholder]] = input.value;
        });

        try {
            await accountApi.updateUserInfo(postData);
            alert("修改成功!");
        } catch (e) {
            alert("修改失败");
        }
    });

    box.querySelector("#acct-info-btn").addEventListener("click", async function () {
        var inputs = box.querySelectorAll("#acct-info-form .info-input-ctnt");
        var msg = info_check(inputs[0].value, inputs[1].value, inputs[2].value);
        if (msg !== "true") {
            alert(msg);
            return;
        }

        try {
            var res = await accountApi.updateAccountInfo(inputs[0].value, inputs[1].value);
            alert(res.status == 0 ? "修改密码成功!" : res.msg);
        } catch (e) {
            alert("修改密码失败");
        }
    });
};

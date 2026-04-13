// ==================== 工具函数 ====================

function apiPost(data, url) {
    return $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: url || "./php/mainpage_backend.php"
    });
}

function fillTableBody(tbody, data) {
    tbody.innerHTML = '';
    if (!data || !data.forEach) return;
    data.forEach(function (item) {
        var row = document.createElement("tr");
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                var cell = document.createElement("td");
                cell.textContent = (item[key] != null && item[key] !== '') ? item[key] : "未设置";
                row.appendChild(cell);
            }
        }
        tbody.appendChild(row);
    });
}

function loadTemplate(id) {
    return document.getElementById(id).content.cloneNode(true);
}

// ==================== 页面渲染函数 ====================

var hori_btn_func = {

    "查询馆藏": async function (user, box) {
        box.id = "search-book";
        box.appendChild(loadTemplate("tpl-search-book"));

        var tbody = box.querySelector("#book-ls-body");
        box.querySelector(".search-btn").addEventListener("click", async function () {
            var rcv = await apiPost({
                oper: "get", ctnt: "book-list",
                select: box.querySelector("#book-selector").value,
                input: box.querySelector("#search-ctnt").value
            });
            fillTableBody(tbody, rcv);
        });
    },

    "借阅记录": async function (user, box) {
        box.id = "rcd-list";
        box.appendChild(loadTemplate("tpl-rcd-list"));

        var tbody = box.querySelector("#rcd-ls-body");

        // 权限 >= 2 才显示搜索栏
        if (user.authority >= 2) {
            box.querySelector(".rcd-search").style.display = "";
        }

        // 加载记录
        async function loadRecords(isSelf) {
            var data = { oper: "get", ctnt: "rcd-list", select: "账号", input: "self" };
            if (!isSelf) {
                data.select = box.querySelector("#rcd-selector").value;
                data.input = box.querySelector("#search-ctnt").value;
            }
            var rcv = await apiPost(data);
            fillTableBody(tbody, rcv);
        }

        // 搜索按钮
        box.querySelector(".search-btn").addEventListener("click", function () { loadRecords(false); });

        // 借还提交
        box.querySelector(".br-submit-btn").addEventListener("click", async function () {
            try {
                var rcv = await apiPost({
                    oper: "post", ctnt: "br-book",
                    select: box.querySelector("#comm-div select").selectedOptions[0].textContent,
                    input: box.querySelector(".br-book-input").value
                });
                alert(rcv.msg);
                loadRecords(true);
            } catch (e) {
                alert("Something went wrong");
            }
        });

        loadRecords(true);
    },

    "图书入库": async function (user, box) {
        box.id = "book-storage";
        box.appendChild(loadTemplate("tpl-book-store"));

        box.querySelector("#book_info_btn").addEventListener("click", async function () {
            var name = box.querySelector("#book-info-input0").value;
            var price = box.querySelector("#book-info-input1").value;
            if (!name || !price) { alert("输入不能为空!"); return; }
            try {
                var rcv = await apiPost({ oper: "post", ctnt: "book-list", "书名": name, "价格": price });
                alert(rcv.status == 0 ? "入库成功!" : "Something went wrong");
            } catch (e) {
                alert("Something went wrong");
            }
        });
    },

    "用户列表": async function (user, box) {
        box.id = "user-list";
        box.appendChild(loadTemplate("tpl-user-list"));

        var tbody = box.querySelector("#user-ls-body");
        box.querySelector(".search-btn").addEventListener("click", async function () {
            var rcv = await apiPost({
                oper: "get", ctnt: "user-list",
                select: box.querySelector("#user-selector").value,
                input: box.querySelector("#search-ctnt").value
            });
            fillTableBody(tbody, rcv);
        });

        // 修改用户信息
        box.querySelector(".edit-btn").addEventListener("click", async function () {
            var uuid = box.querySelector(".edit-uuid").value;
            if (!/^\d{12}$/.test(uuid)) { alert("请输入12位数字的uuid!"); return; }
            try {
                var rcv = await apiPost({
                    oper: "post", ctnt: "change-info",
                    uuid: uuid,
                    select: box.querySelector(".edit-field").selectedOptions[0].textContent,
                    set_ctnt: box.querySelector(".edit-value").value
                });
                alert(rcv.msg);
            } catch (e) {
                alert("Something went wrong");
            }
        });
    },

    "我的信息": async function (user, box) {
        box.id = "my-info";
        box.appendChild(loadTemplate("tpl-my-info"));

        box.querySelector("#person-name").textContent = user.username;

        var data = await apiPost({ oper: "get", ctnt: "user-info" });
        var keys = ['u_name', 'card_number', 'u_tele', 'u_email', 'u_address'];
        keys.forEach(function (key, i) {
            var el = box.querySelector("#info_ctnt" + i);
            var val = data[key];
            el.textContent = (val && val !== '') ? val : "未设置";
        });
    },

    "修改信息": async function (user, box) {
        box.id = "change-info";
        box.appendChild(loadTemplate("tpl-change-info"));

        // 填充当前用户名
        box.querySelector("#acct-input-ctnt0").value = user.username;

        // 加载现有信息
        var data = await apiPost({ oper: "get", ctnt: "user-info" });
        var infoMap = { "姓名": "u_name", "卡号": "card_number", "联系电话": "u_tele", "电子邮箱": "u_email", "住址": "u_address" };
        var infoKeys = Object.values(infoMap);
        infoKeys.forEach(function (key, i) {
            if (data[key] != undefined) {
                box.querySelector("#input-ctnt" + i).value = data[key];
            }
        });

        // 个人信息修改
        box.querySelector("#self-info-btn").addEventListener("click", async function () {
            var inputs = box.querySelectorAll("#self-info-form .info-input-ctnt");
            // 校验
            for (var i = 0; i < inputs.length; i++) {
                var ph = inputs[i].placeholder, val = inputs[i].value;
                if (ph === "卡号" && !/^\d{13}$/.test(val)) { alert("校园卡号应为13位数字!"); return; }
                if (ph === "联系电话" && !/^\d{11}$/.test(val)) { alert("电话号码应为11位数字!"); return; }
                if (ph === "电子邮箱" && !/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(val)) { alert("邮箱格式非法!"); return; }
            }
            var postData = { oper: "post", ctnt: "user-info" };
            inputs.forEach(function (inp) { postData[infoMap[inp.placeholder]] = inp.value; });
            try {
                await apiPost(postData);
                alert("修改成功!");
            } catch (e) {
                alert("修改失败");
            }
        });

        // 账户信息修改
        box.querySelector("#acct-info-btn").addEventListener("click", async function () {
            var inputs = box.querySelectorAll("#acct-info-form .info-input-ctnt");
            var msg = info_check(inputs[0].value, inputs[1].value, inputs[2].value);
            if (msg !== "true") { alert(msg); return; }
            try {
                var res = await apiPost({
                    oper: "post", ctnt: "acct-info",
                    username: inputs[0].value,
                    password: inputs[1].value
                });
                alert(res.status == 0 ? "修改密码成功!" : res.msg);
            } catch (e) {
                alert("修改密码失败");
            }
        });
    },

    "帮助文档": async function (user, box) {
        box.id = "help";
        box.appendChild(loadTemplate("tpl-help"));
    },

    "项目介绍": async function (user, box) {
        box.id = "project-info";
        box.appendChild(loadTemplate("tpl-project-info"));
    },

    "SQL执行": async function (user, box) {
        box.id = "sql-execute";
        box.appendChild(loadTemplate("tpl-sql-execute"));

        var thead = box.querySelector("#rst-ls-head");
        var tbody = box.querySelector("#rst-ls-body");

        box.querySelector(".sql-submit-btn").addEventListener("click", async function () {
            thead.innerHTML = '';
            tbody.innerHTML = '';
            try {
                var data = await apiPost({
                    oper: "post", ctnt: "sql",
                    input: box.querySelector("#sql-input").value
                });
                if (!data || data.length === 0) return;

                // 动态表头
                var keys = Object.keys(data[0]);
                var tr = document.createElement("tr");
                keys.forEach(function (k) {
                    var td = document.createElement("td");
                    td.textContent = k;
                    tr.appendChild(td);
                });
                thead.appendChild(tr);

                fillTableBody(tbody, data);
            } catch (e) {
                alert("Something went wrong");
            }
        });
    },

    "备份与恢复": async function (user, box) {
        box.id = "backup-restore";
        box.appendChild(loadTemplate("tpl-backup-restore"));

        var tbody = box.querySelector("#rst-ls-body");

        // 加载备份列表
        async function loadBackupList() {
            try {
                var data = await apiPost({ oper: "get", ctnt: "backup-list" });
                tbody.innerHTML = '';
                data.forEach(function (item) {
                    var tr = document.createElement("tr");
                    tr.innerHTML = '<td><a>' + item + '</a></td>';
                    tbody.appendChild(tr);
                });
            } catch (e) { console.log(e); }
        }

        // 备份按钮
        box.querySelector(".backup-btn").addEventListener("click", function () {
            var name = box.querySelector(".backup-name-input").value;
            if (!name) { alert("备份名称不能为空!"); return; }
            $.ajax({
                type: "POST", dataType: "json",
                url: "./php/backup_restore.php",
                data: { oper: "backup", input: name },
                success: function (msg) { alert(msg); },
                error: function (msg) { console.log(msg); }
            });
            loadBackupList();
        });

        await loadBackupList();

        // Root 权限才显示恢复/删除
        if (user.authority >= 4) {
            var rdDiv = box.querySelector("#r-d-div");
            rdDiv.style.display = "";
            var rdSelect = box.querySelector(".rd-select");

            function refreshSelect() {
                rdSelect.innerHTML = '';
                box.querySelectorAll("tbody td a").forEach(function (a) {
                    var opt = document.createElement("option");
                    opt.textContent = a.textContent;
                    rdSelect.appendChild(opt);
                });
            }
            refreshSelect();
            rdSelect.addEventListener("click", refreshSelect);

            box.querySelector(".restore-btn").addEventListener("click", function () {
                if (!confirm('确认恢复至备份文件' + rdSelect.value + '吗?\n恢复之前建议先备份当前状态!')) return;
                $.ajax({
                    type: "POST", dataType: "json",
                    url: "./php/backup_restore.php",
                    data: { oper: "restore", input: rdSelect.value },
                    success: function () { alert("恢复成功！"); },
                    error: function (msg) { console.log(msg); }
                });
            });

            box.querySelector(".delete-btn").addEventListener("click", function () {
                if (!confirm('确认删除备份文件' + rdSelect.value + '吗?')) return;
                $.ajax({
                    type: "POST", dataType: "json",
                    url: "./php/backup_restore.php",
                    data: { oper: "delete", input: rdSelect.value },
                    success: function (msg) { console.log(msg); refreshSelect(); },
                    error: function (msg) { console.log(msg); }
                });
                loadBackupList();
            });
        }
    }
};

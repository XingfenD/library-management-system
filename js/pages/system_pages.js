hori_btn_func["SQL执行"] = async function (user, box) {
    box.querySelector(".sql-submit-btn").addEventListener("click", async function () {
        systemRenderer.clearSqlResult(box);

        try {
            var data = await systemApi.executeSql(box.querySelector("#sql-input").value);

            if (!data || data.length === 0) return;

            systemRenderer.renderSqlResult(box, data);
        } catch (e) {
            alert("Something went wrong");
        }
    });
};

hori_btn_func["备份与恢复"] = async function (user, box) {
    var tbody = box.querySelector("#rst-ls-body");

    async function loadBackupList() {
        try {
            systemRenderer.renderBackupList(tbody, await systemApi.getBackupList());
        } catch (e) {
            console.log(e);
        }
    }

    box.querySelector(".backup-btn").addEventListener("click", function () {
        var name = box.querySelector(".backup-name-input").value;
        if (!name) {
            alert("备份名称不能为空!");
            return;
        }

        systemApi.backup(name).done(function (msg) {
            alert(msg);
            loadBackupList();
        }).fail(function (msg) {
            console.log(msg);
        });
    });

    await loadBackupList();

    if (user.authority >= 4) {
        var rdSelect = box.querySelector(".rd-select");

        systemRenderer.setBackupAdminControlsVisible(box, true);

        function syncBackupOptions() {
            systemRenderer.syncBackupOptions(box);
        }

        syncBackupOptions();
        rdSelect.addEventListener("click", syncBackupOptions);

        box.querySelector(".restore-btn").addEventListener("click", function () {
            if (!confirm("确认恢复至备份文件" + rdSelect.value + "吗?\n恢复之前建议先备份当前状态")) {
                return;
            }

            systemApi.restore(rdSelect.value).done(function () {
                alert("恢复成功");
            }).fail(function (msg) {
                console.log(msg);
            });
        });

        box.querySelector(".delete-btn").addEventListener("click", function () {
            if (!confirm("确认删除备份文件" + rdSelect.value + "吗?")) {
                return;
            }

            systemApi.removeBackup(rdSelect.value).done(function (msg) {
                console.log(msg);
                loadBackupList().then(syncBackupOptions);
            }).fail(function (msg) {
                console.log(msg);
            });
        });
    } else {
        systemRenderer.setBackupAdminControlsVisible(box, false);
    }
};

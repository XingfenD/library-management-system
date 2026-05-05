var systemApi = {
    executeSql: function (sql) {
        return apiPost({
            oper: "post",
            ctnt: "sql",
            input: sql
        });
    },

    getBackupList: function () {
        return apiPost({ oper: "get", ctnt: "backup-list" });
    },

    backup: function (name) {
        return apiPostJson("./php/backup_restore.php", { oper: "backup", input: name });
    },

    restore: function (name) {
        return apiPostJson("./php/backup_restore.php", { oper: "restore", input: name });
    },

    removeBackup: function (name) {
        return apiPostJson("./php/backup_restore.php", { oper: "delete", input: name });
    }
};

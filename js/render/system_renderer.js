var systemRenderer = {
    renderSqlResult: function (box, data) {
        var thead = box.querySelector("#rst-ls-head");
        var tbody = box.querySelector("#rst-ls-body");

        tableRenderer.fillHeadByKeys(thead, data.length > 0 ? Object.keys(data[0]) : []);
        tableRenderer.fillBody(tbody, data);
    },

    clearSqlResult: function (box) {
        box.querySelector("#rst-ls-head").innerHTML = "";
        box.querySelector("#rst-ls-body").innerHTML = "";
    },

    renderBackupList: function (tbody, data) {
        tbody.innerHTML = "";
        if (!Array.isArray(data)) return;

        data.forEach(function (item) {
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var link = document.createElement("a");
            link.textContent = item;
            cell.appendChild(link);
            row.appendChild(cell);
            tbody.appendChild(row);
        });
    },

    syncBackupOptions: function (box) {
        var rdSelect = box.querySelector(".rd-select");
        rdSelect.innerHTML = "";

        box.querySelectorAll("#rst-ls-body td a").forEach(function (link) {
            var option = document.createElement("option");
            option.textContent = link.textContent;
            rdSelect.appendChild(option);
        });
    },

    setBackupAdminControlsVisible: function (box, visible) {
        box.querySelector("#r-d-div").style.display = visible ? "" : "none";
    }
};

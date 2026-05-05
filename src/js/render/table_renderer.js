var tableRenderer = {
    getDisplayText: function (value) {
        return (value != null && value !== "") ? value : "未设置";
    },

    fillBody: function (tbody, data) {
        tbody.innerHTML = "";
        if (!Array.isArray(data)) return;

        data.forEach(function (item) {
            var row = document.createElement("tr");
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var cell = document.createElement("td");
                    cell.textContent = tableRenderer.getDisplayText(item[key]);
                    row.appendChild(cell);
                }
            }
            tbody.appendChild(row);
        });
    },

    fillBodyByKeys: function (tbody, data, keys) {
        tbody.innerHTML = "";
        if (!Array.isArray(data)) return;

        data.forEach(function (item) {
            var row = document.createElement("tr");
            keys.forEach(function (key) {
                var cell = document.createElement("td");
                cell.textContent = tableRenderer.getDisplayText(item[key]);
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    },

    fillHeadByKeys: function (thead, keys) {
        thead.innerHTML = "";
        if (!Array.isArray(keys) || keys.length === 0) return;

        var row = document.createElement("tr");
        keys.forEach(function (key) {
            var cell = document.createElement("td");
            cell.textContent = key;
            row.appendChild(cell);
        });
        thead.appendChild(row);
    }
};

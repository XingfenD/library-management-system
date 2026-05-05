hori_btn_func["查询馆藏"] = async function (user, box) {
    var tbody = box.querySelector("#book-ls-body");

    box.querySelector(".search-btn").addEventListener("click", async function () {
        var rcv = await libraryApi.searchBooks(
            box.querySelector("#book-selector").value,
            box.querySelector("#search-ctnt").value
        );
        tableRenderer.fillBody(tbody, rcv);
    });
};

hori_btn_func["借阅记录"] = async function (user, box) {
    var tbody = box.querySelector("#rcd-ls-body");

    libraryRenderer.setRecordSearchVisible(box, user.authority >= 2);

    async function loadRecords(isSelf) {
        var select = isSelf ? "账号" : box.querySelector("#rcd-selector").value;
        var input = isSelf ? "self" : box.querySelector("#search-ctnt").value;
        var rcv = await libraryApi.getRecords(select, input);
        tableRenderer.fillBody(tbody, rcv);
    }

    box.querySelector(".search-btn").addEventListener("click", function () {
        loadRecords(false);
    });

    box.querySelector(".br-submit-btn").addEventListener("click", async function () {
        try {
            var rcv = await libraryApi.submitBorrowReturn(
                box.querySelector("#comm-div select").selectedOptions[0].textContent,
                box.querySelector(".br-book-input").value
            );
            showToast(rcv.msg);
            loadRecords(true);
        } catch (e) {
            showToast("Something went wrong");
        }
    });

    loadRecords(true);
};

hori_btn_func["图书入库"] = async function (user, box) {
    box.querySelector("#book_info_btn").addEventListener("click", async function () {
        var name = box.querySelector("#book-info-input0").value;
        var price = box.querySelector("#book-info-input1").value;

        if (!name || !price) {
            showToast("输入不能为空!");
            return;
        }

        try {
            var rcv = await libraryApi.storeBook(name, price);
            showToast(rcv.status == 0 ? "入库成功!" : "Something went wrong");
        } catch (e) {
            showToast("Something went wrong");
        }
    });
};

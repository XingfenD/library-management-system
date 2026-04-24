var libraryApi = {
    searchBooks: function (select, input) {
        return apiPost({
            oper: "get",
            ctnt: "book-list",
            select: select,
            input: input
        });
    },

    getRecords: function (select, input) {
        return apiPost({
            oper: "get",
            ctnt: "rcd-list",
            select: select,
            input: input
        });
    },

    submitBorrowReturn: function (select, input) {
        return apiPost({
            oper: "post",
            ctnt: "br-book",
            select: select,
            input: input
        });
    },

    storeBook: function (name, price) {
        return apiPost({
            oper: "post",
            ctnt: "book-list",
            "书名": name,
            "价格": price
        });
    }
};

const hori_btn_func = { // 设置按钮功能同时渲染box
    "仪表盘": async function (uname_auth, box) {
        box.innerHTML = '';
        box.id = "dash-board";
        var box = $("#dash-board");

        // block1
        var block1 = $("<div>", {id: "block1", class: "block", type: "left-float"});
        var auth_list = ["游客", "普通用户", "管理员","中级管理员", "超级管理员"];
        block1.append($(`<p>欢迎回来</p>`));
        block1.append($(`<p>${auth_list[uname_auth['authority']]}: ${uname_auth['username']}</p>`));
        box.append(block1);

        // block2
        var block2 = $("<div>", {id: "block2", class: "block", type: "right-float"});
        block2.append($(`<label>`).text("近期新增图书").attr("class", "sheet-label"));
        
        var table_2 = $("<table>");
        var table_head = ["书籍编号", "书名", "入库日期"];
        var tr = $("<tr>");
        table_head.forEach(function (item) {
            tr.append($("<td>").text(item));
        });
        table_2.append(tr);
        block2.append(table_2);
        box.append(block2);

        $.ajax({
            type: "POST",
            async: true,
            dataType: "json",
            data: {
                "oper": "get",
                "ctnt": "book-in-week"
            },
            url: "../php/mainpage_backend.php",
            success: function (msg) {
                console.log(msg);
                var table = $("table").eq(0);
                msg.forEach(function (item) {
                    var tr = $("<tr>");
                    tr.append($("<td>").text(item['书籍编号']));
                    tr.append($("<td>").text(item['书名']));
                    tr.append($("<td>").text(item['入库日期']));
                    table.append(tr);
                })
            },
            error: function(msg) {
                console.log(msg);
            }

        })


        // block3
        if (uname_auth['authority'] >= 2) {
            var block3 = $("<div>", {id: "block3", class: "block", type: "left-float"});
            block3.append($(`<label>`).text("近期注册用户").attr("class", "sheet-label"));
            box.append(block3);

            var table_3 = $("<table>");
            var table_head_3 = ["uuid", "用户名", "注册时间"];
            var tr_3 = $("<tr>");
            table_head_3.forEach(function (item) {
                tr_3.append($("<td>").text(item));
            });
            table_3.append(tr_3);
            block3.append(table_3);
            box.append(block3);

            $.ajax({
                type: "POST",
                async: true,
                dataType: "json",
                data: {
                    "oper": "get",
                    "ctnt": "user-in-week"
                },
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    console.log(msg);
                    var table = $("table").eq(1);
                    msg.forEach(function (item) {
                        var tr = $("<tr>");
                        tr.append($("<td>").text(item['uuid']));
                        tr.append($("<td>").text(item['用户名']));
                        tr.append($("<td>").text(item['注册日期']));
                        table.append(tr);
                    })
                },
                error: function(msg) {
                    console.log(msg);
                }

            })
        }

        // block4
        if (uname_auth['authority'] >= 3) {
            var block4 = $("<div>", {id: "block4", class: "block", type: "right-float"});
            block4.append($(`<label>`).text("近期请求次数").attr("class", "sheet-label"));
            box.append(block4);
            block4.append($("<canvas>", {id :"request-chart"}));
            $.ajax({
                type: "POST",
                async: true,
                dataType: "json",
                data: {
                    "oper": "get",
                    "ctnt": "request-list"
                },
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    console.log(msg);
                    labels = ['一小时内', '两小时', '三小时', '四小时', '五小时'];
                    var ctx = document.getElementById('request-chart').getContext('2d');

                    // 创建 Chart.js 折线图
                    var myLineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: '近五个小时内访问数',
                                data: msg,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'black',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    display: false // 禁用图例
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                },
                error: function(msg) {
                    console.log(msg);
                }

            })
        }
    },
    "推荐": async function (uname_auth, box) {
        box.innerHTML = '';
        box.id = "recommend";
        var para1 = document.createElement("a");
        para1.setAttribute("class", "text title");
        var text1 = document.createTextNode(`你好`);
        var para2 = document.createElement("a");
        para2.setAttribute("class", "text para");
        var text2 = document.createTextNode(`${uname_auth['username']}，你的权限是${uname_auth['authority']}`);

        para1.appendChild(text1);
        para2.appendChild(text2);
        box.appendChild(para1);
        box.appendChild(para2);
    },
    "查询馆藏": async function (uname_auth, box) {
        box.innerHTML = "";
        box.id = "search-book";
        var book_list_div = document.createElement("div");
        var search_book_div = document.createElement("div");

        book_list_div.setAttribute("id", "book-list-div");
        search_book_div.setAttribute("class", "search_book_div");
        var book_select_lable = document.createElement("lable");
        var lable_text = document.createTextNode("搜索的属性")
        book_select_lable.appendChild(lable_text);
        search_book_div.appendChild(book_select_lable);

        var book_select = document.createElement("select");
        book_select.setAttribute("id", "book-selector");
        book_select.setAttribute("title", "属性选择");
        var select_option = ["book-id","书名", "入库时间"];
        select_option.forEach(function(item) {
            var option = document.createElement("option");
            option.setAttribute("class", "book-select-option");
            var text = document.createTextNode(item);
            option.appendChild(text);
            book_select.appendChild(option);
        });

        var search_ctnt = document.createElement("input");
        search_ctnt.setAttribute("id", "search-ctnt");
        search_ctnt.setAttribute("placeholder", "请输入搜索内容");
        search_ctnt.type="text";
        var search_btn = document.createElement("input");
        search_btn.setAttribute("type", "button");
        search_btn.setAttribute("value", "搜索");
        search_book_div.appendChild(book_select);
        search_book_div.appendChild(search_ctnt);
        search_book_div.appendChild(search_btn);
        

        var rst_ls_table = document.createElement("table");
        rst_ls_table.setAttribute("id", "rst-ls-table");
        var rst_ls_h = document.createElement("thead");
        var tr_ls = ["book-id", "书名", "入库时间", "当前状态", "标的价格"];
        var h_tr = document.createElement("tr");
        tr_ls.forEach(function(item) {
            var td = document.createElement("td");
            var text = document.createElement("a");
            var text_ctnt = document.createTextNode(item);
            var sorter = document.createElement("a");
            text.appendChild(text_ctnt);
            sorter.setAttribute("class", "book-ls-sorter");
            sorter.innerHTML += ``;
            td.appendChild(text);
            td.appendChild(sorter);
            h_tr.appendChild(td);
        });
        rst_ls_h.appendChild(h_tr);
        rst_ls_table.appendChild(rst_ls_h);
        var rst_ls_body = document.createElement("tbody");
        rst_ls_body.setAttribute("id", "book-ls-body");
        rst_ls_table.appendChild(rst_ls_body);
        book_list_div.appendChild(search_book_div);
        book_list_div.appendChild(rst_ls_table);

        box.appendChild(book_list_div);

        search_btn.addEventListener("click", async function () {
            var selector = document.querySelector("#book-selector");
            var ctnt = document.querySelector("#search-ctnt");
            var data = {
                "oper": "get",
                "ctnt": "book-list",
                "select": selector.selectedOptions[0].textContent,
                "input": ctnt.value
            };
            var rcv;
            await $.ajax({
                type: "POST",
                async: true,
                data:data,
                dataType:"json",
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    rcv = msg;
                    console.log(msg);
                },
                error: function(msg) {
                    console.log(msg);
                }
            });

            var tbody = document.querySelector("#book-ls-body");
            tbody.innerHTML = '';
            rcv.forEach(item => {
                // 创建新的表格行
                let row = document.createElement('tr');
            
                // 遍历字典中的键值对
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        // 创建新的单元格
                        let cell = document.createElement('td');
                        // 将键值对的值设置为单元格的文本内容
                        if (item[key] != null && item[key] != '') {
                            cell.textContent = item[key];
                        } else {
                            cell.textContent = "未设置";
                        }

                        // 将单元格添加到表格行中
                        row.appendChild(cell);
                    }
                }
            
                // 将新的表格行添加到tbody中
                tbody.appendChild(row);
            });
        });
    },
    "借阅记录": async function (uname_auth, box) { // 
        box.innerHTML = "";
        box.id = "rcd-list";
        var rcd_list_div = document.createElement("div");
        var search_rcd_div = document.createElement("div");

        rcd_list_div.setAttribute("id", "rcd-list-div");
        search_rcd_div.setAttribute("class", "search_rcd_div");
        var rcd_select_lable = document.createElement("lable");
        var lable_text = document.createTextNode("搜索的属性")
        rcd_select_lable.appendChild(lable_text);
        search_rcd_div.appendChild(rcd_select_lable);

        var rcd_select = document.createElement("select");
        rcd_select.setAttribute("id", "rcd-selector");
        rcd_select.setAttribute("title", "属性选择");
        var select_option = ["订单编号","book-id", "书名", "UUID","账号", "姓名", "卡号"];
        select_option.forEach(function(item) {
            var option = document.createElement("option");
            option.setAttribute("class", "rcd-select-option");
            var text = document.createTextNode(item);
            option.appendChild(text);
            rcd_select.appendChild(option);
        });

        var search_ctnt = document.createElement("input");
        search_ctnt.setAttribute("id", "search-ctnt");
        search_ctnt.setAttribute("placeholder", "请输入搜索内容");
        search_ctnt.type="text";
        var search_btn = document.createElement("input");
        search_btn.setAttribute("type", "button");
        search_btn.setAttribute("value", "搜索");
        search_rcd_div.appendChild(rcd_select);
        search_rcd_div.appendChild(search_ctnt);
        search_rcd_div.appendChild(search_btn);
        
        var command_div = document.createElement("div");
        command_div.id= "comm-div";
        var label = document.createElement('label');
        label.textContent = '书本uuid为';

        // 创建并添加input[type="text"]
        var inputText = document.createElement('input');
        inputText.type = 'text';
        
        // 创建并添加select
        var select = document.createElement('select');

        // 创建并添加option - 借书
        var optionBorrow = document.createElement('option');
        optionBorrow.value = 'borrow';
        optionBorrow.textContent = '借书';
        select.appendChild(optionBorrow);

        // 创建并添加option - 还书
        var optionReturn = document.createElement('option');
        optionReturn.value = 'return';
        optionReturn.textContent = '还书';
        select.appendChild(optionReturn);

        
        // 创建并添加input[type="button"]
        var inputButton = document.createElement('input');
        inputButton.type = 'button';
        inputButton.value = '提交';

        command_div.appendChild(select);
        command_div.appendChild(label);
        command_div.appendChild(inputText);
        command_div.appendChild(inputButton);

        inputButton.addEventListener("click", async function () {
            var select = document.querySelector("select");
            var ctnt = document.querySelector("#comm-div input[type='text']");
            var data = {
                "oper": "post",
                "ctnt": "br-book",
                "select": select.selectedOptions[0].textContent,
                "input": ctnt.value
            };

            $.ajax({
                type: "POST",
                async: true,
                data:data,
                dataType:"json",
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    rcv = msg;
                    alert(msg['msg']);
                    request(true);
                    console.log(msg);
                },
                error: function(msg) {
                    alert("Something went wrong");
                    console.log(msg);
                }
            });
        });

        box.appendChild(command_div);

        // generate the table
        var rst_ls_table = document.createElement("table");
        rst_ls_table.setAttribute("id", "rst-ls-table");
        var rst_ls_h = document.createElement("thead");
        var tr_ls = ["订单编号", "书名", "书本编号", "用户名", "姓名", "用户编号", "操作类型"];
        var h_tr = document.createElement("tr");
        tr_ls.forEach(function(item) {
            var td = document.createElement("td");
            var text = document.createElement("a");
            var text_ctnt = document.createTextNode(item);
            var sorter = document.createElement("a");
            text.appendChild(text_ctnt);
            sorter.setAttribute("class", "rcd-ls-sorter");
            sorter.innerHTML += ``;
            td.appendChild(text);
            td.appendChild(sorter);
            h_tr.appendChild(td);
        });
        rst_ls_h.appendChild(h_tr);
        rst_ls_table.appendChild(rst_ls_h);
        var rst_ls_body = document.createElement("tbody");
        rst_ls_body.setAttribute("id", "rcd-ls-body");
        rst_ls_table.appendChild(rst_ls_body);
        if (uname_auth['authority'] >= 2) {
            rcd_list_div.appendChild(search_rcd_div);
        }
        rcd_list_div.appendChild(rst_ls_table);

        box.appendChild(rcd_list_div);

        async function request(load) {
            var selector = document.querySelector("#rcd-selector");
            var ctnt = document.querySelector("#search-ctnt");
            var data = {
                "oper": "get",
                "ctnt": "rcd-list",
                "select": "账号",
                "input": "self"
            };
            if (selector != undefined && load != true) {
                data['select'] = selector.selectedOptions[0].textContent,
                data['input'] = ctnt.value
            }

            var rcv;
            await $.ajax({
                type: "POST",
                async: true,
                data:data,
                dataType:"json",
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    rcv = msg;
                    console.log(msg);
                },
                error: function(msg) {
                    console.log(msg);
                }
            });

            var tbody = document.querySelector("#rcd-ls-body");
            tbody.innerHTML = '';
            rcv.forEach(item => {
                // 创建新的表格行
                let row = document.createElement('tr');
            
                // 遍历字典中的键值对
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        // 创建新的单元格
                        let cell = document.createElement('td');
                        // 将键值对的值设置为单元格的文本内容
                        if (item[key] != null && item[key] != '') {
                            cell.textContent = item[key];
                        } else {
                            cell.textContent = "未设置";
                        }

                        // 将单元格添加到表格行中
                        row.appendChild(cell);
                    }
                }
            
                // 将新的表格行添加到tbody中
                tbody.appendChild(row);
            });
        };
        request(true);
        search_btn.addEventListener("click", request);
    },
    "图书入库": async function (uname_auth, box) {
        box.innerHTML = '';
        box.id = "book-storage";
        var book_info = ['书名', '价格'];
        var book_info_form = document.createElement("form");
        book_info_form.id = "book-in-form";
        for (var i = 0; i < book_info.length; i++) {
            var a_row = document.createElement("div");
            a_row.className = "book-info-row";
            a_row.id = "book-info-row" + i;
            var label = document.createElement("label");
            label.textContent = book_info[i] + ":";
            var input = document.createElement("input");
            input.type = "text";
            input.id = "book-info-input" + i;
            a_row.appendChild(label);
            a_row.appendChild(input);
            book_info_form.appendChild(a_row);
        }
        var btn = document.createElement("input");
        btn.type = "button";
        btn.id = "book_info_btn";
        book_info_form.appendChild(btn);
        btn.value = "入库";

        btn.addEventListener("click", function () {
            (function (form, info_ls) {
                var data = {
                    'oper':'post',
                    'ctnt':'book-list'
                };
                var inputs = form.querySelectorAll("input[type='text']");
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == null) {
                        alert("输入不能为空!");
                        return;
                    } else {
                        data[info_ls[i]] = inputs[i].value;
                    }
                }

                $.ajax({
                    type: "POST",
                    async: true,
                    data:data,
                    dataType:"json",
                    url: "../php/mainpage_backend.php",
                    success: function (msg) {
                        rcv = msg;
                        if (msg['status'] == 0) {
                            alert("入库成功!");
                        } else {
                            alert("Something went wrong");
                        }
                        console.log(msg);
                    },
                    error: function(msg) {
                        alert("Something went wrong");
                        console.log(msg);
                    }
                });
            }) (book_info_form, book_info);
        });

        box.appendChild(book_info_form);

    },
    "用户列表": async function (uname_auth, box) {
        box.innerHTML = "";
        box.id = "user-list";
        var user_list_div = document.createElement("div");
        var search_user_div = document.createElement("div");

        user_list_div.setAttribute("id", "user-list-div");
        search_user_div.setAttribute("class", "search_user_div");
        var user_select_lable = document.createElement("lable");
        var lable_text = document.createTextNode("搜索的属性")
        user_select_lable.appendChild(lable_text);
        search_user_div.appendChild(user_select_lable);

        var user_select = document.createElement("select");
        user_select.setAttribute("id", "user-selector");
        user_select.setAttribute("title", "属性选择");
        var select_option = ["UUID", "账号", "姓名", "卡号"];
        select_option.forEach(function(item) {
            var option = document.createElement("option");
            option.setAttribute("class", "user-select-option");
            var text = document.createTextNode(item);
            option.appendChild(text);
            user_select.appendChild(option);
        });

        var search_ctnt = document.createElement("input");
        search_ctnt.setAttribute("id", "search-ctnt");
        search_ctnt.setAttribute("placeholder", "请输入搜索内容");
        search_ctnt.type = "text";
        var search_btn = document.createElement("input");
        search_btn.setAttribute("type", "button");
        search_btn.setAttribute("value", "搜索");
        search_user_div.appendChild(user_select);
        search_user_div.appendChild(search_ctnt);
        search_user_div.appendChild(search_btn);
        

        var rst_ls_table = document.createElement("table");
        rst_ls_table.setAttribute("id", "rst-ls-table");
        var rst_ls_h = document.createElement("thead");
        var tr_ls = ["UUID", "账号", "姓名", "卡号", "权限", "联系电话", "邮箱"];
        var h_tr = document.createElement("tr");
        tr_ls.forEach(function(item) {
            var td = document.createElement("td");
            var text = document.createElement("a");
            var text_ctnt = document.createTextNode(item);
            var sorter = document.createElement("a");
            text.appendChild(text_ctnt);
            sorter.setAttribute("class", "user-ls-sorter");
            sorter.innerHTML += ``;
            td.appendChild(text);
            td.appendChild(sorter);
            h_tr.appendChild(td);
        });
        rst_ls_h.appendChild(h_tr);
        rst_ls_table.appendChild(rst_ls_h);
        var rst_ls_body = document.createElement("tbody");
        rst_ls_body.setAttribute("id", "user-ls-body")
        rst_ls_table.appendChild(rst_ls_body);
        user_list_div.appendChild(search_user_div);
        user_list_div.appendChild(rst_ls_table);

        box.appendChild(user_list_div);

        search_btn.addEventListener("click", async function () {
            var selector = document.querySelector("#user-selector");
            var ctnt = document.querySelector("#search-ctnt");
            var data = {
                "oper": "get",
                "ctnt": "user-list",
                "select": selector.selectedOptions[0].textContent,
                "input": ctnt.value
            };
            var rcv;
            await $.ajax({
                type: "POST",
                async: true,
                data:data,
                dataType:"json",
                url: "../php/mainpage_backend.php",
                success: function (msg) {
                    rcv = msg;
                    console.log(msg);
                },
                error: function(msg) {
                    console.log(msg);
                }
            });

            var tbody = document.querySelector("#user-ls-body");
            tbody.innerHTML = '';
            rcv.forEach(item => {
                // 创建新的表格行
                let row = document.createElement('tr');
            
                // 遍历字典中的键值对
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        // 创建新的单元格
                        let cell = document.createElement('td');
                        // 将键值对的值设置为单元格的文本内容
                        if (item[key] != null && item[key] != '') {
                            cell.textContent = item[key];
                        } else {
                            cell.textContent = "未设置";
                        }

                        // 将单元格添加到表格行中
                        row.appendChild(cell);
                    }
                }
            
                // 将新的表格行添加到tbody中
                tbody.appendChild(row);
            });
        });
        // 创建一个新的 div 元素
        var newDiv = document.createElement("div");

        // 创建 label 元素
        var label1 = document.createElement("label");
        label1.textContent = "修改uuid为";

        // 创建 input 元素
        var input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        // input1.setAttribute("id", "uuid-input");

        // 创建第二个 label 元素
        var label2 = document.createElement("label");
        label2.textContent = "的用户的";

        // 创建 select 元素
        var select = document.createElement("select");
        // select.setAttribute("id", "change-info-select");
        // 创建 select 中的选项
        var options = ["姓名", "卡号", "权限", "联系电话", "邮箱"];
        options.forEach(function(optionText) {
            var option = document.createElement("option");
            option.textContent = optionText;
            select.appendChild(option);
        });

        // 创建第三个 label 元素
        var label3 = document.createElement("label");
        label3.textContent = "为";

        // 创建第二个 input 元素
        var input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        // input2.setAttribute("id", "changed-info-input")

        // 创建 button 元素
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("value", "修改");

        // 将所有元素添加到新创建的 div 元素中
        newDiv.appendChild(label1);
        newDiv.appendChild(input1);
        newDiv.appendChild(label2);
        newDiv.appendChild(select);
        newDiv.appendChild(label3);
        newDiv.appendChild(input2);
        newDiv.appendChild(button);

        // 将新创建的 div 元素添加到 box 元素中
        box.appendChild(newDiv);

        button.addEventListener("click", function() {
            (function(input1, input2, select){
                if (/^\d{12}$/.test(input1.value)) {
                    var data = {
                        "oper":"post",
                        "ctnt":"change-info",
                        "uuid": input1.value,
                        "select": select.selectedOptions[0].textContent,
                        "set_ctnt": input2.value
                    }
                    $.ajax({
                        type: "POST",
                        async: true,
                        data:data,
                        dataType:"json",
                        url: "../php/mainpage_backend.php",
                        success: function (mes) {
                            alert(mes['msg']);
                            rcv = mes;
                            console.log(mes);
                        },
                        error: function(mes) {
                            alert("Something went wrong");
                            console.log(mes);
                        }
                    });
                } else {
                    alert("请输入12位数字的uuid!");
                }
            })(input1, input2, select);

        });
    },
    "我的信息": async function (uname_auth, box) {
        box.innerHTML = '';
        box.id = "my-info"
        var info_card = document.createElement("div");
        var user_box = document.createElement("div");
        var user_pic = document.createElement("img");
        var person_name_label = document.createElement("div");
        var tip_label = document.createElement("div");

        const data_send = {
            'oper': "get",
            'ctnt': "user-info"
        }
        var data_rcv;
        // send ajax request to the server;
        await $.ajax({
            type: "POST",
            data: data_send,
            dataType:"json",
            url: "../php/mainpage_backend.php",
            async:true,
            success:function (msg) {
                console.log(msg);
                data_rcv = msg;
            },
            error:function (msg) {
                console.log(msg);
            }
        });

        // load the data

        var tip = document.createTextNode("(头像功能暂未实现)");
        var person_name = document.createTextNode(uname_auth['username']); // <-
        
        user_pic.setAttribute("src", "../image/none_avatar.png");
        user_pic.setAttribute("alt", ".none_avatar");
        user_pic.setAttribute("height", "300");
        user_box.setAttribute("id", "user-box");
        person_name_label.setAttribute("id", "person-name");
        tip_label.setAttribute("id", "tip");
        info_card.setAttribute("id", "info-card");

        // build father-child relation
        tip_label.appendChild(tip);
        person_name_label.appendChild(person_name);
        user_box.appendChild(user_pic);
        user_box.appendChild(tip_label);
        user_box.appendChild(person_name_label);
        info_card.appendChild(user_box);
        box.appendChild(info_card);


        // info-box
        // define the widget
        var info_list = ["姓名", "卡号", "联系电话", "电子邮箱", "住址"];
        var ctnt_list = [data_rcv['u_name'], data_rcv['card_number'], data_rcv['u_tele'], data_rcv['u_email'], data_rcv['u_address']]
        var info_box = document.createElement("div");
        info_box.setAttribute("id", "info-box");
        for (var i = 0; i < info_list.length; i++) {
            var lst_div = document.createElement("div");
            var info_tag = document.createElement("a");
            var info_content = document.createElement("a");
            var info_tag_text = document.createTextNode(info_list[i] + ':');
            if (ctnt_list[i] == undefined || ctnt_list[i] == '') {
                var info_cont_text = document.createTextNode("未设置");
            } else {
                var info_cont_text = document.createTextNode(ctnt_list[i]);
            }
            info_tag.setAttribute("class", "info-tag");
            info_tag.setAttribute("id",`info-tag${i}`);
            info_content.setAttribute("class", "info_ctnt");
            info_content.setAttribute("id", `info_ctnt${i}`);
            lst_div.setAttribute("class", "info-div");
            lst_div.setAttribute("id", `info-div${i}`);

            info_tag.appendChild(info_tag_text);
            info_content.appendChild(info_cont_text);
            lst_div.appendChild(info_tag);
            lst_div.appendChild(info_content);
            info_box.appendChild(lst_div);
        }
        info_card.appendChild(info_box);
    },
    "修改信息": async function (uname_auth, box) { // 
        box.innerHTML = '';
        box.id = "change-info";
        var change_info_box = document.createElement("div");
        change_info_box.setAttribute("id", "info-input");
        var info_list = {
            "姓名": "u_name",
            "卡号": "card_number",
            "联系电话": "u_tele",
            "电子邮箱": "u_email",
            "住址": "u_address"
        };

        var info_box_lable = document.createElement("div");
        var self_info_form = document.createElement("form");
        var self_info_btn = document.createElement("input");
        self_info_form.setAttribute("id", "self-info-form");
        info_box_lable.setAttribute("id", "info-box-lable");
        info_box_lable.appendChild(document.createTextNode("个人信息更改"));
        self_info_btn.setAttribute("type", "button");
        self_info_btn.setAttribute("id", "self-info-btn");
        self_info_btn.setAttribute("value", "修改");
        change_info_box.appendChild(info_box_lable);
        change_info_box.appendChild(self_info_form);

        var data_rcv;
        await $.ajax({
            type: "POST",
            data: {
                'oper': "get",
                'ctnt': "user-info"
            },
            dataType:"json",
            url: "../php/mainpage_backend.php",
            async:true,
            success:function (msg) {
                console.log(msg);
                data_rcv = msg;
            },
            error:function (msg) {
                console.log(msg);
            }
        });

        // form1
        for (var i = 0; i < Object.keys(info_list).length; i++) {
            var input_div = document.createElement("div");
            var input_tag = document.createElement("a");
            var input_ctnt = document.createElement("input");
            var tag_ctnt = document.createTextNode(Object.keys(info_list)[i] + ': ');

            input_div.setAttribute("id", `input-div${i}`);
            input_div.setAttribute("class", `info-input-div`);
            input_tag.setAttribute("id", `input-tag${i}`);
            input_tag.setAttribute("class", `info-input-tag`);
            input_ctnt.setAttribute("id", `input-ctnt${i}`);
            input_ctnt.setAttribute("class", `info-input-ctnt`);
            input_ctnt.type = "text";
            input_ctnt.setAttribute("placeholder", Object.keys(info_list)[i]);
            if (data_rcv[Object.values(info_list)[i]] != undefined) {
                input_ctnt.setAttribute("value", data_rcv[Object.values(info_list)[i]]);
            }
            input_tag.appendChild(tag_ctnt);
            input_div.appendChild(input_tag);
            input_div.appendChild(input_ctnt);
            self_info_form.appendChild(input_div);
        }
        self_info_form.appendChild(self_info_btn);

        var acct_list = {
            '用户名': 'username',
            '密码': 'password',
            '再次输入': 're-password'
        };
        var acct_lable = document.createElement("div");
        var acct_info_form = document.createElement("form");
        var acct_info_btn = document.createElement("input");
        acct_info_form.setAttribute("id", "acct-info-form");
        acct_lable.setAttribute("id", "acct-lable");
        acct_lable.appendChild(document.createTextNode("账户信息更改"));
        acct_info_btn.setAttribute("type", "button");
        acct_info_btn.setAttribute("id", "acct-info-btn");
        acct_info_btn.setAttribute("value", "修改");
        change_info_box.appendChild(acct_lable);
        change_info_box.appendChild(acct_info_form);

        // form2
        for (var i = 0; i < Object.keys(acct_list).length; i++) {
            var input_div = document.createElement("div");
            var input_tag = document.createElement("a");
            var input_ctnt = document.createElement("input");
            var tag_ctnt = document.createTextNode(Object.keys(acct_list)[i] + ': ');

            input_div.setAttribute("id", `acct-input-div${i}`);
            input_div.setAttribute("class", `info-input-div`);
            input_tag.setAttribute("id", `acct-input-tag${i}`);
            input_tag.setAttribute("class", `info-input-tag`);
            input_ctnt.type = "text";
            if (Object.keys(acct_list)[i] != '用户名') {
                input_ctnt.setAttribute("type", "password");
            } else {
                input_ctnt.setAttribute("value", uname_auth['username']);
            }
            input_ctnt.setAttribute("id", `acct-input-ctnt${i}`);
            input_ctnt.setAttribute("class", `info-input-ctnt`);
            input_ctnt.setAttribute("placeholder", Object.keys(acct_list)[i]);
            input_tag.appendChild(tag_ctnt);
            input_div.appendChild(input_tag);
            input_div.appendChild(input_ctnt);
            acct_info_form.appendChild(input_div);
        }
        acct_info_form.appendChild(acct_info_btn);
        

        // add event listenner
        self_info_btn.addEventListener("click", function () {
            var info_list = {
                "姓名": "u_name",
                "卡号": "card_number",
                "联系电话": "u_tele",
                "电子邮箱": "u_email",
                "住址": "u_address"
            };
            var data = {
                'oper': "post",
                'ctnt': 'user-info'
            };
            inputs = this.parentElement.querySelectorAll("input.info-input-ctnt");

            // check the info
            if ((function (input_elms) {
                for (var i = 0; i < input_elms.length; i++) {
                    if (input_elms[i].getAttribute("placeholder") == "卡号") {
                        var patt1 = /^\d{13}$/;
                        if (!patt1.test(input_elms[i].value)) {
                            alert("校园卡号应为13位数字!");
                            return false;
                        }
                    } else if (input_elms[i].getAttribute("placeholder") == "联系电话") {
                        var patt2 = /^\d{11}$/;
                        if (!patt2.test(input_elms[i].value)) {
                            alert("电话号码应为11位数字!");
                            return false;
                        }
                    } else if (input_elms[i].getAttribute("placeholder") == "电子邮箱") {
                        var patt3 = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
                        if (!patt3.test(input_elms[i].value)) {
                            alert("邮箱格式非法!");
                            return false;
                        }
                    }
                }
                return true;
            }) (inputs)) {
                inputs.forEach(function(item) {
                    data[info_list[item.getAttribute("placeholder")]] = encryptPassword(item.value); // encrypt the infomation
                });
                $.ajax({
                    type: "POST",
                    data: data,
                    url: '../php/mainpage_backend.php',
                    dataType: "json",
                    async: true,
                    success: function (res) {
                        console.log(res);
                        alert("修改成功!");
                    },
                    error: function (res) {
                        alert("修改失败")
                        console.log(res);
                    }
                });
            };

        });

        acct_info_btn.addEventListener("click", function () {
            var acct_list = {
                '用户名': 'username',
                '密码': 'password',
                '再次输入': 're-password'
            };
            var data = {
                'oper': "post",
                'ctnt': 'acct-info'
            };
            inputs = this.parentElement.querySelectorAll("input.info-input-ctnt");

            var msg = info_check(inputs[0].value, inputs[1].value, inputs[2].value);
            if (msg == "true") {
                data['username'] = inputs[0].value;
                data['password'] = encryptPassword(inputs[1].value);
                $.ajax({
                    type: "POST",
                    data: data,
                    url: '../php/mainpage_backend.php',
                    dataType: "json",
                    async: true,
                    success: function (res) {
                        console.log(res);
                        if (res['status'] == 0) {
                            alert("修改密码成功!");
                        } else {
                            alert(res['msg']);
                        }
                    },
                    error: function (res) {
                        console.log(res);
                        alert("修改密码失败");
                    }
                })
            } else {
                alert(msg);
            }

            // 
        });
        box.appendChild(change_info_box);
    },
    "帮助文档": async function (uname_auth, box) {
        box.innerHTML = '<iframe src="../html/help.html" title="项目介绍" style="height:605px; width:99%; margin:0 auto;"></iframe>';
        box.id = "help";
    },
    "项目介绍": async function (uname_auth, box) {
        box.innerHTML = '<iframe src="../html/project_info.html" title="项目介绍" style="height:605px; width:99%; margin:0 auto;"></iframe>'
        box.id = "project-info";
    },
    "SQL执行": async function (uname_auth, box) {
        box.innerHTML = '';
        box.id = "sql-execute";
        box = $(".box");
        var search_div = $("<div>").attr("class", "search-div");
        var label = $("<label>").text("SQL:");
        // 创建input
        var input = $("<input>", {type: "text", id: "sql-input", placeholder: "sql语句"});
        // 创建button
        var button = $("<input>").attr("type", "button").attr("value", "提交");


        // add eventlistener
        button.on("click", async function () {
            var each_tr = document.querySelectorAll("tr");
            each_tr.forEach(function(item) {
                item.innerHTML = '';
            })
            var data_rcv;
            await $.ajax({
                type: "POST",
                data: {
                    'oper': "post",
                    'ctnt': "sql",
                    'input': $("#sql-input").val()
                },
                dataType:"json",
                url: "../php/mainpage_backend.php",
                async:true,
                success:function (msg) {
                    console.log(msg);
                    data_rcv = msg;
                },
                error:function (msg) {
                    console.log(msg);
                    alert("Something went wrong");
                }
            });
            
            // judge the data
            var thead = $("thead");
            var tbody = $("tbody");

            // 向thead中添加tr标签，tr标签内的td为字典的键
            var keys = Object.keys(data_rcv[0]);
            var theadTr = $("<tr></tr>");
            keys.forEach(function(key) {
                theadTr.append("<td>" + key + "</td>");
            });
            thead.append(theadTr);

            // 向tbody中添加多个tr标签，tr标签内的td为字典的值
            data_rcv.forEach(function(item) {
                var tbodyTr = $("<tr></tr>");
                keys.forEach(function(key) {
                    tbodyTr.append("<td>" + item[key] + "</td>");
                });
                tbody.append(tbodyTr);
            });
        });
        // 添加元素到box中
        search_div.append(label);
        search_div.append(input);
        search_div.append(button);

        box.append(search_div);

        var rst_ls_table = $("<table>", { id: "rst-ls-table" });
        var rst_ls_h = $("<thead>", {id: "rst-ls-head"});
        var head_tr = $("<tr>");
        var rst_ls_body = $("<tbody>", { id: "rst-ls-body" });
        rst_ls_h.append(head_tr);
        rst_ls_table.append(rst_ls_h);
        rst_ls_table.append(rst_ls_body);
        search_div.append(rst_ls_table);


    },
    "备份与恢复": async function (uname_auth, box) {
        box.id = "backup-restore"
        box.innerHTML = '';
        box = $(".box");

        // button1 备份
        var backup_div = $("<div>", {id:"backup-div"});
        var input = $('<input>', {type:"text", placeholder:"请输入数据库备份名"});
        var button = $('<input>', {type: "button", value:"备份"});


        backup_div.append(input);
        backup_div.append(button);
        box.append(backup_div);


        async function write_to_table() {
            var data_rcv;
            await $.ajax({
                type: "POST",
                data: {
                    'oper': "get",
                    'ctnt': "backup-list",
                },
                dataType:"json",
                url: "../php/mainpage_backend.php",
                async:true,
                success:function (msg) {
                    console.log(msg);
                    data_rcv = msg
                },
                error:function (msg) {
                    console.log(msg);
                    alert("Something went wrong");
                }
            });
            var rst_ls_body = document.querySelector("#rst-ls-body");
            rst_ls_body.innerHTML = '';
            data_rcv.forEach(function(item) {
                var tr = document.createElement("tr");
                tr.innerHTML = `<td><a>${item}</a></td>`;
                rst_ls_body.append(tr);
            });
        };

        button.on("click", function () {
            (function (input) {
                if (input.val() != "") {
                    $.ajax({
                        data: {
                            "oper": "backup",
                            "input": input.val()
                        },
                        async: true,
                        dataType: "json",
                        url: "../php/backup_restore.php",
                        type: "POST",
                        success: function(msg) {
                            console.log(msg);
                            alert(msg);
                        },
                        error: function(msg) {
                            console.log(msg);
                        }
                    });
                    write_to_table();

                } else {
                    alert("备份名称不能为空!");
                }
            })(input);
        });

        // table
        var rst_ls_table = $("<table>", { id: "rst-ls-table" });
        var rst_ls_h = $("<thead>", {id: "rst-ls-head"});
        var head_tr = $("<tr>");
        head_tr.append($(`<td><a>备份名称</a></td>`))
        var rst_ls_body = $("<tbody>", { id: "rst-ls-body" });
        rst_ls_h.append(head_tr);
        rst_ls_table.append(rst_ls_h);
        rst_ls_table.append(rst_ls_body);
        box.append(rst_ls_table);

        await write_to_table();
        
        
        if (uname_auth['authority'] >= 4) {
            // button2&3 恢复/删除
            var r_d_div = $("<div>", {id:"r-d-div"});
            var r_d_select = $("<select>", {title: "r-d-select", placeholder: "在这里选择备份文件名"});
            var restore_button = $('<input>', {type: "button", value:"恢复"});
            var delete_button = $('<input>', {type: "button", value:"删除"});

            r_d_div.append(r_d_select);
            r_d_div.append(restore_button);
            r_d_div.append(delete_button);
            box.append(r_d_div);

            function flash_select() {
                (function (select) {
                    a = document.querySelectorAll("tbody td a");
                    select.empty();
                    a.forEach(function (item) {
                        var option = $("<option>").text(item.textContent);
                        select.append(option);
                    });
                })(r_d_select);
            };
            flash_select();
            r_d_select.on("click", flash_select);

            restore_button.on("click", function () {
                (function (select) {
                    var r = confirm(`确认恢复至备份文件${select.val()}吗?\n恢复之前建议先备份当前状态!`);
                    if (r == true) {
                        $.ajax({
                            data: {
                                "oper": "restore",
                                "input": select.val()
                            },
                            async: true,
                            dataType: "json",
                            url: "../php/backup_restore.php",
                            type: "POST",
                            success: function(msg) {
                                console.log(msg);
                                alert("恢复成功！");
                            },
                            error: function(msg) {
                                console.log(msg);
                            }
                        }); 
                    }
                })(r_d_select)
            });

            delete_button.on("click", function () {
                (function (select) {
                    var r = confirm(`确认删除备份文件${select.val()}吗?`);
                    if (r == true) {
                        $.ajax({
                            data: {
                                "oper": "delete",
                                "input": select.val()
                            },
                            async: true,
                            dataType: "json",
                            url: "../php/backup_restore.php",
                            type: "POST",
                            success: function(msg) {
                                console.log(msg);
                                flash_select();
                            },
                            error: function(msg) {
                                console.log(msg);
                            }
                        });
                        write_to_table();
                    }
                })(r_d_select)
            });
        }
    }
}

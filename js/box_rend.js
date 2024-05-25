const hori_btn_func = { // 设置按钮功能同时渲染box
    "推荐": async function (uname_auth, box) {
        box.innerHTML = '';
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
    "借阅记录": async function (uname_auth, box) { // 
        box.innerHTML = '';
    },
    "我的信息": async function (uname_auth, box) {
        box.innerHTML = '';
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
            if (ctnt_list[i] == undefined) {
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
            input_ctnt.setAttribute("placeholder", Object.keys(info_list)[i]);
            input_ctnt.setAttribute("value", data_rcv[Object.values(info_list)[i]]);
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
            inputs = this.fatherElement.querySelectorAll("input");
        });
        box.appendChild(change_info_box);
    }
}
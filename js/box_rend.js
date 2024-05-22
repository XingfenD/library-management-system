const hori_btn_func = { // 设置按钮功能同时渲染box
    "1": async function (uname_auth, box) {
        for (var i = box.children.length - 1; i >= 0; i--) {
            box.children[i].remove();
        }
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
    "借阅记录": async function (uname_auth) { // 
    
    }
}
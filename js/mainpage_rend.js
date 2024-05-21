const rending = [
    function (content) {
        console.log("rending the nav0 pag");
        var uname_auth = request_uname_auth();
        var para1 = document.createElement("h1");
        para1.setAttribute("id", "hello");
        var text1 = document.createTextNode(`你好`);
        var para2 = document.createElement("p");
        var text2 = document.createTextNode(`${uname_auth['username']}，你的权限是${uname_auth['authority']}`);

        para1.appendChild(text1);
        para2.appendChild(text2);
        content.appendChild(para1);
        content.appendChild(para2);
        // content.innerHTML = `<p>你好，用户${uname_auth['username']}</p>\n`
            // + `<p>你的权限是${uname_auth['authority']}</p>`;
    },
    function (content) {
        console.log("rending the nav1 pag");
    },
    function (content) {
        console.log("rending the nav2 pag");
    },
    function (content) {
        console.log("rending the nav3 pag");
    }
]

function request_uname_auth() {
    var rt;
    $.ajax({
        type: "GET",
        url: "../php/uname_auth_backend.php", // the corresponding back-end script
        async: false,
        success: function(res) {  // if get the return successfully
            console.log(res);
            rt = res;
        }
    })
    return rt;
}
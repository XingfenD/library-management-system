var nav_btns = document.querySelectorAll(".nav-btn"); 

// add click event
for (var i = 0;i < nav_btns.length; i++) {
    // click to switch active element
    nav_btns[i].addEventListener("click", function() {
        var nav_btns = document.querySelectorAll('a[type="active"]');
        nav_btns.forEach(function(item) {
            item.setAttribute("type", "");
        });
        this.setAttribute("type", "active");
    })

    //
    nav_btns[i].addEventListener("click", function() {
        console.log('Click event triggered, starting render the content');
        // remove the former content
        var content = document.querySelector(".content");
        content.innerHTML = '';
        rending[Number(this.getAttribute("id").substr(3))](content);
    })
}

// call the event of mainpage
document.querySelector('#nav0').click();
var nav_btns = document.querySelectorAll(".nav-btn"); 

// add click event
for (var i = 0;i < nav_btns.length; i++) {
    // set element id
    nav_btns[i].setAttribute("id", `nav${i}`);

    // click to switch active element
    nav_btns[i].addEventListener("click", function() {
        var nav_btns = document.querySelectorAll('a[type="active"]');
        nav_btns.forEach(function(item) {
            item.setAttribute("type", "");
        });
        this.setAttribute("type", "active");
    })

    // rend the page
    nav_btns[i].addEventListener("click", async function() {
        console.log('Click event triggered, starting render the content');
        // remove the former content
        var content = document.querySelector(".content");
        content.innerHTML = '';
        var loading = document.createElement("div");
        loading.setAttribute("id", "wave1");
        content.appendChild(loading);
        await rending(this.textContent.trim());
        content.removeChild(loading);
    })

    // move slider
    nav_btns[i].addEventListener("click", function() {
        var slider = document.querySelector('.verti-slider');
        var nav_btns = document.querySelectorAll(".nav-btn");
        slider.setAttribute("style", `top:-${41 * (nav_btns.length - Number(this.getAttribute("id").substr(3)))}px`);
    })

}

// call the event of mainpage
document.querySelector('#nav0').click();
var toastContainer = null;

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

function showToast(msg) {
    var el = document.createElement("div");
    el.className = "toast-item";
    el.textContent = msg;
    getToastContainer().appendChild(el);
    setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 2800);
}

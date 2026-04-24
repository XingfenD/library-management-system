function apiPost(data, url) {
    return $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: url || "./php/mainpage_backend.php"
    });
}

function apiGetJson(url, data) {
    return $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json"
    });
}

function apiPostJson(url, data) {
    return $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json"
    });
}

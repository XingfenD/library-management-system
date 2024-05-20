<!DOCTYPE html>
<?php 
    session_start();
    if (!isset($_SESSION['username'])) {
        echo '<script>alert("未登录请先登录");</script>';
        echo '<script>window.location.replace("./html/log_in.html");</script>';
        exit;
    } else {
        $username = $_SESSION['username'];
        $authority = $_SESSION['authority'];
    }
?>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图书馆信息管理系统</title>
    <link rel="stylesheet" type="text/css" href="./css/mainpage.css">
    <link rel="icon" href="../image/favicon.ico"> <!--the icon of the entry page-->
    <link rel="icon" href="../image/favicon.ico">  <!--page icon-->
</head>
<body>
    <nav>
        <ul class="nav">
            <li><a href="#" id="nav1">首页</a></li>
            <li><a href="#content2" id="nav2">详情</a></li>
            <li><a href="#content3" id="nav3">个人中心</a></li>
        </ul>
    </nav>
    <div class="box">
        <div id="content1" class="content">
            <p class="placeholder"></p>
            <p>首页</p>
        </div>
        <div id="content2" class="content">
            <p class="placeholder"></p>
            <p>详情</p>
        </div>
        <div id="content3" class="content">
            <p class="placeholder"></p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
            <p>yuanshen</p>
        </div>
    </div>
</body>
</html>
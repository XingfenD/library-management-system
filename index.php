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

    <script src="./js/jquery-3.7.1.min.js"></script>
</head>
<body>
    <nav>
        <ul class="nav">
            <li><a class="nav-btn" id="nav0" type="active">首页</a></li>
            <li><a class="nav-btn" id="nav1" type>详情</a></li>
            <li><a class="nav-btn" id="nav2" type>个人中心</a></li>
            <?php
                if ($authority != 19) {
                    echo '<li><a class="nav-btn" id="nav3" type>管理者页面</a></li>';
                } 
            ?>
            <li><a class="nav-btn" id="nav4" type>关于</a></li>
        </ul>
    </nav>
    
    <div class="content"></div>
</body>
<script src="./js/mainpage_rend.js"></script>
<script src="./js/mainpage.js"></script>
</html>
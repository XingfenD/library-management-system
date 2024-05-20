<?php 
    session_start();
    if (isset($_SESSION['username'])) {
        echo "你好，用户:".$_SESSION['username'];
        echo "你的权限等级为:".$_SESSION['authority'];
    } else {
        echo '<script>alert("未登录请先登录");</script>';
        echo '<script>window.location.replace("../index.html");</script>';
        exit;
    }
?>

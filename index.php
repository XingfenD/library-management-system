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
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登入</title>
    <link rel="stylesheet" type="text/css" href="../css/entry.css">
    <link rel="icon" href="../image/favicon.ico"> <!--the icon of the entry page-->
</head>
<body>
    <p>你好，用户：<?php echo $username?></p>
    <p>你的权限等级为<?php echo $authority?></p>
</body>
</html>
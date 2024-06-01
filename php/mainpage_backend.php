<?php
    header('Content-type:text/json;charset=utf-8');
    require_once "operations_define.php";
    require_once '../private/mysql-conn-config.php';

    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    session_start();
    $auth = 0;
    $uname = 'visitor';
    if (isset($_SESSION['username'])) {
        $auth = $_SESSION['authority'];
        $uname = $_SESSION['username'];
    }

    $ip = $_SERVER['REMOTE_ADDR'];
    // 插入访问记录
    $sql_rcd = "INSERT INTO request_rcd (`request_id`, `ip`, `time`) VALUES ((SELECT uuid FROM user WHERE username='".$uname."'), '".$ip."', '".date("YmdHis")."')";
    $conn->query($sql_rcd);
    // echo $sql_rcd;

    if ($_POST['oper'] == 'get') {
        if ($_POST['ctnt'] == 'user-info') { // 查询个人信息
            if ($auth >= 0) {
                echo get_user_info($conn, $uname);
            } 
        } else if ($_POST['ctnt'] == "user-list") { // 查询用户列表
            if ($auth >= 2) {
                echo json_encode(get_user_list($conn, $uname, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "book-list") { // 查询书库
            if ($auth >= 1) {
                echo json_encode(get_book_list($conn, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "rcd-list") { // 获取借阅纪录列表
            if (($auth == 1 && $_POST['input'] == 'self') || $auth >= 2) { // 普通用户只能查询自己的借阅记录
                echo json_encode(get_rcd_list($conn, $uname, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'backup-list') { // 获取备份列表
            if ($auth >= 3) {
                echo json_encode(get_backup_list());
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'book-in-week') { // 查询一周内入库图书
            echo json_encode(get_week_book($conn));
        } else if ($_POST['ctnt'] == 'user-in-week') {
            if ($auth >= 2) {
                echo json_encode(get_week_user($conn)); // 查询一周内注册用户
            } else {
                return json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'request-list') {
            if ($auth >= 3) {
                echo json_encode(get_requests_count($conn)); // 查询一周内注册用户
            } else {
                return json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else {
            echo json_encode(Array(
                "status"=> -2,
                "msg"=> "Unknown operation!"
            ));
        }
    } else if ($_POST['oper'] == 'post') {
        if ($_POST['ctnt'] == 'user-info') { // 修改个人信息
            if ($auth >= 1) {
                alter_user_info($conn, $uname, $_POST);
                echo json_encode(Array(
                    "status"=> 0,
                    "msg"=> "status"
                ));
            }
        } else if ($_POST['ctnt'] == 'acct-info') { // 修改账户
            if ($auth >= 1) {
                echo json_encode(Array(
                    "status"=> 0,
                    "msg"=> alter_acct_info($conn, $auth, $_POST)
                ));
            }
        } else if ($_POST['ctnt'] == 'change-info') { // 管理员修改用户信息
            if ($auth >= 2) {
                echo json_encode(change_user_info($conn, $auth, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'br-book') { // 借书还书
            if ($auth >= 1) {
                echo json_encode(br_book($conn, $uname,$_POST));
            }
        } else if ($_POST['ctnt'] == 'book-list') { // 入库图书
            if ($auth >= 2) {
                echo json_encode(book_store($conn, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'sql') { // 超级管理员执行sql语句
            if ($auth >= 4) {
                echo json_encode(sql_execute($conn, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else {
            echo json_encode(Array(
                "status"=> -2,
                "msg"=> "Unknown operation!"
            ));
        }
    } else {
        echo json_encode(Array(
            "status"=> -2,
            "msg"=> "Unknown operation!"
        ));
    }
    $conn->close();
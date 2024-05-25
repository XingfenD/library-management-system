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

    if ($_POST['oper'] == 'get') {
        if ($_POST['ctnt'] == 'user-info') {
            if ($auth >= 0) {
                echo get_user_info($conn, $uname);
            } 
        }
    } else if ($_POST['oper'] == 'post'){
        if ($_POST['ctnt'] == 'user-info') {
            if ($auth >= 1) {
                // echo json_encode($_POST);
                alter_user_info($conn, $uname, $_POST);
                echo json_encode(array(
                    "status"=> 0,
                    "msg"=> "status"
                ));
            }
        } else if ($_POST['ctnt'] == 'acct-info') {
            if ($auth >= 1) {
                echo alter_acct_info($conn, $uname);
            }
        }
    }
    $conn->close();
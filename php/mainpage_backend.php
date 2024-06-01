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
        } else if ($_POST['ctnt'] == "user-list") {
            if ($auth >= 2) {
                echo json_encode(get_user_list($conn, $uname, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "book-list") {
            if ($auth >= 1) {
                echo json_encode(get_book_list($conn, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "rcd-list") {
            if (($auth == 1 && $_POST['input'] == 'self') || $auth >= 2) {
                echo json_encode(get_rcd_list($conn, $uname, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'backup-list') {
            if ($auth >= 3) {
                echo json_encode(get_backup_list());
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
    } else if ($_POST['oper'] == 'post'){
        if ($_POST['ctnt'] == 'user-info') {
            if ($auth >= 1) {
                alter_user_info($conn, $uname, $_POST);
                echo json_encode(Array(
                    "status"=> 0,
                    "msg"=> "status"
                ));
            }
        } else if ($_POST['ctnt'] == 'acct-info') {
            if ($auth >= 1) {
                echo json_encode(Array(
                    "status"=> 0,
                    "msg"=> alter_acct_info($conn, $auth, $_POST)
                ));
            }
        } else if ($_POST['ctnt'] == 'change-info') {
            if ($auth >= 2) {
                echo json_encode(change_user_info($conn, $auth, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'br-book') {
            if ($auth >= 1) {
                echo json_encode(br_book($conn, $uname,$_POST));
            }
        } else if ($_POST['ctnt'] == 'book-list') {
            if ($auth >= 2) {
                echo json_encode(book_store($conn, $_POST));
            } else {
                echo json_encode(Array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == 'sql') {
            if ($auth >= 3) {
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
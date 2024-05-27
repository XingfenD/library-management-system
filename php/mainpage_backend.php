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
                // echo "yuanshen";
                echo json_encode(get_user_list($conn, $uname, $_POST));
            } else {
                echo json_encode(array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "book-list") {
            if ($auth >= 1) {
                echo json_encode(get_book_list($conn, $_POST));
            } else {
                echo json_encode(array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        } else if ($_POST['ctnt'] == "rcd-list") {
            if (($auth == 1 && $_POST['input'] == 'self') || $auth >= 2) {
                echo json_encode(get_rcd_list($conn, $uname, $_POST));
            } else {
                echo json_encode(array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
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
                echo json_encode(array(
                    "status"=> 0,
                    "msg"=> alter_acct_info($conn, $auth, $_POST)
                ));
            }
        } else if ($_POST['ctnt'] == 'change-info') {
            if ($auth >= 2) {
                echo change_user_info($conn, $auth, $_POST);
            }
        } else if ($_POST['ctnt'] == 'br-book') {
            if ($auth >= 1) {
                echo br_book($conn, $_POST);
            }
        } else if ($_POST['ctnt'] == 'book-list') {
            if ($auth >= 2) {
                echo json_encode(book_store($conn, $_POST));
            } else {
                echo json_encode(array(
                    "status"=> -1,
                    "msg"=> "you don't have the authority to do this!"
                ));
            }
        }
    }
    $conn->close();
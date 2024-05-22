<?php
    header('Content-type:text/json;charset=utf-8');
    if ($_SERVER['REQUEST_METHOD'] !='POST') {
        exit('Error request method!');
    }

    session_start();
    if (isset($_SESSION['username']) && $_POST['username'] == $_SESSION['username']) {
        session_unset();
        session_destroy();
        echo json_encode(array(
            'status'=>0,
            'msg'=>'Log out successfuly'
        ));
    } else {
        echo json_encode(array(
            'status'=>1,
            'msg'=>'Log out failed'
        ));
    }
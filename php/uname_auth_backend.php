<?php
    header('Content-type:text/json;charset=utf-8');
    session_start();
    $rt_data = array(
        "username" => "visitor",
        "authority" => 20
    );
    if (isset($_SESSION['username']) && isset($_SESSION['authority'])) {
        $rt_data['username'] = $_SESSION['username'];
        $rt_data['authority'] = $_SESSION['authority'];
    }
    echo json_encode($rt_data);
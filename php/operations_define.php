<?php
    header('Content-type:text/json;charset=utf-8');

    function get_user_info($conn, $username) {
        $sql = "SELECT * FROM user_info WHERE user_id = (SELECT uuid FROM user WHERE username = '{$username}')";
        $query_rst = $conn->query($sql);
        $row = array();
        if ($query_rst->num_rows > 0){
            $row = $query_rst->fetch_assoc();
            unset($row['user_id']);
            return json_encode($row);
        } else {
            return json_encode($row);
        }
    }

    function alter_user_info($conn, $username, $data) {
        $privateKey = file_get_contents('../private/key-pair/private_key.pem');
        $info_list = array(
            "姓名"=> "u_name",
            "卡号"=> "card_number",
            "联系电话"=> "u_tele",
            "电子邮箱"=> "u_email",
            "住址"=> "u_address"
        );
        $sql_list = array(
            "u_name" => "",
            "card_number" => "",
            "u_tele" => "",
            "u_email" => "",
            "u_address" => ""
        );
        foreach ($info_list as $iter => $item) {
            openssl_private_decrypt(base64_decode($data[$item]), $sql_list[$item], $privateKey);
        }

        $sql = "UPDATE user_info SET ";
        foreach ($sql_list as $iter => $item) {
            $sql = $sql.$iter."='".$item."'".array(",", " ")[$iter == "u_address"];
        }
        $sql = $sql."WHERE user_id=(SELECT uuid FROM user WHERE username = '{$username}')";
        $conn->query($sql);
        // return $sql;
    }
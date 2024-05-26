<?php
    header('Content-type:text/json;charset=utf-8');
    // require_once "./logout_backend.php";

    function info_check($uname, $psd, $re_psd) {
        $username_pattern = '/^\w{2,16}$/';
        $msg = "true";
    
        if ($uname === "") { // 检查用户名
            $msg = "用户名不能为空";
        } elseif (strlen($uname) < 2 || strlen($uname) > 16) {
            $msg = "用户名长度应该在2~16之间";
        } elseif (!preg_match($username_pattern, $uname)) {
            $msg = "用户名应该仅由字母、数字、下划线组成";
        } else { // 检查用户名结束
            // 检查密码
            if ($psd === "") {
                $msg = '密码不能为空!';
            } elseif (strlen($psd) < 6 || strlen($psd) > 16) {
                $msg = '密码长度应该在6~16之间';
            } else { // 检查密码结束
                // 检查确认密码
                if ($re_psd === "") {
                    $msg = '请重复输入密码!';
                } elseif ($psd !== $re_psd) {
                    $msg = '两次输入的密码不相同!';
                }
            }
        }
    
        return $msg;
    }

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

    function alter_acct_info($conn, $uname, $data) {
        $privateKey = file_get_contents('../private/key-pair/private_key.pem');
        $rt_msg = array(
            "status" => 0,
            "msg" => "success"
        );

        if ($uname != $data['username']) {
            $uname_search = "SELECT username FROM user WHERE username='{$username}'";
            $rst_uname_search = $conn->query($uname_search);
            if ($rst_uname_search->num_rows > 0) {
                $rt_msg['status'] = 1;
                $rt_msg['msg'] = 'Duplicated Account';
                return json_encode($rt_msg);
            }
        }
        $decryptedPassword = '';
        openssl_private_decrypt(base64_decode($data["password"]), $decryptedPassword, $privateKey);
        $msg = info_check($data['username'], $decryptedPassword, $decryptedPassword);
        if ($msg != "true") {
            $rt_msg['status'] = 1;
            $rt_msg['msg'] = $msg;
            return json_encode($rt_msg);
        }
        $sql = "UPDATE user SET username='".$data["username"]."', password='".password_hash($decryptedPassword, PASSWORD_BCRYPT)."' WHERE username='".$uname."'";
        $conn->query($sql);
        return json_encode($rt_msg);
    }
    
    function get_user_list($conn, $uname, $data) {
        $select_dict = array(
            "UUID"=> "uuid",
            "账号" => "username",
            "姓名"=> "uname",
            "卡号"=> "card_number"
        );
        $sql = 
        "SELECT user.uuid, user.username, user_info.u_name, user_info.card_number, user.authority, user_info.u_tele, user_info.u_email
        FROM user 
        LEFT JOIN user_info
        ON user.uuid = user_info.user_id
        WHERE ".$select_dict[$data['select']]." LIKE '%".$data['input']."%'";
        $rst = $conn->query($sql);
        $rt = [];
        $iter = 0;
        if ($rst->num_rows > 0) {
            while ($row = $rst->fetch_assoc()) {
                $rt[$iter] = array(
                    "UUID"=> $row["uuid"],
                    "账号" => $row["username"],
                    "姓名"=> $row["u_name"],
                    "卡号"=> $row["card_number"],
                    "权限"=> $row["authority"],
                    "联系电话"=> $row["u_tele"],
                    "邮箱"=> $row["u_email"]
                );
                $iter++;
            }
        }
        
        return $rt;
    }

    function change_user_info($conn, $auth, $data) {
        $dict = Array(
            "姓名" => "u_name",
            "卡号" => "card_number",
            "权限" => "authority",
            "联系电话" => "u_tele",
            "邮箱" => "u_email"
        );
        if ($auth <= (int)($conn->query("SELECT authority FROM user WHERE uuid=".$data['uuid']))->fetch_assoc()['authority']) {
            return "Your authority is not enough to do this";
        } else {
            if ($dict[$data['select']] == "authority") {
                if ((int)$data['set_ctnt'] >= $auth) {
                    return "Your authority is not enough to do this";
                }
                $conn->query("UPDATE user SET authority=".$data['set_ctnt']." WHERE uuid=".$data['uuid']);
            } else {
                $conn->query("UPDATE user_info SET ".$dict[$data['select']]."='".$data['set_ctnt']."' WHERE user_id=".$data['uuid']);
            }
        }
    }
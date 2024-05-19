<?php
    header('Content-type:text/json;charset=utf-8');//这个类型声明非常关键
    require_once '../private/mysql-conn-config.php';
    $rt_msg = array('status'=>0, 'msg'=>'Sign up successfuly');
    

    if ($_POST['request'] == 'signup') { // sign up a new account
        $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if (!$conn) {
            $rt_msg['status'] = 1;
            $rt_msg['msg'] = 'Connect database failed';
        } else {
            $privateKey = file_get_contents('../private/key-pair/private_key.pem');
            $username=$_POST['username'];
            $encryptedPassword=$_POST['password'];
            $decryptedPassword = ''; // define a var

            $uname_search = "SELECT username FROM user WHERE username='{$username}'";
            $rst_uname_search = $conn->query($uname_search);
            if ($rst_uname_search->num_rows > 0) {
                $rt_msg['status'] = 4;
                $rt_msg['msg'] = 'Duplicated Account';
            } else {
                $decrypt_rst = openssl_private_decrypt(base64_decode($encryptedPassword), $decryptedPassword, $privateKey);

                if (!$decrypt_rst) {
                    // decrypt failed
                    $rt_msg['status'] = 2;
                    $rt_msg['msg'] = 'Decryption error';
                } else { // decrypt successfuly
                    // generate uuid
                    $date = date('Ymd');
                    $new_uuid = '';
                    
                    // query the sign up users today and generate uuid
                    $sql_search = "SELECT uuid FROM user WHERE uuid LIKE '{$date}%' ORDER BY uuid DESC";
                    $rst_search = $conn->query($sql_search);
    
                    if ($rst_search->num_rows > 0) {
                        $new_end = (int)substr($rst_search->fetch_assoc()['uuid'], 8) + 1;
                        $new_uuid = sprintf("{$date}%04d", $new_end);
                    } else {
                        $new_uuid = sprintf("{$date}0000");
                    }
    
                    $hashed_psd = password_hash($decryptedPassword, PASSWORD_BCRYPT);
                    $sql_insert = "INSERT INTO user (uuid, username, password) VALUES ({$new_uuid}, '{$username}', '{$hashed_psd}')";
                     
                    if ($conn->query($sql_insert) != TRUE) {
                        $rt_msg['status'] = 3;
                        $rt_msg['msg'] = 'Insert into database failed';
                    }
                     
                }
            }
            

            // openssl_free_key($privateKey);
            $conn->close();
        }

    } else if ($_POST['request'] == 'login') { // log in a existing account
        
    }
    echo json_encode($rt_msg); // return a json data to the front-end
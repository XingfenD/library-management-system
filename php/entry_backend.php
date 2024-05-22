<?php
    header('Content-type:text/json;charset=utf-8');//这个类型声明非常关键
    require_once '../private/mysql-conn-config.php';
    $rt_msg = array('status'=>0, 'msg'=>'Sign up successfuly');
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if (!$conn) {
        $rt_msg['status'] = 1;
        $rt_msg['msg'] = 'Connect database failed';
    } else {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') { // judge the request method
            exit('Error request method!');
        }


        if ($_POST['request'] == 'signup') { // sign up a new account
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
            
        } else if ($_POST['request'] == 'login') { // log in a existing account
            $privateKey = file_get_contents('../private/key-pair/private_key.pem');
            $username=$_POST['username'];
            $encryptedPassword=$_POST['password'];
            $decryptedPassword = ''; // define a var
    
            $sql_search = "SELECT username, password,authority FROM user WHERE username='{$username}'";
            $rst_search = $conn->query($sql_search);
            if ($rst_search->num_rows == 0) {
                $rt_msg['status'] = 5;
                $rt_msg['msg'] = 'Unknown Account';
            } else {
                $decrypt_rst = openssl_private_decrypt(base64_decode($encryptedPassword), $decryptedPassword, $privateKey);
    
                if (!$decrypt_rst) {
                    // decrypt failed
                    $rt_msg['status'] = 2;
                    $rt_msg['msg'] = 'Decryption error';
                } else { // decrypt successfuly
                    // add verify contents
                    $user_account = $rst_search->fetch_assoc();
                    if (!password_verify($decryptedPassword, $user_account['password'])) {
                        $rt_msg['status'] = 6;
                        $rt_msg['msg'] = 'Password error';
                    } else {
                        $rt_msg['msg'] = 'Log in successfully';
                    }
                }
            }
        }

        if ($rt_msg['status'] == 0) {
            session_start();
            $rt_msg['msg'] = 'Log in successfully';
            $_SESSION['username'] = $username;
            if ($_POST['request'] == 'signup') {
                $_SESSION['authority'] = 19;
            } else {
                $_SESSION['authority'] = (int)$user_account['authority'];
            }
            
        }
        $conn->close();
    }

    echo json_encode($rt_msg); // return a json data to the front-end
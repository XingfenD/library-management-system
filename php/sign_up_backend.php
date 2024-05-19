<?php
header('Content-type:text/json;charset=utf-8');//这个类型声明非常关键
require_once '../private/mysql-conn-config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$privateKey = file_get_contents('../private/key-pair/private_key.pem');
$username=$_POST['username'];
$encryptedPassword=$_POST['password'];
$decryptedPassword = '';

openssl_private_decrypt(base64_decode($encryptedPassword), $decryptedPassword, $privateKey);

$data='{"username": '.$username.', "password": "'.$decryptedPassword.'"}';//组合成json格式数据
echo json_encode($data);//输出json数据 传数据给前台

<?php
header('Content-type:text/json;charset=utf-8');//这个类型声明非常关键
$username=$_POST['username'];
// $password=$_POST['password'];
 
$data='{"yuanshen":"qidong}';//组合成json格式数据
echo json_encode($data);//输出json数据 传数据给前台

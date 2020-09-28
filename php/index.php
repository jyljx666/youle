<?php
// header('Access-Control-Allow-Origin:*');//跨域访问的域名，*表示所有
// header('Access-Control-Allow-Method:POST,GET');//跨域支持的请求方式。
include('./lib/conn.php');
$sql = 'select * from youle';
$res = $mysqli->query($sql);
$arr = array();
while ($row = $res->fetch_assoc()) {
    array_push($arr, $row);
};
$json = json_encode($arr);
echo $json;

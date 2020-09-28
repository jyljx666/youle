<?php
    header('content-type:text/html;charset=utf-8');
    $mysqli_conf=array(
        'host'=>'localhost:3306',
        'db_user'=>'root',
        'db_pass'=>'root',
        'db'=>'h5-2007'
    );
    $mysqli = @new mysqli($mysqli_conf['host'],$mysqli_conf['db_user'],$mysqli_conf['db_pass']);
    if($mysqli->connect_errno){
        die('数据库连接出错'.$mysqli->connect_errno);
    };

    $mysqli->query('set names utf8');

    $db_select = $mysqli->select_db($mysqli_conf['db']);
    if(!$db_select){
        die('数据库选择错误'.$mysqli->error);
    };
?>
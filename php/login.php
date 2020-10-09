<?php
    include('./lib/conn.php');
    if(isset($_REQUEST['username'])&&isset($_REQUEST['password'])){
        $user=$_REQUEST['username'];
        $pass=$_REQUEST['password'];
        $sql = "select * from registry where username='$user' and password='$pass'";
        $res = $mysqli->query($sql);
        $mysqli->close();
        if($res->num_rows>0){
            echo '{"pd":true}';
        }else{
            echo '{"pd":false}';
        }
    }else{
        exit('非法请求');
    }
?>
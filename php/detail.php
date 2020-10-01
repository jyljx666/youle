<?php
    include('./lib/conn.php');
    if(isset($_REQUEST['sid'])){
        $sid = $_REQUEST['sid'];
        $sql="select * from youle where sid='$sid'";
        $res=$mysqli->query($sql);
        $row = $res->fetch_assoc();
        $json=json_encode($row);
        echo $json;

    }else{
        exit('非法请求');
    }


?>
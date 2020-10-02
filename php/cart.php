<?php

include('./lib/conn.php');
if(isset($_REQUEST['idlist'])){
    $sid = $_REQUEST['idlist'];
    $sql="select * from youle where sid in($sid)";
    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

}else{
    exit('非法请求');
}
?>

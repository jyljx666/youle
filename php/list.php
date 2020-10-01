<?php
    include('./lib/conn.php');

    if (isset($_REQUEST['page'])) {
        $page = $_REQUEST['page'];
    } else {
        $page = 1;
    }

    $page = $page - 1 ;
    $length = 10;

    $page*=$length;

    $sql = "SELECT * from youle LIMIT $page,$length";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;


?>
<?php
    //链接数据库
    include('./lib/conn.php');
    if(isset($_REQUEST['username'])&&isset($_REQUEST['password'])&&isset($_REQUEST['email'])){
    //接受前端发送的数据
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $email = $_REQUEST['email'];
    // 2. 验证用户名是否存在
    $sql = "select * from registry where username='$username'";
    //执行查询语句
    $res =$mysqli->query($sql);
    //num_rows查询到的个数
    if($res->num_rows>0){  // 判断数据结果行数大于0  说明有数据
        // echo '<script>alert("用户名已存在")</script>';
        // echo '<script>location.href="../zhuce.html"</script>';
        $mysqli->close();//关闭链接数据库
        die();//结束代码
    };
    //3.将数据写入数据库
    $inser = "insert into registry (username,password,email,date) values('$username', '$password', '$email',NOW())";
    //返回一个布尔值
    $ree = $mysqli->query($inser);
    $mysqli->close();//关闭数据库链接
    if($res){
        echo '{"zt":true}';
    }
    }else{
        exit('非法请求');
    };

?>
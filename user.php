<?php
    header("Access-Control-Allow-Origin:*");
    /*
        username => 字段涵义 ; 前端发送给我的用户名信息;
    */
    //1.登陆;
    //2.注册;
    $usr = $_POST["username"];
    $pwd = $_POST["password"];
    $type = $_POST["type"];  //判断是登录还是注册
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!");
        //json_encode : 对 变量进行JSON编码 返回value值的json形式  只支持utf-8格式
        /*
           $arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5); 
            echo：
            {"a":1,"b":2,"c":3,"d":4,"e":5} 

        */
           
        die(json_encode($res));
    }
    //和数据库建立连接
    require("./_connect.php");
    //把传过来的密码使用md5加密

    // $pwd = md5($pwd+7);
    //根据不同情况进行不同判断;然后执行不同sql语句
    $sql_login = "SELECT username,pwd FROM user_list";  //为boolen类型
   
    $sql_register = "INSERT user_list(
        username,pwd
    )
        VALUES 
    ('{$usr}','{$pwd}')";  //为object类型
    // $result = $conn->query($sql);
    // echo gettype($result);  boolen 或者object类型
    $result_login = $conn->query($sql_login);
    
    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = TRUE;
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["pwd"] == $pwd){
                //后台数据已经加密过，此处的pwd也已经加密了！
                $select_res = json_encode($row);
                //此函数会生成一个标准的json格式的数据,该函数只能接受 UTF-8 编码的数据 
                //直接打印$row为一个数组。不过数组里面有乱码。就是因为乱码的原因,要重新规范编码
                // $select_res = $row;
                $haspwd = TRUE;
                break;
            }
        }
    }
    if($type == "login" &&  $haspwd == TRUE){
        //用户名密码都对，登录成功
        // echo '(登录成功)';
        // die("1");
        echo "({'code':1,'result':'ouyang'})";
        return;
    }else if($type == "login"){
        //登录失败
        echo '(登录失败)';
        die("0");
    }

    if($type == "register" && $hasuser == TRUE){
        //用户名重名; => 2;
        echo '(用户名重名)';
    }else if($hasuser == FALSE){
        //注册成功成功;
        if($type == "register"){
            $result_register = $conn->query($sql_register);
        }
        echo '(注册成功)';
    }

    // echo $hasuser;

    //返回结果判定是那种操作在执行;
    // echo $hasuser;
    // echo $select_res;
?>
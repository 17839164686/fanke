define(['jquery','cookie','nav',], function(jq) {
    $("nav>ul>li").has(".subNav").nav();

    //判断是否登录的js
    var username = $.cookie("username");
    if(username){
        $(".hd_login").children(".hide").hide();
        $(".hd_login").children(".hd_username").html("您好！<span>"+username+"</span>，您已成功登录");
    }

    //渲染页面
  


});
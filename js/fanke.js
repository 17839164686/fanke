define(['jquery','cookie','nav','banner'], function(jq) {
    $("nav>ul>li").has(".subNav").nav();

    //判断是否登录的js
    var username = $.cookie("username");
    if(username){
        $(".hd_login").children(".hide").hide();
        $(".hd_login").children(".hd_username").html("您好！<span>"+username+"</span>，您已成功登录");
    }
    //banner
    //banner插件调用
    //两个个坑，一个是要加一个class名字，hd-active,这个类名就是控制z-index=2,
    //要在装banner的最外层盒子上加一个.hd-banner-container
    $(".vanclFocus")
    .hdBanner(".rslides", {
        navigation: {
            prevEl: `.prev`,
            nextEl: `.next`,
        },
        pagination: {
            el: ".rslides_tabs"
        },
        direction: "scroll",
        loop: true,
    })

    //回到顶部
    $(".BlackTop").click(function(){
        $("html,body").animate({scrollTop:0},500);
    });
});
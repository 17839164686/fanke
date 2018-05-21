function setCookie(name,value,options){
    //options可选参数；非必填；
    if(!name || !value){
        return 0;//必选参数为空，没法继续设置cookie;
    }
    var cookieString;//最终拼接的字符串；
    cookieString = name +"=" +value;
    if(!(options instanceof Object)){
        //如果配置参数没有传递，咱们代码不用继续执行，利用现有字符串设置cookie即可
        document.cookie = cookieString;
        return 0;
    }
    if(typeof options.expires == "number"){
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        cookieString +=";expires="+d;
    }
    if(typeof options.path == "string"){
        cookieString +=";path=" + options.path;
    }
    document.cookie = cookieString;


}
setCookie()
function removeCookie(name,options){
    setCookie(name,null,{
        expires:-1
    })
}
removeCookie(name,options)

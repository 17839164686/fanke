;
+function ($){
    $.fn.nav = function(){
        // console.log(this);
        this
        .on("mouseenter",function(){
           // alert("1")
           $(this).children("div")
           .stop()
           .fadeIn()
           .end()
           .siblings()
           .children("div")
           .stop()
           .fadeOut();
        })
        .on("mouseleave",function(){
           $(this).children("div")
           .stop()
           .fadeOut(); 
        })
    }
}(jQuery);
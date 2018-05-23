
;+function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function(){
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
    
});
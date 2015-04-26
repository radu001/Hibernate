    function validateLoginForm() {
    	var str = "";
        var login = document.forms["loginForm"]["login"].value;
        var password = document.forms["loginForm"]["password"].value;
        
        if (login == null || login == "") {
        	str = str.concat("Login empty \n");
        }
        if (password == null || password == "") {
        	str = str.concat("Password empty");
        }
               
        if (str != "") {
            alert(str);
            return false;
        }
    }


(function($) {
    "use strict";

    setTimeout(function() {
        $('body').removeClass('notransition');
    }, 300);

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
    }

    $('#signin').modal({
        backdrop: 'static',
        keyboard: false
    }).modal('show');

    $('input, textarea').placeholder();

})(jQuery);
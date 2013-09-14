var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var onMobileDevice = isMobile.any();
if( !onMobileDevice ) {
	function addStyleSheet(csshref)
	{
		var $ = document; // shortcut
	    var head  = $.getElementsByTagName("head")[0];
	    var link  = $.createElement("link");
	    link.href = csshref;
	    link.rel  = "stylesheet";
	    link.type = "text/css";
	    head.appendChild(link);
	}
	addStyleSheet("http://fonts.googleapis.com/css?family=Raleway:700|Lato:300,400");
	addStyleSheet("http://avail.local/_css/fontfamily.css");			    
}
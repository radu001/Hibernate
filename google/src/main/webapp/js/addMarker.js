    var newMarker = null;
    var clickListener;
    var map;
    var poly;
    var path;
    var geocoder;
    
    function autocomplete(latlng) {
    	 geocoder = new google.maps.Geocoder();
    	 geocoder.geocode({'latLng': latlng}, function(results, status) {
    	      if (status == google.maps.GeocoderStatus.OK) {
    	        if (results[0]) {
    	          console.log(results);
    	          document.getElementById("address").value = results[0].formatted_address;
    	        }
    	      } else {
    	        alert("Geocoder failed due to: " + status);
    	      }
    	    });
    }
    
    
    
    function validateCategoryForm() {
    	var str = "";
        var title = document.forms["categoryForm"]["title"].value;
        var description = document.forms["categoryForm"]["description"].value;
        console.log(title);
        console.log(description);
        
        if (title == null || title == "") {
        	str = str.concat("Title empty \n");
        }
        if (description == null || description == "") {
        	str = str.concat("Description empty");
        }
               
        if (str != "") {
            alert(str);
            return false;
        }
    }
    
    
    function validateMarkerForm() {
    	var str = "";
        var title = document.forms["markerForm"]["title"].value;
        var description = document.forms["markerForm"]["description"].value;
        var category =  document.forms["markerForm"]["ptype"].value;
        var latitude =  document.forms["markerForm"]["latitude"].value;
        var longitude =  document.forms["markerForm"]["longitude"].value;
        var webSite =  document.forms["markerForm"]["webSite"].value;
        var route =  document.forms["markerForm"]["route"].value;
        var imageUrl =  document.forms["markerForm"]["imageUrl"].value;
        var iconUrl =  document.forms["markerForm"]["iconUrl"].value;
        var address = document.forms["markerForm"]["address"].value;
        
        
        if (title == null || title == "")
        	str = str.concat("Title empty \n");
        
        if (description == null || description == "")
        	str = str.concat("Description empty \n");
        
        if (category == null || category == "")
        	str = str.concat("Category not selected \n");
        
        if (latitude == null || latitude == "" || longitude == null || longitude == "")
        	str = str.concat("Marker not positioned \n");
        
        if (webSite == null || webSite == "")
        	str = str.concat("Web site empty \n");
        
        if (route == null || route == "")
        	str = str.concat("Route not set \n");
               
        if (imageUrl == null || imageUrl == "")
        	str = str.concat("Image url empty \n");
        
        if (address == null || address == "")
        	str = str.concat("Address is empty \n");
        console.log("address: " + address);
        
        if (iconUrl == null || iconUrl == "")
        	document.getElementById("iconUrl").value = "images/marker-green.png";
        
        
        if (str != "") {
            alert(str);
            return false;
        }
    }
    
    function putMarker() {
    	
    	clickListener = google.maps.event.addListener(map, 'click',function(event) {
    		   placeMarker(event.latLng);

    });
    	

    	 document.getElementById("putMarkerBtn").disabled = true; 
    	 
    }

    function placeMarker(location) {
    	  newMarker = new google.maps.Marker({
    	        position: location,
    	        map: map,
    	        icon: new google.maps.MarkerImage( 
    	            'images/marker-new.png',
    	            null,
    	            null,
    	            null,
    	            new google.maps.Size(36, 36)
    	        ),
    	        draggable: true,
    	        animation: google.maps.Animation.DROP,
    	    });
    	 
    	  $('#latitude').val(location.lat());
	      $('#longitude').val(location.lng());
    	  google.maps.event.removeListener(clickListener);
    	  
          google.maps.event.addListener(newMarker,'dragend',function(event) {

          	autocomplete(newMarker.position);
          });
          autocomplete(newMarker.position);
      	
    	  
    	    google.maps.event.addListener(newMarker, "mouseup", function(event) {
    	        $('#latitude').val(this.position.lat());
    	        $('#longitude').val(this.position.lng());
    	    });
    	    
        	document.getElementById("startRouteBtn").disabled = false; 

    	    
    	   
    }
    
    
    function startRoute() {
    	document.getElementById("startRouteBtn").disabled = true; 
    	
    	map.setOptions({
    		draggableCursor: 'crosshair'
    		}); 
    	
    	var polyOptions = {
    		    strokeColor: '#000000',
    		    strokeOpacity: 1.0,
    		    strokeWeight: 3
    		  };
    		  poly = new google.maps.Polyline(polyOptions);
    		  poly.setMap(map);

    		  path = poly.getPath();
        	  path.push(newMarker.getPosition());
        	  
        	  
        	  $('#routeString').val('[' + path.getArray().toString().replace(/\(/g,"[").replace(/\)/g,"]") + ']');
        	  //$('#routeString').val(google.maps.geometry.encoding.encodePath(path));
        	 
    		  // Add a listener for the click event
    		  clickListener = google.maps.event.addListener(map, 'click', addLatLng);
    }
    
    function addLatLng(event) {
    	  path = poly.getPath();
    	  path.push(event.latLng);
    	  $('#routeString').val('[' + path.getArray().toString().replace(/\(/g,"[").replace(/\)/g,"]") + ']');
    	  //$('#routeString').val(google.maps.geometry.encoding.encodePath(path));
    	}
    
    
    function clearRoute() {
    	document.getElementById("startRouteBtn").disabled = false; 
    	if(path != null)
    	path.clear();
    	google.maps.event.removeListener(clickListener);
    	map.setOptions({
    		draggableCursor: 'default'
    		}); 
    	$('#routeString').val("");
    }
    
    
(function($) {
    "use strict";

	document.getElementById("startRouteBtn").disabled = true; 

	
    // Custom options for map
    var options = {
            zoom : 14,
            mapTypeId : 'Styled',
            disableDefaultUI: true,
            mapTypeControlOptions : {
                mapTypeIds : [ 'Styled' ]
            }
        };
		
    var styles = [{
        stylers : [ {
            hue : "#cccccc"
        }, {
            saturation : -100
        }]
    }, {
        featureType : "road",
        elementType : "geometry",
        stylers : [ {
            lightness : 100
        }, {
            visibility : "simplified"
        }]
    }, {
        featureType : "road",
        elementType : "labels",
        stylers : [ {
            visibility : "on"
        }]
    }, {
        featureType: "poi",
        stylers: [ {
            visibility: "off"
        }]
    }];


    
    map = new google.maps.Map(document.getElementById('mapView'), options);
    var styledMapType = new google.maps.StyledMapType(styles, {
        name : 'Styled'
    });

    map.mapTypes.set('Styled', styledMapType);
    map.setCenter(new google.maps.LatLng(47.0263795,28.840946));
    map.setZoom(14);





    
        
        
    var windowHeight;
    var windowWidth;
    var contentHeight;
    var contentWidth;
    var isDevice = true;

    // calculations for elements that changes size on window resize
    var windowResizeHandler = function() {
        windowHeight = window.innerHeight;
        windowWidth = $(window).width();
        contentHeight = windowHeight - $('#header').height();
        contentWidth = $('#content').width();

        $('#leftSide').height(contentHeight);
        $('.closeLeftSide').height(contentHeight);
        $('#wrapper').height(contentHeight);
        $('#mapView').height(contentHeight);
        $('#content').height(contentHeight);
        setTimeout(function() {
            $('.commentsFormWrapper').width(contentWidth);
        }, 300);

        if (map) {
            google.maps.event.trigger(map, 'resize');
        }

        // Add custom scrollbar for left side navigation
        if(windowWidth > 767) {
            $('.bigNav').slimScroll({
                height : contentHeight - $('.leftUserWraper').height()
            });
        } else {
            $('.bigNav').slimScroll({
                height : contentHeight
            });
        }
        if($('.bigNav').parent('.slimScrollDiv').size() > 0) {
            $('.bigNav').parent().replaceWith($('.bigNav'));
            if(windowWidth > 767) {
                $('.bigNav').slimScroll({
                    height : contentHeight - $('.leftUserWraper').height()
                });
            } else {
                $('.bigNav').slimScroll({
                    height : contentHeight
                });
            }
        }

        // reposition of prices and area reange sliders tooltip
        var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
        var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
        var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
        $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

        var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
        var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
        var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
        $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);
    }


    windowResizeHandler();
    $(window).resize(function() {
        windowResizeHandler();
    });

    setTimeout(function() {
        $('body').removeClass('notransition');
    }, 300);

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
        isDevice = false;
    }

    // Header search icon transition
    $('.search input').focus(function() {
        $('.searchIcon').addClass('active');
    });
    $('.search input').blur(function() {
        $('.searchIcon').removeClass('active');
    });

    // Notifications list items pulsate animation
    $('.notifyList a').hover(
        function() {
            $(this).children('.pulse').addClass('pulsate');
        },
        function() {
            $(this).children('.pulse').removeClass('pulsate');
        }
    );

    // Exapnd left side navigation
    var navExpanded = false;
    $('.navHandler, .closeLeftSide').click(function() {
        if(!navExpanded) {
            $('.logo').addClass('expanded');
            $('#leftSide').addClass('expanded');
            if(windowWidth < 768) {
                $('.closeLeftSide').show();
            }
            $('.hasSub').addClass('hasSubActive');
            $('.leftNav').addClass('bigNav');
            if(windowWidth > 767) {
                $('.full').addClass('m-full');
            }
            windowResizeHandler();
            navExpanded = true;
        } else {
            $('.logo').removeClass('expanded');
            $('#leftSide').removeClass('expanded');
            $('.closeLeftSide').hide();
            $('.hasSub').removeClass('hasSubActive');
            $('.bigNav').slimScroll({ destroy: true });
            $('.leftNav').removeClass('bigNav');
            $('.leftNav').css('overflow', 'visible');
            $('.full').removeClass('m-full');
            navExpanded = false;
        }
    });

    // functionality for map manipulation icon on mobile devices
    $('.mapHandler').click(function() {
        if ($('#mapView').hasClass('mob-min') || 
            $('#mapView').hasClass('mob-max') || 
            $('#content').hasClass('mob-min') || 
            $('#content').hasClass('mob-max')) {
                $('#mapView').toggleClass('mob-max');
                $('#content').toggleClass('mob-min');
        } else {
            $('#mapView').toggleClass('min');
            $('#content').toggleClass('max');
        }

        setTimeout(function() {
            var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
            var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
            var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
            $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

            var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
            var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
            var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
            $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);

            if (map) {
                google.maps.event.trigger(map, 'resize');
            }

            $('.commentsFormWrapper').width($('#content').width());
        }, 300);

    });

    // Expand left side sub navigation menus
    $(document).on("click", '.hasSubActive', function() {
        $(this).toggleClass('active');
        $(this).children('ul').toggleClass('bigList');
        $(this).children('a').children('.arrowRight').toggleClass('fa-angle-down');
    });

    if(isDevice) {
        $('.hasSub').click(function() {
            $('.leftNav ul li').not(this).removeClass('onTap');
            $(this).toggleClass('onTap');
        });
    }

    // functionality for custom dropdown select list
    $('.dropdown-select li a').click(function() {
        if (!($(this).parent().hasClass('disabled'))) {
            $(this).prev().prop("checked", true);
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().siblings('.dropdown-toggle').children('.dropdown-label').html($(this).text());
        }
    });

    

    $('.btn').click(function() {
        if ($(this).is('[data-toggle-class]')) {
            $(this).toggleClass('active ' + $(this).attr('data-toggle-class'));
        }
    });

    $('.tabsWidget .tab-scroll').slimScroll({
        height: '235px',
        size: '5px',
        position: 'right',
        color: '#939393',
        alwaysVisible: false,
        distance: '5px',
        railVisible: false,
        railColor: '#222',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: true,
        disableFadeOut: false
    });

    $('.progress-bar[data-toggle="tooltip"]').tooltip();
    $('.tooltipsContainer .btn').tooltip();

    $("#slider1").slider({
        range: "min",
        value: 50,
        min: 1,
        max: 100,
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider1 .ui-slider-handle:first").tooltip({ title: $("#slider1").slider("value"), trigger: "manual"}).tooltip("show");

    $("#slider2").slider({
        range: "max",
        value: 70,
        min: 1,
        max: 100,
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider2 .ui-slider-handle:first").tooltip({ title: $("#slider2").slider("value"), trigger: "manual"}).tooltip("show");

    $("#slider3").slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 190, 350 ],
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider3 .ui-slider-handle:first").tooltip({ title: $("#slider3").slider("values", 0), trigger: "manual"}).tooltip("show");
    $("#slider3 .ui-slider-handle:last").tooltip({ title: $("#slider3").slider("values", 1), trigger: "manual"}).tooltip("show");

    $('#autocomplete').autocomplete({
        source: ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"],
        focus: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            var me = $(this);
            setTimeout(function() {
                me.val(value);
            }, 1);
        }
    });

    $('#tags').tagsInput({
        'height': 'auto',
        'width': '100%',
        'defaultText': 'Add a tag',
    });




    $('input, textarea').placeholder();

})(jQuery);



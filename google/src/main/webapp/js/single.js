var newMarker = null;
var clickListener;
var map;
var poly;
var path;
var newMarker = null;
var markers = [];
var markerRoute = null;

function startRoute() {
	//document.getElementById("startRouteBtn").disabled = true; 
	clearRoute();
	
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


function putNewMarker() {
	newMarker.setMap(null);
	clearRoute();
    	clickListener = google.maps.event.addListener(map, 'click',function(event) {
    		   placeMarker(event.latLng);

    });
    	 //document.getElementById("putMarkerBtn").disabled = true; 
	
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
	    
  	//document.getElementById("startRouteBtn").disabled = false; 
	   
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

function clearRoute() {
	if(path != null)
		path.clear();
	 $('#routeString').val('');
}

function setRoute(marker) {
	if(path != null)
	path.clear();
	var polyOptions = {
		    strokeColor: '#000000',
		    strokeOpacity: 1.0,
		    strokeWeight: 3
		  };
		  poly = new google.maps.Polyline(polyOptions);
		  poly.setMap(map);

		  path = poly.getPath();
    	  
	
	var array = JSON.parse(marker.get('route'));
	console.log(array);
	
	for (var j=0; j<array.length; j++) {
	    var pos = new google.maps.LatLng(array[j][0],array[j][1])
	    path = poly.getPath();
	    path.push(pos);
	}
	

}

function focusMarker() {
			map.setCenter(newMarker.position);
}

function loadMarker() {
	var jsonReq = {
		data : []
	};

	jsonReq.data.push({
		"request" : 'getMarkers',
	});

	var a = $.ajax({
		url : 'single.jsp',
		type : "POST",
		dataType : 'json',
		data : JSON.stringify(jsonReq),
		success : function(data) {
			console.log("sucessfull sending:")
			putMarker(data);
		},
		error : function() {
			console.log('failed');
		}
	});

}

// custom infowindow object
var infobox = new InfoBox({
	disableAutoPan : false,
	maxWidth : 202,
	pixelOffset : new google.maps.Size(-101, -285),
	zIndex : null,
	boxStyle : {
		background : "url('images/infobox-bg.png') no-repeat",
		opacity : 1,
		width : "202px",
		height : "245px"
	},
	closeBoxMargin : "28px 26px 0px 0px",
	closeBoxURL : "",
	infoBoxClearance : new google.maps.Size(1, 1),
	pane : "floatPane",
	enableEventPropagation : false
});

function putMarker(marker) {
						var latlng = new google.maps.LatLng(marker.Latitude,
								marker.Longitude);
						var markerVar = new google.maps.Marker({
							position : latlng,
							title : marker.Name,
							store_id : marker.Id,
							route : marker.Route,
							map : map,
							icon : new google.maps.MarkerImage(
									'images/marker-green.png', null, null,
									null, new google.maps.Size(36, 36)),
							draggable : false,
							animation : google.maps.Animation.DROP,
						});

						var infoboxContent = '<div class="infoW" style="height:300px;">'
								+ '<div class="propImg">' + '<img src="'
								+ marker.ImageUrl
								+ '">'
								+ '<div class="propBg">'
								+ '<div class="propPrice"><a target="_blank" style="padding-left:5px;padding-right:5px; border-radius: 10px; border: 2px solid; border-color: black; color:black; background-color:#99FF66" href="http://www.'
								+ marker.Site
								+ '">'
								+ marker.Site
								+ '</a></div>'
								+

								'</div>'
								+ '</div>'
								+ '<div class="paWrapper">'
								+ '<div class="propTitle">'
								+ marker.Name
								+ '</div>'
								+ '<div class="propAddress">' + marker.Address + '</div>' +
								+ marker.Description.substring(0, 80)
								+ '</div>'
								+

								'<div class="clearfix"></div>'
								+ '<div class="infoButtons">'
								+ '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Close</a>'
								+ '<a href="single.jsp?Id=' + marker.Id  + '" class="btn btn-sm btn-round btn-green viewInfo">View</a>'
								+ '</div>' + '</div>';

						google.maps.event.addListener(markerVar, 'dblclick',function() {
										infobox.setContent(infoboxContent);
										infobox.open(map, markerVar);
								});

						$(document).on('click', '.closeInfo', function() {
							infobox.open(null, null);
						});
						
						google.maps.event.addListener(markerVar, 'click',
								function() {
									setRoute(markerVar);
								});
						
						newMarker = markerVar;
						setRoute(markerVar);
						focusMarker();
					
}


(function($) {
	"use strict";

	// Custom options for map
	var options = {
		zoom : 14,
		mapTypeId : 'Styled',
		disableDefaultUI : true,
		mapTypeControlOptions : {
			mapTypeIds : [ 'Styled' ]
		}
	};

	var styles = [ {
		stylers : [ {
			hue : "#cccccc"
		}, {
			saturation : -100
		} ]
	}, {
		featureType : "road",
		elementType : "geometry",
		stylers : [ {
			lightness : 100
		}, {
			visibility : "simplified"
		} ]
	}, {
		featureType : "road",
		elementType : "labels",
		stylers : [ {
			visibility : "on"
		} ]
	}, {
		featureType : "poi",
		stylers : [ {
			visibility : "off"
		} ]
	} ];

	map = new google.maps.Map(document.getElementById('mapView'), options);
	var styledMapType = new google.maps.StyledMapType(styles, {
		name : 'Styled'
	});

	map.mapTypes.set('Styled', styledMapType);
	map.setCenter(new google.maps.LatLng(47.0263795, 28.840946));
	map.setZoom(14);

	loadMarker();

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
		if (windowWidth > 767) {
			$('.bigNav').slimScroll({
				height : contentHeight - $('.leftUserWraper').height()
			});
		} else {
			$('.bigNav').slimScroll({
				height : contentHeight
			});
		}
		if ($('.bigNav').parent('.slimScrollDiv').size() > 0) {
			$('.bigNav').parent().replaceWith($('.bigNav'));
			if (windowWidth > 767) {
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
		var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range')
				.css('left'));
		var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
		var priceSliderLeft = priceSliderRangeLeft
				+ (priceSliderRangeWidth / 2)
				- ($('.priceSlider .sliderTooltip').width() / 2);
		$('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

		var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range')
				.css('left'));
		var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
		var areaSliderLeft = areaSliderRangeLeft + (areaSliderRangeWidth / 2)
				- ($('.areaSlider .sliderTooltip').width() / 2);
		$('.areaSlider .sliderTooltip').css('left', areaSliderLeft);
	}

	var repositionTooltip = function(e, ui) {
		var div = $(ui.handle).data("bs.tooltip").$tip[0];
		var pos = $.extend({}, $(ui.handle).offset(), {
			width : $(ui.handle).get(0).offsetWidth,
			height : $(ui.handle).get(0).offsetHeight
		});
		var actualWidth = div.offsetWidth;

		var tp = {
			left : pos.left + pos.width / 2 - actualWidth / 2
		}
		$(div).offset(tp);

		$(div).find(".tooltip-inner").text(ui.value);
	}

	windowResizeHandler();
	$(window).resize(function() {
		windowResizeHandler();
	});

	setTimeout(function() {
		$('body').removeClass('notransition');

	}, 300);

	if (!(('ontouchstart' in window) || window.DocumentTouch
			&& document instanceof DocumentTouch)) {
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
	$('.notifyList a').hover(function() {
		$(this).children('.pulse').addClass('pulsate');
	}, function() {
		$(this).children('.pulse').removeClass('pulsate');
	});

	// Exapnd left side navigation
	var navExpanded = false;
	$('.navHandler, .closeLeftSide').click(function() {
		if (!navExpanded) {
			$('.logo').addClass('expanded');
			$('#leftSide').addClass('expanded');
			if (windowWidth < 768) {
				$('.closeLeftSide').show();
			}
			$('.hasSub').addClass('hasSubActive');
			$('.leftNav').addClass('bigNav');
			if (windowWidth > 767) {
				$('.full').addClass('m-full');
			}
			windowResizeHandler();
			navExpanded = true;
		} else {
			$('.logo').removeClass('expanded');
			$('#leftSide').removeClass('expanded');
			$('.closeLeftSide').hide();
			$('.hasSub').removeClass('hasSubActive');
			$('.bigNav').slimScroll({
				destroy : true
			});
			$('.leftNav').removeClass('bigNav');
			$('.leftNav').css('overflow', 'visible');
			$('.full').removeClass('m-full');
			navExpanded = false;
		}
	});

	// functionality for map manipulation icon on mobile devices
	$('.mapHandler')
			.click(
					function() {
						if ($('#mapView').hasClass('mob-min')
								|| $('#mapView').hasClass('mob-max')
								|| $('#content').hasClass('mob-min')
								|| $('#content').hasClass('mob-max')) {
							$('#mapView').toggleClass('mob-max');
							$('#content').toggleClass('mob-min');
						} else {
							$('#mapView').toggleClass('min');
							$('#content').toggleClass('max');
						}

						setTimeout(
								function() {
									var priceSliderRangeLeft = parseInt($(
											'.priceSlider .ui-slider-range')
											.css('left'));
									var priceSliderRangeWidth = $(
											'.priceSlider .ui-slider-range')
											.width();
									var priceSliderLeft = priceSliderRangeLeft
											+ (priceSliderRangeWidth / 2)
											- ($('.priceSlider .sliderTooltip')
													.width() / 2);
									$('.priceSlider .sliderTooltip').css(
											'left', priceSliderLeft);

									var areaSliderRangeLeft = parseInt($(
											'.areaSlider .ui-slider-range')
											.css('left'));
									var areaSliderRangeWidth = $(
											'.areaSlider .ui-slider-range')
											.width();
									var areaSliderLeft = areaSliderRangeLeft
											+ (areaSliderRangeWidth / 2)
											- ($('.areaSlider .sliderTooltip')
													.width() / 2);
									$('.areaSlider .sliderTooltip').css('left',
											areaSliderLeft);

									if (map) {
										google.maps.event
												.trigger(map, 'resize');
									}

									$('.commentsFormWrapper').width(
											$('#content').width());
								}, 300);

					});

	// Expand left side sub navigation menus
	$(document).on(
			"click",
			'.hasSubActive',
			function() {
				$(this).toggleClass('active');
				$(this).children('ul').toggleClass('bigList');
				$(this).children('a').children('.arrowRight').toggleClass(
						'fa-angle-down');
			});

	if (isDevice) {
		$('.hasSub').click(function() {
			$('.leftNav ul li').not(this).removeClass('onTap');
			$(this).toggleClass('onTap');
		});
	}

	// functionality for custom dropdown select list
	$('.dropdown-select li a').click(
			function() {
				if (!($(this).parent().hasClass('disabled'))) {
					$(this).prev().prop("checked", true);
					$(this).parent().siblings().removeClass('active');
					$(this).parent().addClass('active');
					$(this).parent().parent().siblings('.dropdown-toggle')
							.children('.dropdown-label').html($(this).text());
				}
			});

	$('.priceSlider')
			.slider(
					{
						range : true,
						min : 0,
						max : 2000000,
						values : [ 500000, 1500000 ],
						step : 10000,
						slide : function(event, ui) {
							$('.priceSlider .sliderTooltip .stLabel')
									.html(
											'$'
													+ ui.values[0]
															.toString()
															.replace(
																	/(\d)(?=(\d\d\d)+(?!\d))/g,
																	"$1,")
													+ ' <span class="fa fa-arrows-h"></span> '
													+ '$'
													+ ui.values[1]
															.toString()
															.replace(
																	/(\d)(?=(\d\d\d)+(?!\d))/g,
																	"$1,"));
							var priceSliderRangeLeft = parseInt($(
									'.priceSlider .ui-slider-range')
									.css('left'));
							var priceSliderRangeWidth = $(
									'.priceSlider .ui-slider-range').width();
							var priceSliderLeft = priceSliderRangeLeft
									+ (priceSliderRangeWidth / 2)
									- ($('.priceSlider .sliderTooltip').width() / 2);
							$('.priceSlider .sliderTooltip').css('left',
									priceSliderLeft);
						}
					});
	$('.priceSlider .sliderTooltip .stLabel').html(
			'$'
					+ $('.priceSlider').slider('values', 0).toString().replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
					+ ' <span class="fa fa-arrows-h"></span> '
					+ '$'
					+ $('.priceSlider').slider('values', 1).toString().replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css(
			'left'));
	var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
	var priceSliderLeft = priceSliderRangeLeft + (priceSliderRangeWidth / 2)
			- ($('.priceSlider .sliderTooltip').width() / 2);
	$('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

	$('.areaSlider')
			.slider(
					{
						range : true,
						min : 0,
						max : 20000,
						values : [ 5000, 10000 ],
						step : 10,
						slide : function(event, ui) {
							$('.areaSlider .sliderTooltip .stLabel')
									.html(
											ui.values[0].toString().replace(
													/(\d)(?=(\d\d\d)+(?!\d))/g,
													"$1,")
													+ ' Sq Ft'
													+ ' <span class="fa fa-arrows-h"></span> '
													+ ui.values[1]
															.toString()
															.replace(
																	/(\d)(?=(\d\d\d)+(?!\d))/g,
																	"$1,")
													+ ' Sq Ft');
							var areaSliderRangeLeft = parseInt($(
									'.areaSlider .ui-slider-range').css('left'));
							var areaSliderRangeWidth = $(
									'.areaSlider .ui-slider-range').width();
							var areaSliderLeft = areaSliderRangeLeft
									+ (areaSliderRangeWidth / 2)
									- ($('.areaSlider .sliderTooltip').width() / 2);
							$('.areaSlider .sliderTooltip').css('left',
									areaSliderLeft);
						}
					});
	$('.areaSlider .sliderTooltip .stLabel').html(
			$('.areaSlider').slider('values', 0).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
					+ ' Sq Ft'
					+ ' <span class="fa fa-arrows-h"></span> '
					+ $('.areaSlider').slider('values', 1).toString().replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' Sq Ft');
	var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css(
			'left'));
	var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
	var areaSliderLeft = areaSliderRangeLeft + (areaSliderRangeWidth / 2)
			- ($('.areaSlider .sliderTooltip').width() / 2);
	$('.areaSlider .sliderTooltip').css('left', areaSliderLeft);

	$('.volume .btn-round-right').click(function() {
		var currentVal = parseInt($(this).siblings('input').val());
		if (currentVal < 10) {
			$(this).siblings('input').val(currentVal + 1);
		}
	});
	$('.volume .btn-round-left').click(function() {
		var currentVal = parseInt($(this).siblings('input').val());
		if (currentVal > 1) {
			$(this).siblings('input').val(currentVal - 1);
		}
	});

	$('.handleFilter').click(function() {
		$('.filterForm').slideToggle(200);
	});

	// Enable swiping
	$(".carousel-inner").swipe(
			{
				swipeLeft : function(event, direction, distance, duration,
						fingerCount) {
					$(this).parent().carousel('next');
				},
				swipeRight : function() {
					$(this).parent().carousel('prev');
				}
			});

	$(".carousel-inner .card").click(function() {
		window.open($(this).attr('data-linkto'), '_self');
	});

	$('#content').scroll(function() {
		if ($('.comments').length > 0) {
			var visible = $('.comments').visible(true);
			if (visible) {
				$('.commentsFormWrapper').addClass('active');
			} else {
				$('.commentsFormWrapper').removeClass('active');
			}
		}
	});

	$('.btn').click(function() {
		if ($(this).is('[data-toggle-class]')) {
			$(this).toggleClass('active ' + $(this).attr('data-toggle-class'));
		}
	});

	$('.tabsWidget .tab-scroll').slimScroll({
		height : '235px',
		size : '5px',
		position : 'right',
		color : '#939393',
		alwaysVisible : false,
		distance : '5px',
		railVisible : false,
		railColor : '#222',
		railOpacity : 0.3,
		wheelStep : 10,
		allowPageScroll : true,
		disableFadeOut : false
	});

	$('.progress-bar[data-toggle="tooltip"]').tooltip();
	$('.tooltipsContainer .btn').tooltip();

	$("#slider1").slider({
		range : "min",
		value : 50,
		min : 1,
		max : 100,
		slide : repositionTooltip,
		stop : repositionTooltip
	});
	$("#slider1 .ui-slider-handle:first").tooltip({
		title : $("#slider1").slider("value"),
		trigger : "manual"
	}).tooltip("show");

	$("#slider2").slider({
		range : "max",
		value : 70,
		min : 1,
		max : 100,
		slide : repositionTooltip,
		stop : repositionTooltip
	});
	$("#slider2 .ui-slider-handle:first").tooltip({
		title : $("#slider2").slider("value"),
		trigger : "manual"
	}).tooltip("show");

	$("#slider3").slider({
		range : true,
		min : 0,
		max : 500,
		values : [ 190, 350 ],
		slide : repositionTooltip,
		stop : repositionTooltip
	});
	$("#slider3 .ui-slider-handle:first").tooltip({
		title : $("#slider3").slider("values", 0),
		trigger : "manual"
	}).tooltip("show");
	$("#slider3 .ui-slider-handle:last").tooltip({
		title : $("#slider3").slider("values", 1),
		trigger : "manual"
	}).tooltip("show");

	$('#autocomplete').autocomplete(
			{
				source : [ "ActionScript", "AppleScript", "Asp", "BASIC", "C",
						"C++", "Clojure", "COBOL", "ColdFusion", "Erlang",
						"Fortran", "Groovy", "Haskell", "Java", "JavaScript",
						"Lisp", "Perl", "PHP", "Python", "Ruby", "Scala",
						"Scheme" ],
				focus : function(event, ui) {
					var label = ui.item.label;
					var value = ui.item.value;
					var me = $(this);
					setTimeout(function() {
						me.val(value);
					}, 1);
				}
			});

	$('#tags').tagsInput({
		'height' : 'auto',
		'width' : '100%',
		'defaultText' : 'Add a tag',
	});

	$('#datepicker').datepicker();

	// functionality for autocomplete address field
	if ($('#address').length > 0) {
		var address = document.getElementById('address');
		var addressAuto = new google.maps.places.Autocomplete(address);

		google.maps.event.addListener(addressAuto, 'place_changed', function() {
			var place = addressAuto.getPlace();

			if (!place.geometry) {
				return;
			}
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
			}
			newMarker.setPosition(place.geometry.location);
			newMarker.setVisible(true);
			$('#latitude').text(newMarker.getPosition().lat());
			$('#longitude').text(newMarker.getPosition().lng());

			return false;
		});
	}

	$('input, textarea').placeholder();

})(jQuery);

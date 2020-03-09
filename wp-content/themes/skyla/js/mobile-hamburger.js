/* global jQuery:false */
/*jshint esversion: 6 */
(function($) {
	
	"use strict";

	function mobileToggle() {
		if(jQuery('.wpisset-mobile-menu-toggle').hasClass("active")) {
			jQuery('.wpisset-mobile-menu-container').removeClass('active').slideUp();
			jQuery('.wpisset-mobile-menu-toggle').removeClass("active");
		} else {
			jQuery('.wpisset-mobile-menu-container').addClass('active').slideDown();
			jQuery('.wpisset-mobile-menu-toggle').addClass("active");
			jQuery(window).trigger('resize');
		}
	}

	jQuery('.wpisset-mobile-menu-toggle').on( "click", function() {
		mobileToggle();
	});

	jQuery('.wpisset-mobile-menu a').on( "click", function() {
		var attribute = jQuery(this).attr('href');
		if(attribute.match("^#") || attribute.match("^/#") ) {
			mobileToggle();
		}
	});

	// get desktop breakpoint value from body class
	var DesktopBreakpointClass = jQuery('body').attr("class").match(/wpisset-desktop-breakpoint-[\w-]*\b/);
	if( DesktopBreakpointClass !== null ) {
		var string = DesktopBreakpointClass.toString();
		var DesktopBreakpoint = string.match(/\d+/);
	} else {
		DesktopBreakpoint = '1024';
	}
	
    // hide open mobile menu on resize
	jQuery(window).resize(function() {

		// vars
		var windowHeight = jQuery(window).height();
		var windowWidth = jQuery(window).width();
		var mobileNavWrapperHeight = jQuery('.wpisset-mobile-nav-wrapper').outerHeight();

		jQuery('.wpisset-mobile-menu-container.active nav').css({'max-height' : windowHeight - mobileNavWrapperHeight });

		// resize fallback
		if(windowWidth > DesktopBreakpoint) {
			if(jQuery('.wpisset-mobile-menu-toggle').hasClass('active')) {
				jQuery('.wpisset-mobile-menu-container').removeClass('active').css({'display':'none'});
				jQuery('.wpisset-mobile-menu-toggle').removeClass('active');
			}
			if(jQuery('.wpisset-mobile-mega-menu').length) {
				jQuery('.wpisset-mobile-mega-menu').removeClass('wpisset-mobile-mega-menu').addClass('wpisset-mega-menu');
			}
		} else {
			if(jQuery('.wpisset-mega-menu').length) {
				jQuery('.wpisset-mega-menu').removeClass('wpisset-mega-menu').addClass('wpisset-mobile-mega-menu');
			}
		}

	});

	// add toggle arrow
	jQuery('.wpisset-mobile-menu .menu-item-has-children').each(function() {
		jQuery(this).append('<span class="wpisset-submenu-toggle"><i class="wpissetf wpissetf-arrow-down"></i></span>');
	});

	// mobile submenu animation
	jQuery('.wpisset-submenu-toggle').on( "click", function(event) {

		event.preventDefault();

		if(jQuery(this).hasClass("active")) {
			jQuery('i', this).removeClass('wpissetf-arrow-up').addClass('wpissetf-arrow-down');
			jQuery(this).removeClass('active').siblings('.sub-menu').slideUp();
		} else {
			jQuery('i', this).removeClass('wpissetf-arrow-down').addClass('wpissetf-arrow-up');
			jQuery(this).addClass('active').siblings('.sub-menu').slideDown();
		}

	});

})( jQuery );
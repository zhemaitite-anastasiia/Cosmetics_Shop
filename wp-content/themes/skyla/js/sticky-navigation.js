/* global jQuery:false */
/*jshint esversion: 6 */
(function($) {
	
	"use strict";

	// Sticky Vars
	var sticky = jQuery('.wpisset-navigation').data('sticky');

	var delay = jQuery(".wpisset-navigation").data('sticky-delay');
	var animation = jQuery(".wpisset-navigation").data('sticky-animation');
	var duration = jQuery(".wpisset-navigation").data('sticky-animation-duration');

	var offset_top = jQuery('.wpisset-navigation').offset().top;
	
	var fired = 0;
	var lastScrollTop = 0;
	
	var distance = parseInt(offset_top) + parseInt(delay);

	var menu_logo = jQuery('.wpisset-logo img').attr('src');
	var menu_active_logo = jQuery('.wpisset-logo').data("menu-active-logo");

	// Sticky Navigation
	function stickyNavigation() {

	var scroll_top = jQuery(window).scrollTop();

	var navHeight = jQuery('.wpisset-navigation').outerHeight();

		if (scroll_top > distance && fired == '0') {

			jQuery('.wpisset-navigation').addClass('wpisset-navigation-active');
			
			jQuery('body').addClass('wpisset-sticky-menu-active');

			if(animation == 'slide') {

				jQuery('.wpisset-navigation').css({ 'position':'fixed', 'left':'0', 'zIndex':'666', 'top': -navHeight }).animate({'top':0}, duration);

			} else if(animation == 'fade') {

				jQuery('.wpisset-navigation').css({ 'display':'none', 'position':'fixed', 'top':'0', 'left':'0', 'zIndex':'666' }).fadeIn(duration);

			} else {

				jQuery('.wpisset-navigation').css({ 'position': 'fixed', 'top':'0', 'left':'0', 'zIndex':'666' });

				if(animation == 'scroll') {

					jQuery('.wpisset-navigation').addClass('wpisset-navigation-animate');

				}

			}

			if (!jQuery('body').hasClass('wpisset-transparent-header')) {

				jQuery('.wpisset-page-header').css('marginTop', navHeight);

			}

			if (jQuery('.wpisset-logo').data('menu-active-logo')) {
				jQuery('.wpisset-logo img').attr('src', menu_active_logo);
				jQuery('.wpisset-mobile-logo img').attr('src', menu_active_logo);
			}

			fired = '1';

		} else if (scroll_top < distance && fired == '1') {

			jQuery('.wpisset-navigation').removeClass('wpisset-navigation-active wpisset-navigation-animate');

			if (!jQuery('body').hasClass('wpisset-transparent-header')) {

				jQuery('.wpisset-navigation').css({ 'position':'', 'top':'', 'left':'', 'zIndex':'' });
				jQuery('.wpisset-page-header').css('marginTop', '');

			} else {

				jQuery('.wpisset-navigation').css({ 'position':'absolute', 'top':'', 'left':'', 'zIndex':'' });

			}

			if (jQuery('.wpisset-logo').data('menu-active-logo')) {
				jQuery('.wpisset-logo img').attr('src', menu_logo);
				jQuery('.wpisset-mobile-logo img').attr('src', menu_logo);
			}

			fired = '0';

		}

	};

	// Hide on Scroll
	function HideOnScroll() {
		var scroll_top = jQuery(window).scrollTop();
		var navHeight = jQuery('.wpisset-navigation').outerHeight();

	    if(Math.abs(lastScrollTop - scroll_top) <= delay) return;

		if (scroll_top > lastScrollTop && scroll_top > navHeight){
			// Scroll Down
			jQuery('.wpisset-navigation').css({'top':-navHeight});
			jQuery('.wpisset-navigation').removeClass('wpisset-navigation-scroll-up').addClass('wpisset-navigation-scroll-down');
		} else {
			// Scroll Up
			if(scroll_top + jQuery(window).height() < jQuery(document).height()) {
				jQuery('.wpisset-navigation').css({'top':'0px'});
				jQuery('.wpisset-navigation').removeClass('wpisset-navigation-scroll-down').addClass('wpisset-navigation-scroll-up');
			}
		}

		lastScrollTop = scroll_top;
		
	}


	// execute		
	if(sticky) {

		jQuery(window).scroll(function() {

			stickyNavigation();

			if(sticky && animation == 'scroll') {

				HideOnScroll();

			}

		});

	}

})( jQuery );
/* global jQuery:false */
/*jshint esversion: 6 */
(function($) {
	
	"use strict";

	// ScrollTop
	if (jQuery('.scrolltop').length) {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 400) {
				jQuery('.scrolltop').fadeIn();
			} else {
				jQuery('.scrolltop').fadeOut();
			}
		});

		jQuery('.scrolltop').on( "click", function() {
			jQuery('body,html').animate({ scrollTop: 0 }, 500);
		});
	}

	// Menu Search
	jQuery('.wpisset-menu-item-search a').on( "click", function(event) {
		event.preventDefault();
		event.stopPropagation();
		jQuery('body').addClass('wpisset-menu-search-active');
		jQuery('.wpisset-menu-item-search a').addClass('active');
    	var itemWidth = 240;
		jQuery('.wpisset-menu-search').stop().css({display:'block'}).animate({width : itemWidth, opacity : '1'}, 200);
		jQuery('.wpisset-menu-search #s').focus();
		jQuery('.wpisset-menu-search .woocommerce-product-search .search-field').focus();
		jQuery('#yith-s').focus();
		jQuery('.wpisset-menu-search button').remove();
	});

	jQuery(window).on( "click", function() {
		if ( jQuery('.wpisset-menu-item-search a').hasClass('active') ) {

			jQuery('.wpisset-menu-search').stop().animate({opacity:'0', width:'0px'}, 250, function() {
				jQuery(this).css({display:'none'});
			});
			
			jQuery('body').removeClass('wpisset-menu-search-active');

			setTimeout(function(){
				jQuery('.wpisset-menu-item-search a').removeClass('active');
			}, 400);
		}
	});
		
	// CF7
	jQuery('.wpcf7-form-control-wrap').on( "mouseenter mouseleave", function() {
		jQuery('.wpcf7-not-valid-tip', this).fadeOut();
	});	

	/* Sub Menu Animations */

	var duration = jQuery(".wpisset-navigation").data('sub-menu-animation-duration');

	// Fade Animation
	jQuery('.wpisset-sub-menu-animation-fade > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop().fadeIn(duration).addClass('sub-menu-active');
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop().fadeOut(duration).removeClass('sub-menu-active');
	});

    // Second Level Submenu Animation | Excluding mega menu
    jQuery('.wpisset-sub-menu > .menu-item-has-children:not(.wpisset-mega-menu) > .sub-menu > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop().css({display:'block'}).animate({opacity:'1'},duration);
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop().animate({opacity:'0'}, duration, function() {
			jQuery(this).css({display:'none'});
		});
	});

	// Window Load
	jQuery(window).load(function(){

		jQuery('.opacity').delay(250).animate({opacity:'1'}, 250);
		jQuery('.display-none').show();
		jQuery(window).trigger('resize');
		jQuery(window).trigger('scroll');

	});

	// Boxed Remove
	var mtpagemargin = jQuery('.wpisset-page').css('margin-top');

	jQuery(window).resize(function(){
		var mtpagewidth = jQuery('.wpisset-page').width();

		if(mtpagewidth >= jQuery(window).width()) {
			jQuery('.wpisset-page').css({'margin-top':'0','margin-bottom':'0'})
		} else {
			jQuery('.wpisset-page').css({'margin-top': mtpagemargin,'margin-bottom':mtpagemargin})
		}
	});

	if ( jQuery('.wpisset-menu-centered').length ) {
		var menu_items = jQuery('.wpisset-navigation nav .wpisset-menu > li > a').length;
		var divided = menu_items/2;
		var divided = Math.floor(divided);
		var divided = divided -1;

		jQuery('.wpisset-menu-centered .logo-container').insertAfter('.wpisset-navigation nav .wpisset-menu >li:eq('+ divided +')').css({'display':'block'});
	}
	
	// Mega Menu | prevent click on headlines
	 jQuery('.wpisset-mega-menu > .sub-menu > .menu-item a[href="#"]').on( "click", function(event) {
	 	event.preventDefault();
	 });

	/* Sub Menu Animations */

	var duration = jQuery(".wpisset-navigation").data('sub-menu-animation-duration');

	// Down Animation
	jQuery('.wpisset-sub-menu-animation-down > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop().css({display:'block'}).animate({marginTop:'0', opacity:'1'}, duration);
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop().animate({opacity:'0', marginTop:'-10px'}, duration, function() {
			jQuery(this).css({display:'none'});
		});
	});

	// Up Animation
	jQuery('.wpisset-sub-menu-animation-up > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop().css({display:'block'}).animate({marginTop:'0', opacity:'1'}, duration);
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop().animate({opacity:'0', marginTop:'10px'}, duration, function() {
			jQuery(this).css({display:'none'});
		});
	});

	// Zoom In Animation
	jQuery('.wpisset-sub-menu-animation-zoom-in > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop(true).css({display:'block'}).transition({scale:'1', opacity:'1'}, duration);
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop(true).transition({scale:'.95', opacity:'0'}, duration).fadeOut(5);
	});

	// Zoom Out Animation
	jQuery('.wpisset-sub-menu-animation-zoom-out > .menu-item-has-children').on('mouseenter', function() {
		jQuery('.sub-menu', this).first().stop(true).css({display:'block'}).transition({scale:'1', opacity:'1'}, duration);
	}).on('mouseleave', function() {
		jQuery('.sub-menu', this).first().stop(true).transition({scale:'1.05', opacity:'0'}, duration).fadeOut(5);
	});

	// WooCommerce Menu Item
	jQuery(document).on({
		mouseenter: function () {
			jQuery('.wpisset-woo-menu-item .wpisset-woo-sub-menu').stop().fadeIn(duration);
		},
		mouseleave: function () {
			jQuery('.wpisset-woo-menu-item .wpisset-woo-sub-menu').stop().fadeOut(duration);
		}
	}, ".wpisset-woo-menu-item.menu-item-has-children");
	
	// WooCommerce My Account Item
	jQuery(document).on({
		mouseenter: function () {
			jQuery('.wpisset-myaccount-menu-item .wpisset-woo-sub-menu').stop().fadeIn(duration);
		},
		mouseleave: function () {
			jQuery('.wpisset-myaccount-menu-item .wpisset-woo-sub-menu').stop().fadeOut(duration);
		}
	}, ".wpisset-myaccount-menu-item.menu-item-has-children");

	/* Responsive Video Opt-In */

	jQuery('.wpisset-video-opt-in-button, .wpisset-video-opt-in-image').on( "click", function(event) {
		event.preventDefault();
		var url = jQuery(this).parent().next().attr('data-wpisset-video');
		jQuery(this).parent().next().children().attr("src", url);
		jQuery(this).parent().next().removeClass('opt-in');
		jQuery(this).parent().remove();
	});

})( jQuery );
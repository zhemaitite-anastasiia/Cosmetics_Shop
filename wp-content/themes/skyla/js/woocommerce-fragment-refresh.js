/* global jQuery:false */
/*jshint esversion: 6 */
(function($) {
	
	"use strict";

	setTimeout(function() {
		jQuery( document.body ).trigger( 'wc_fragment_refresh' );
	}, 150);

})( jQuery );
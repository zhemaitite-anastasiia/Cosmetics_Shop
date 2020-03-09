/* global jQuery:false */
/*jshint esversion: 6 */
(function ($) {
	
	"use strict";
	
    jQuery(document).on('ready', function () {

        jQuery(document).on('click', '.wpisset-woo-quick-view', function (e) {
            e.preventDefault();
            var product_id = jQuery(this).data('product_id');
            var data = {
                'action': 'wpisset_woo_quick_view',
                'product_id': product_id
            };

            var $modal = jQuery('<div>', {'class': 'wpisset-woo-quick-view-modal wpisset-clearfix'});
            var $close = jQuery('<div>', {'class': 'wpisset-woo-quick-view-modal-close wpissetf wpissetf-times'});
            $modal.appendTo('.wpisset-page');
            $close.appendTo('.wpisset-woo-quick-view-modal');

            jQuery('.wpisset-woo-quick-view-modal').fadeIn(300);

            jQuery.post(wpisset_woo_quick_view.ajax_url, data, function (response) {
                jQuery(response).hide().insertAfter($modal).fadeIn(300);
            });

        });

        jQuery(document).on('click', '.wpisset-woo-quick-view-modal-content .product:not(.product-type-external) .single_add_to_cart_button', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            var variation_form_obj = jQuery(this).parents('.variations_form'),
                variationBag = {},
                error_flag = false,
                payload,
                quantity = jQuery(this).parents('.cart').find('input[name="quantity"]').val(),
                is_variation = variation_form_obj.length > 0,
                product_id = is_variation === true ? variation_form_obj.data('product_id') : jQuery(this).val(),
                variation_id = variation_form_obj.find('input[name="variation_id"]').val(),
                variations = variation_form_obj.find('select[name^=attribute]');

            if (!variations.length) {
                variations = variation_form_obj.find('[name^=attribute]:checked');
            }

            if (!variations.length) {
                variations = variation_form_obj.find('input[name^=attribute]');
            }


            variations.each(function () {
                var $this = jQuery(this),
                    attributeName = $this.attr('name'),
                    attributevalue = $this.val(),
                    index,
                    variationName;

                $this.removeClass('error'); // what's this doing?

                if (attributevalue.length === 0) {
                    index = attributeName.lastIndexOf('_');
                    variationName = attributeName.substring(index + 1);
                    error_flag = true;

				    jQuery('.wpisset-woo-quick-view-modal-content select').each(function(){
						if( !jQuery(this).val() ) {
				        	jQuery(this).addClass('select-error');
				        }
				    });
                } else {
                    variationBag[attributeName] = attributevalue;
                }
            });

            // if there is any error.
            if (error_flag === true) return;

            payload = {
                'action': 'wpisset_woo_quick_view_add_to_cart',
                'product_id': product_id,
                'quantity': quantity,
                'is_variation': is_variation
            };

            if (is_variation === true) {
                payload.variations = variationBag;
                payload.variation_id = variation_id;
            }

            jQuery.post(wpisset_woo_quick_view.ajax_url, payload, function (results) {
                jQuery(document.body).trigger('wc_fragment_refresh');
                jQuery(document.body).trigger('added_to_cart', [results.fragments, results.cart_hash]);
                wpisset_woo_close_modal();
            });

        });

	    jQuery(document).on('click', '.wpisset-woo-quick-view-modal-content select', function() {
			if( jQuery(this).val() ) {
				jQuery(this).removeClass('select-error');
			}
	    });

        function wpisset_woo_close_modal() {
            jQuery('.wpisset-woo-quick-view-modal-content, .wpisset-woo-quick-view-modal').fadeOut('300', function () {
                jQuery('.wpisset-woo-quick-view-modal-content, .wpisset-woo-quick-view-modal').remove();
            });
        }

        jQuery(document).on('click', '.wpisset-woo-quick-view-modal', function () {
            wpisset_woo_close_modal();
        });

        // Close on Escape
        jQuery(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if (jQuery('.wpisset-woo-quick-view-modal-content').is(':visible')) {
                    wpisset_woo_close_modal();
                }
            }
        });

    });

})(jQuery);
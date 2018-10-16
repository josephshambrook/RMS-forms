(function() {
  $(function() {

    /*
     * Handle Legal Entity Dropdown
     */

    // store all relevant forms in a variable
    const forms = $('.js-legal-entity-form');

    $('#legal-entities-picker').on('change', function() {
      // get the value of the option
      const val = this.value

      // get the form related to the chosen option
      const form = forms.filter(`[data-entity-type="${val}"]`);

      // check if the form was found and is not already displayed
      if (form.length && !form.hasClass('d-block')) {
        // hide the form which is currently displayed
        $('.js-legal-entity-form.d-block').removeClass('d-block').addClass('d-none');

        // show the form which was chosen to show
        form.removeClass('d-none').addClass('d-block');
      }
    });

    /*
     * Handle modal address submission
     */

    const findAddressModal = $('#js-modal-find-address');

    findAddressModal.on('submit', 'form', function(evt) {
      evt.preventDefault();

      // get selected business address option
      const findAddressForm = findAddressModal.find('form');
      const selectedAddress = findAddressForm.serializeArray().find(field => field.name === 'business-address');

      if (selectedAddress.value === 'manual') {
        // manual address has been chosen, so we need to show Postcode Lookup
        $('.js-postcode-lookup').removeClass('d-none');
      } else {
        $('.js-postcode-lookup:not(.d-none)').addClass('d-none');
      }

      // dismiss the modal
      $('.js-business-details-form').removeClass('d-none');
      findAddressModal.modal('hide');
    });

    /*
     * Handle showing additional form for when merchant option unselected
     */

    const merchantAddressForm = $('.js-merchant-address-form');

    $('.js-address-merchant-opt').on('change', function() {
      if (this.checked) {
        merchantAddressForm.addClass('d-none');
      } else {
        merchantAddressForm.removeClass('d-none');
      }
    });


    /*
     * Handle modal for custom VAT number
     */

    const charityNumberGroup = $('.js-charity-number-group')

    $('#js-modal-custom-vat').on('change', '.js-business-charity-option', function() {
      if (this.checked) {
        charityNumberGroup.removeClass('d-none');
      } else {
        charityNumberGroup.addClass('d-none');
      }
    });

    /*
     * Initialize select2 plugin for operating countries tag picker
     */

    $('.js-operating-countries').select2({
      width: '100%'
    });
  });
}());

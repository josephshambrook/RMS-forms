"use strict";

(function () {
  $(function () {
    /*
     * Handle Legal Entity Dropdown
     */
    // store all relevant forms in a variable
    var forms = $('.js-legal-entity-form');
    $('#legal-entities-picker').on('change', function () {
      // get the value of the option
      var val = $(this).val(); // get the form related to the chosen option

      var form = forms.filter("[data-entity-type=\"".concat(val, "\"]")); // check if the form was found and is not already displayed

      if (form.length && !form.hasClass('d-block')) {
        // hide the form which is currently displayed
        $('.js-legal-entity-form.d-block').removeClass('d-block').addClass('d-none'); // show the form which was chosen to show

        form.removeClass('d-none').addClass('d-block');
      }
    });
    /*
     * Handle modal address submission
     */

    var findAddressModal = $('#js-modal-find-address'); // findAddressModal.on('click', '.js-find-address-submit', function() {
    //   findAddressModal.modal('hide');
    //   $('.js-business-details-form').removeClass('d-none');
    // });

    var findAddressForm = findAddressModal.find('form');
    findAddressModal.on('submit', 'form', function (evt) {
      evt.preventDefault(); // get selected business address option

      var selectedAddress = findAddressForm.serializeArray().find(function (field) {
        return field.name === 'business-address';
      });

      if (selectedAddress.value === 'manual') {
        // manual address has been chosen, so we need to show Postcode Lookup
        $('.js-postcode-lookup').removeClass('d-none');
      } else {
        $('.js-postcode-lookup:not(.d-none)').addClass('d-none');
      } // dismiss the modal


      $('.js-business-details-form').removeClass('d-none');
      findAddressModal.modal('hide');
    });
    /*
     * Handle modal for custom VAT number
     */

    var customVatModal = $('#js-modal-custom-vat');
    /*
     * Initialize select2 plugin for operating countries tag picker
     */

    $('.js-operating-countries').select2({
      width: '100%'
    });
  });
})();

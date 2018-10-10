(function() {
  $(function() {

    /*
     * Handle Legal Entity Dropdown
     */

    // store all relevant forms in a variable
    const forms = $('.js-legal-entity-form');

    $('#legal-entities-picker').on('change', function() {
      // get the value of the option
      const val = $(this).val();

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

    findAddressModal.on('click', '.js-find-address-submit', function() {
      findAddressModal.modal('hide');
      $('.js-business-details-form').removeClass('d-none');
    });

    /*
     * Handle modal for custom VAT number
     */

    const customVatModal = $('#js-modal-custom-vat');

    $('.js-operating-countries').select2({
      width: '100%'
    });
  });
}());

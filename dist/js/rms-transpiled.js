"use strict";

(function () {
  /*
   * Helper functions
   */
  // pads the number with a 0 if it's a single digit
  // e.g. 1 => "01", 9 => "09", 10 => "10"
  var padNum = function padNum(num) {
    return num < 10 && num >= 0 ? "0".concat(num) : num;
  }; // returns the number of months between two dates
  // e.g. from April to October => 6


  var monthDiff = function monthDiff(from, to) {
    var months = to.getMonth() - from.getMonth() + 12 * (to.getFullYear() - from.getFullYear());

    if (to.getDate() < from.getDate()) {
      months--;
    }

    return months;
  };

  $(function () {
    /*
     * Handle Legal Entity Dropdown
     */
    // store all relevant forms in a variable
    var forms = $('.js-legal-entity-form');
    $('#legal-entities-picker').on('change', function () {
      // get the value of the option
      var val = this.value; // get the form related to the chosen option

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

    var findAddressModal = $('#js-modal-find-address');
    findAddressModal.on('submit', 'form', function (evt) {
      evt.preventDefault(); // get selected business address option

      var findAddressForm = findAddressModal.find('form');
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
     * Handle showing additional form for when merchant option unselected
     */

    var merchantAddressForm = $('.js-merchant-address-form');
    $('.js-address-merchant-opt').on('change', function () {
      if (this.checked) {
        merchantAddressForm.addClass('d-none');
      } else {
        merchantAddressForm.removeClass('d-none');
      }
    });
    /*
     * Handle showing VAT number field and link if BTO and Start Date meet requirement
     */

    var jsDate = new Date();
    var todayDate = "".concat(jsDate.getFullYear(), "-").concat(padNum(jsDate.getMonth()), "-").concat(padNum(jsDate.getDate()));
    var businessStartDateField = $('.js-business-date-start');
    var businessTurnoverField = $('.js-business-turnover');
    var vatGroup = $('.js-vat-group');
    var businessStartMonthsDifference = 0;
    var businessTurnover = 0; // set a dynamic max date for business start date

    businessStartDateField.attr('max', todayDate);

    var checkBusinessVatRequirement = function checkBusinessVatRequirement() {
      var startMonthsDifference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var turnover = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (startMonthsDifference >= 6 || turnover >= 85000) {
        vatGroup.removeClass('d-none');
      } else {
        vatGroup.addClass('d-none');
      }
    }; // when the date changes, check if it's at least 6 months prior to today


    businessStartDateField.on('input', function () {
      var val = this.value;
      var jsStartDate = new Date(val);
      businessStartMonthsDifference = monthDiff(jsStartDate, jsDate);
      checkBusinessVatRequirement(businessStartMonthsDifference, businessTurnover);
    }); // when the turnover field changes, check if it's enough to show vat field

    businessTurnoverField.on('input', function () {
      businessTurnover = this.value;
      checkBusinessVatRequirement(businessStartMonthsDifference, businessTurnover);
    });
    /*
     * Handle modal for custom VAT number
     */

    var charityNumberGroup = $('.js-charity-number-group');
    $('#js-modal-custom-vat').on('change', '.js-business-charity-option', function () {
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
      // there's a weird bug where the select box is miniscule on initialisation
      // which this line fixes
      width: '100%'
    });
  });
})();

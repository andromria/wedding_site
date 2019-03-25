$(document).ready(function () {
    $('#rsvp-form').validate({
        rules: {
            name: {
                required: true
            },
            attending: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: false,
                phoneUS: true
            }
        },
        validClass: 'is-valid',
        errorClass: 'is-invalid',
        unhighlight: function(element, errorClass, validClass){
            if (element.id !== 'attending'){
                $.validator.defaults.unhighlight(element, errorClass, validClass);
            }
            if (element.value === ''){
                $(element).removeClass(validClass);
            }
        },
        ignore: 'hidden',
        submitHandler: function(form, event){
          var form = $(this);
          var url = form.attr('action');

          $.ajax({
              type: "POST",
              url: url,
              data: form.serialize(), // serializes the form's elements.
              success: function(data){
                  $('#rsvp-form-container').hide();
                  $('#rsvp-submitted-container').show();
              },
              error: function(){
                  $('#rsvp-form-container').hide();
                  $('#rsvp-error-container').show();
              }
           });
        }
    });
    $('#attending').change(function(){
        if (this.value == "true"){
            $('div.addl-fields').show();
        }
        else{
          $('div.addl-fields').hide();
        }
    });
    var deadline = (Date.parse("Sat Jun 01 2019 00:00:00 GMT-0500 (Central Daylight Time)") - Date.now()) / 1000;
    if (deadline > 0) {
        $('#clock').FlipClock(deadline, {
            countdown: true,
            clockFace: 'DailyCounter',
        });
    } else {
        $('#clock').hide();
        $('#rsvp-form').hide();
    }
});

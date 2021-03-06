function refreshCaptcha() {
  $('#captchaimg').attr('src', "cgi/captcha.php?time=" + (new Date()).getTime());
}

$(document).ready(function () {
    refreshCaptcha();
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 15
            },
            captcha_code: {
                required: true,
                minlength: 6,
                maxlength: 6
            }
        },
        validClass: 'is-valid',
        errorClass: 'is-invalid',
        unhighlight: function(element, errorClass, validClass){
            $.validator.defaults.unhighlight(element, errorClass, validClass);
            if (element.value === ''){
                $(element).removeClass(validClass);
            }
        },
        submitHandler: function(form, event){
          $('#captcha_code').removeClass('is-invalid');
          var form = $(form);
          var url = form.attr('action');
          $.ajax({
              type: "POST",
              url: url,
              data: form.serialize(), // serializes the form's elements.
              success: function(data){
                  $('#contact-form-container').hide();
                  $('#contact-submitted-container').show();
              },
              error: function(response){
                if (response.responseText == 'captcha failed'){
                  $('#captcha_code').val('').addClass('is-invalid');
                }
                else {
                  $('#contact-form-container').hide();
                  $('#contact-error-container').show();
                }
              }
           });
        }
    });
});

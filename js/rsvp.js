function refreshCaptcha() {
  $('#captchaimg').attr('src', "cgi/captcha.php?time=" + (new Date()).getTime());
}

$(document).ready(function () {
    refreshCaptcha();
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
            },
            attendees: {
                required: true,
                min: 1,
                max: 5
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
            if (element.id !== 'attending'){
                $.validator.defaults.unhighlight(element, errorClass, validClass);
            }
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
                  $('#rsvp-form-container').hide();
                  $('#rsvp-submitted-container').show();
              },
              error: function(response){
                if (response.responseText == 'captcha failed'){
                  $('#captcha_code').val('').addClass('is-invalid');
                }
                else {
                  $('#rsvp-form-container').hide();
                  $('#rsvp-error-container').show();
                }
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
    var labels = ['weeks', 'days', 'hours', 'minutes', 'seconds'],
      deadline = Date.parse("Sat Jun 01 2019 00:00:00 GMT-0500 (Central Daylight Time)"),
      template = _.template($('#flip-clock-template').html()),
      currDate = '00:00:00:00:00',
      nextDate = '00:00:00:00:00',
      parser = /([0-9]{2})/gi,
      $example = $('#flip-clock');
    // Parse countdown string to an object
    function strfobj(str) {
      var parsed = str.match(parser),
        obj = {};
      labels.forEach(function(label, i) {
        obj[label] = parsed[i]
      });
      return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
      var diff = [];
      labels.forEach(function(key) {
        if (obj1[key] !== obj2[key]) {
          diff.push(key);
        }
      });
      return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function(label, i) {
      $example.append(template({
        curr: initData[label],
        next: initData[label],
        label: label
      }));
    });
    // Starts the countdown
    $example.countdown(deadline, function(event) {
      var newDate = event.strftime('%w:%d:%H:%M:%S'),
        data;
      if (newDate !== nextDate) {
        currDate = nextDate;
        nextDate = newDate;
        // Setup the data
        data = {
          'curr': strfobj(currDate),
          'next': strfobj(nextDate)
        };
        // Apply the new values to each node that changed
        diff(data.curr, data.next).forEach(function(label) {
          var selector = '.%s'.replace(/%s/, label),
              $node = $example.find(selector);
          // Update the node
          $node.removeClass('flip');
          $node.find('.curr').text(data.curr[label]);
          $node.find('.next').text(data.next[label]);
          // Wait for a repaint to then flip
          _.delay(function($node) {
            $node.addClass('flip');
          }, 50, $node);
        });
      }
    });
});

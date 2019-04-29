<?php
    session_start();
    $config = include('config.php');

    if(empty($_SESSION['captcha_code'] ) || strcasecmp($_SESSION['captcha_code'], $_POST['captcha_code']) != 0){
      echo 'captcha failed';
      http_response_code(400);
    }else{// Captcha verification is Correct. Final Code Execute here!
      $msg_dict = array();
      $msg_dict['time'] = time();
      if (array_key_exists('REMOTE_ADDR', $_SERVER)){
        $msg_dict['ip'] = $_SERVER['REMOTE_ADDR'];
      }
      if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
        $msg_dict['proxy'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
      }
      if (array_key_exists('name', $_POST)){
        $msg_dict['name'] = $_POST['name'];
      }
      else {
        http_response_code(400);
      }
      if (array_key_exists('attending', $_POST)){
        $msg_dict['attending'] = $_POST['attending'];
      }
      else {
        http_response_code(400);
      }
      if (array_key_exists('email', $_POST)){
        $msg_dict['email'] = $_POST['email'];
      }
      if (array_key_exists('phone', $_POST)){
        $msg_dict['phone'] = $_POST['phone'];
      }
      if (array_key_exists('attendees', $_POST)){
        $msg_dict['attendees'] = $_POST['attendees'];
      }
      else {
        http_response_code(400);
      }
      $to = $config['email_to'];
      $subject = 'RSVP';
      $message = json_encode($msg_dict);
      $headers = 'From: ' . $config['email_from'] . "\r\n" .
          'Reply-To: ' . $config['email_from'] . "\r\n" .
          'X-Mailer: ' . $config['email_agent'];

      mail($to, $subject, $message, $headers);
      echo 'submitted';
    }
?>

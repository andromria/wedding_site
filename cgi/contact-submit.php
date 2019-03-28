<?php
    $config = include('config.php');


    $msg_dict = array(
      'ip' => $_SERVER['REMOTE_ADDR'];
    );
    if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
      $msg_dict['proxy'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    if (array_key_exists('name', $_POST)){
      $msg_dict['name'] = $_POST['name'];
    }
    else {
      http_response_code(400);
    }
    if (array_key_exists('email', $_POST)){
      $msg_dict['email'] = $_POST['email'];
    }
    else {
      http_response_code(400);
    }
    if (array_key_exists('message', $_POST)){
      $msg_dict['message'] = $_POST['message'];
    }
    else {
      http_response_code(400);
    }
    $to = $config['email_to'];
    $subject = 'CONTACT';
    $message = json_encode($msg_dict);
    $headers = 'From: ' . $config['email_from'] . "\r\n" .
        'Reply-To: ' . $config['email_from'] . "\r\n" .
        'X-Mailer: ' . $config['email_agent'];

    mail($to, $subject, $message, $headers);
    echo 'submitted';
?>

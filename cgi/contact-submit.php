<?php
    $config = include('config.php');


    $to = $config['email_to'];
    $subject = 'CONTACT';
    $message = json_encode($_POST);
    $headers = 'From: ' . $config['email_from'] . "\r\n" .
        'Reply-To: ' . $config['email_from'] . "\r\n" .
        'X-Mailer: ' . $config['email_agent'];

    mail($to, $subject, $message, $headers);
    echo 'submitted';
?>

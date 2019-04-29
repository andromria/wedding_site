<?php
session_start();
include("./phptextClass.php");
$phptextObj = new phptextClass();
$phptextObj->phpcaptcha('#162453','#fff',120,40,10,25);
 ?>

<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_POST['email'])) {
	$from="bhagchand.saini@aurigait.com";
	$to      = $_REQUEST['email'];
	$subject = 'Demo test for email';
	$message = 'hello';
	$headers = 'From: '.$from. "\r\n" .
	    'Reply-To: '.$from . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "riizr";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	$email=$_REQUEST['email'];
	$utm_campaign=$_REQUEST['utm_campaign'];
	$utm_medium=$_REQUEST['utm_medium'];
	$utm_source=$_REQUEST['utm_source'];
	$type=$_REQUEST['type'];
	$ip=get_client_ip_server();

	$sql = "INSERT INTO kyynd_email_subscription (type, email, ip,utm_campaign,utm_medium,utm_source)
	VALUES ('$type','$email', '$ip','$utm_campaign','$utm_medium','$utm_source')";
	if ($conn->query($sql) === TRUE) {
		$conn->close();
		header('Location: '.'../html/thanks.html');
	} 
}else {
	header('Location: '.'../html/thanks.html');
}

	
function get_client_ip_server() {
    $ipaddress = '';
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}

?>
<?php 
//error_reporting(-1);
//ini_set('display_errors', 'On');
//set_error_handler("var_dump");
function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    /* curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "username:password");*/

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

$errors = '';
$myemail = 'contact@websitescene.co.uk';//<-----Put Your email address here.
$fromemail = $myemail;
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "Error: all fields are required;";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 
$phone = $_POST['phone'];

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address;";
}

if( empty($errors))
{
	$to = $myemail; 
	$email_subject = "Contact form submission: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\r\n Name: $name \r\n Email: $email_address \r\n Tel: $phone \r\n Message \r\n $message"; 
	
	$headers = "From: $fromemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	//$result = mail($to,$email_subject,$email_body,$headers);
	$url = "http://email-webservice.herokuapp.com/email/addemail";
	$data = [
		"name" => $name,
		"email" => $email_address,
		"message" => $email_body
    ];
    $result = CallAPI('POST',$url,$data);
    header('Location: /?success=true');
	//echo $result;
} else {
    //echo $errors;
    header('Location: /?success=false&errors=$errors');
}
?>
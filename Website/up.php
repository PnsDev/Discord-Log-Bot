<?php
$secret_key = "make a key here";
$lengthofstring = 8; //Length of the file name

function RandomString($length) {
    $keys = array_merge(range(0,9), range('a', 'z'));

    $key = '';
    for($i=0; $i < $length; $i++) {
        $key .= $keys[mt_rand(0, count($keys) - 1)];
    }
    return $key;
}

if(isset($_POST['secret']))
{
    if($_POST['secret'] == $secret_key)
    {
        $filename = RandomString($lengthofstring);
        $target_file = $_FILES["file"]["name"];
        $fileType = pathinfo($target_file, PATHINFO_EXTENSION);
        if($fileType == 'txt')
        {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], 'logs/'.$filename.'.'.$fileType))
            {
                echo $filename.'.'.$fileType;
            }
                else
            {
            echo 'Error: File upload failed - CHMOD/Folder doesn\'t exist?';
            }
        }
        else
        {
            echo 'Error: File type "'.$fileType.'" is not valid';
        }
    }
    else
    {
        echo 'Error: Invalid Secret Key';
    }
}
else
{
    echo 'Error: No post data recieved';
}
?>

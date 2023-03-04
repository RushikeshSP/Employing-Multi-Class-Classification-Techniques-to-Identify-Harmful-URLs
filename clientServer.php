<?php
header("Access-Control-Allow-Origin: *");

$site = isset($_POST['url']) ? $_POST['url'] : null;
if (!empty($site)) {
    $decision=exec("C:\Users\HP\AppData\Local\Programs\Python\Python39\python.exe test.py $site 2>&1 ");
    echo $decision;
} else {
    echo "Error: URL is null or empty.";
}
?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/omega.php';


$database = new Database();
$db = $database->getConnection();

$omega = new Omega($db);

$omega->id = isset($_GET['id']) ? $_GET['id'] : die();


$omega->readRow();

if ($omega->nombre != null) {

    $omega_item  = array(
        "omegaID" => $omega->id,
        "nombre" => $omega->nombre
    );

    http_response_code(200);

    echo json_encode($omega_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Omega does not exist."));
}

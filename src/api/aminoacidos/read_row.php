<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/aminoacido.php';


$database = new Database();
$db = $database->getConnection();

$aminoacido = new Aminoacido($db);

$aminoacido->id = isset($_GET['id']) ? $_GET['id'] : die();


$aminoacido->readRow();

if ($aminoacido->nombre != null) {

    $amino_item  = array(
        "aminoID" => $aminoacido->id,
        "nombre" => $aminoacido->nombre
    );

    http_response_code(200);

    echo json_encode($amino_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Aminoacido does not exist."));
}

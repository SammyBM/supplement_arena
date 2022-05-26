<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/advertencia.php';


$database = new Database();
$db = $database->getConnection();

$advertencia = new Advertencia($db);

$advertencia->id = isset($_GET['id']) ? $_GET['id'] : die();


$advertencia->readRow();

if ($advertencia->nombre != null) {

    $advertencia_item  = array(
        "advertenciaID" => $advertencia->id,
        "nombre" => $advertencia->nombre,
        "resumen" => $advertencia->resumen
    );

    http_response_code(200);

    echo json_encode($advertencia_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Advertencia does not exist."));
}

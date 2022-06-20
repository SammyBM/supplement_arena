<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/reporte.php';

$database = new Database();
$db = $database->getConnection();

$reporte = new Reporte($db);

$data = json_decode(file_get_contents("php://input"));

$reporte->id = $data->id;

$reporte->resumen = $data->resumen;
$reporte->texto = $data->texto;
$reporte->fechaCreacion = $data->fechaCreacion;
$reporte->articuloID = $data->articuloID;
$reporte->usuarioID = $data->usuarioID;

if ($reporte->update()) {
    http_response_code(200);

    echo json_encode(array("message" => "reporte was updated."));
} else {
    http_response_code(503);

    echo json_encode(array("message" => "Unable to update reporte."));
}

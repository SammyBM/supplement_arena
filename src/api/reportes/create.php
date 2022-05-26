<?php

header('Access-Control-Allow-Origin');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../objects/reporte.php';

$database = new Database();
$db = $database->getConnection();

$reporte = new Reporte($db);

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->texto) &&
    empty($data->fechaCreacion) &&
    empty($data->articuloID) &&
    empty($data->usuarioID)
) {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create reporte. Data incomplete."));
} else {
    $reporte->texto = $data->texto;
    $reporte->fechaCreacion = $data->fechaCreacion;
    $reporte->articuloID = $data->articuloID;
    $reporte->usuarioID = $data->usuarioID;

    if ($reporte->create()) {

        http_response_code(201);

        echo json_encode(array("success" => "reporte created"));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to create reporte."));
    }
}

<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../objects/ingrediente.php';

$database = new Database();
$db = $database->getConnection();

$ingrediente = new Ingrediente($db);

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->nombre) &&
    empty($data->alergeno)
) {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create ingrediente. Data incomplete."));
} else {
    $ingrediente->nombre = $data->nombre;
    $ingrediente->alergeno = $data->alergeno;

    if ($ingrediente->create()) {

        http_response_code(201);

        echo json_encode(array("success" => "Ingrediente created"));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to create ingrediente."));
    }
}

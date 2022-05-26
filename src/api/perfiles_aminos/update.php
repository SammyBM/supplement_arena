<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/perfil_aminoacidos.php';

$database = new Database();
$db = $database->getConnection();

$perf = new PerfilAminos($db);

$data = json_decode(file_get_contents("php://input"));

$perf->aminos = $data->aminos;

if (count($perf->aminos) != 20) {
    if ($perf->update()) {
        http_response_code(200);

        echo json_encode(array("message" => "Perfil aminos was updated."));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to update perfil aminos."));
    }
} else {
    http_response_code(418);

    echo json_encode(array("message" => "Informacion incompatible con perfil aminos"));
}

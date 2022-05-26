<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/perfil_acido_grasos.php';

$database = new Database();
$db = $database->getConnection();

$perf = new PerfilAG($db);

$data = json_decode(file_get_contents("php://input"));

$perf->acidosGrasos = $data->acidosGrasos;

if (count($perf->acidosGrasos) != 20) {
    if ($perf->update()) {
        http_response_code(200);

        echo json_encode(array("message" => "Perfil acidos grasos was updated."));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to update perfil acidos grasos."));
    }
} else {
    http_response_code(418);

    echo json_encode(array("message" => "Informacion incompatible con perfil acidos grasos"));
}

<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/perfil_ingredientes.php';

$database = new Database();
$db = $database->getConnection();

$perf = new PerfilIngredientes($db);

$data = json_decode(file_get_contents("php://input"));

$perf->ingredientes = $data->ingredientes;

if (count($perf->ingredientes) != 20) {
    if ($perf->update()) {
        http_response_code(200);

        echo json_encode(array("message" => "Perfil ingredientes was updated."));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to update perfil ingredientes."));
    }
} else {
    http_response_code(418);

    echo json_encode(array("message" => "Informacion incompatible con perfil ingredientes"));
}

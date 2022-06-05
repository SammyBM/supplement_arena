<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/perfil_advertencias.php';

$database = new Database();
$db = $database->getConnection();

$perf = new PerfilAdvertencias($db);

$data = json_decode(file_get_contents("php://input"));

$perf->advertencias = $data->advertencias;

if ($perf->delete()) {
    http_response_code(200);

    echo json_encode(array("message" => "Perfil advertencias deleted successfully"));
} else {
    http_response_code(503);

    echo json_encode(array("message" => "Unable to delete perfil advertencias."));
}

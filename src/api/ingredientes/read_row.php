<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/ingrediente.php';


$database = new Database();
$db = $database->getConnection();

$ingrediente = new Ingrediente($db);

$ingrediente->id = isset($_GET['id']) ? $_GET['id'] : die();


$ingrediente->readRow();

if ($ingrediente->nombre != null) {

    $ingrediente_item  = array(
        "ingredienteID" => $ingrediente->id,
        "nombre" => $ingrediente->nombre,
        "alergeno" => $ingrediente->alergeno
    );

    http_response_code(200);

    echo json_encode($ingrediente_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Ingrediente does not exist."));
}

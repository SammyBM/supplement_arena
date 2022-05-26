<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/vitamina.php';


$database = new Database();
$db = $database->getConnection();

$vitamina = new Vitamina($db);

$vitamina->id = isset($_GET['id']) ? $_GET['id'] : die();


$vitamina->readRow();

if ($vitamina->nombre != null) {

    $vitamina_item  = array(
        "vitaminaID" => $vitamina->id,
        "nombre" => $vitamina->nombre,
        "reqDiario" => $vitamina->reqDiario
    );

    http_response_code(200);

    echo json_encode($vitamina);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Vitamina does not exist."));
}

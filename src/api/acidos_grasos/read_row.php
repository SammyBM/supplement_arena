<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/acido_graso.php';


$database = new Database();
$db = $database->getConnection();

$acido_graso = new AcidoGraso($db);

$acido_graso->id = isset($_GET['id']) ? $_GET['id'] : die();


$acido_graso->readRow();

if ($acido_graso->nombre != null) {

    $acido_graso_item  = array(
        "acidoGrasoID" => $acido_graso->id,
        "nombre" => $acido_graso->nombre
    );

    http_response_code(200);

    echo json_encode($acido_graso_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Acido graso does not exist."));
}

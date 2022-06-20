<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/reporte.php';


$database = new Database();
$db = $database->getConnection();

$reporte = new Reporte($db);

$reporte->id = isset($_GET['id']) ? $_GET['id'] : die();


$reporte->readRow();

if ($reporte->texto != null) {

    $reporte_array = array(
        "reporteID" => $reporte->id,
        "resumen" => $reporte->resumen,
        "texto" => $reporte->texto,
        "fechaCreacion" => $reporte->fechaCreacion,
        "reporteID" => $reporte->reporteID,
        "usuarioID" => $reporte->usuarioID
    );


    http_response_code(200);

    echo json_encode($reporte_array);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "reporte does not exist."));
}

<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/reporte.php';

$database = new Database();
$db = $database->getConnection();

$reporte = new Reporte($db);

$stmt = $reporte->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $reportes_array = array();
    $reportes_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $reporte_item  = array(
            "reporteID" => $id,
            "resumen" => $resumen,
            "texto" => $texto,
            "fechaCreacion" => $fechaCreacion,
            "articuloID" => $articuloID,
            "usuarioID" => $usuarioID
        );

        array_push($reportes_array["records"], $reporte_item);
    }

    http_response_code(200);

    echo json_encode($reportes_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Reporte Not Found")
    );
}

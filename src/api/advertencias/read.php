<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/advertencia.php';

$database = new Database();
$db = $database->getConnection();

$advertencia = new Advertencia($db);

$stmt = $advertencia->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $advertencia_array = array();
    $advertencia_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $advertencia_item  = array(
            "advertenciaID" => $id,
            "nombre" => $nombre,
            "resumen" => $resumen
        );

        array_push($advertencia_array["records"], $advertencia_item);
    }

    http_response_code(200);

    echo json_encode($advertencia_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

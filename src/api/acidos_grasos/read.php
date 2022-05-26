<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/acido_graso.php';

$database = new Database();
$db = $database->getConnection();

$acido_graso = new AcidoGraso($db);

$stmt = $acido_graso->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $acido_graso_array = array();
    $acido_graso_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $acido_graso_item  = array(
            "acidoGrasoID" => $id,
            "nombre" => $nombre
        );

        array_push($acido_graso_array["records"], $acido_graso_item);
    }

    http_response_code(200);

    echo json_encode($acido_graso_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

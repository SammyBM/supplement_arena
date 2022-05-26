<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/vitamina.php';

$database = new Database();
$db = $database->getConnection();

$vitamina = new Vitamina($db);

$stmt = $vitamina->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $vitamina_array = array();
    $vitamina_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $vitamina_item  = array(
            "vitaminaID" => $id,
            "nombre" => $nombre,
            "reqDiario" => $reqDiario
        );

        array_push($vitamina_array["records"], $vitamina_item);
    }

    http_response_code(200);

    echo json_encode($vitamina_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

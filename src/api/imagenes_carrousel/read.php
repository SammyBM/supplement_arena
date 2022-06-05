<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/carrousel.php';

$database = new Database();
$db = $database->getConnection();

$categoria = new Carrousel($db);

$stmt = $categoria->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $fotos_array = array();
    $fotos_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $foto_item  = array(
            "fotoID" => $id,
            "nombreFoto" => $nombreFoto
        );

        array_push($fotos_array["records"], $foto_item);
    }

    http_response_code(200);

    echo json_encode($fotos_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Imagenes Not Found")
    );
}

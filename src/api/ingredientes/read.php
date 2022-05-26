<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/ingrediente.php';

$database = new Database();
$db = $database->getConnection();

$ingrediente = new Ingrediente($db);

$stmt = $ingrediente->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $ingredientes_array = array();
    $ingredientes_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $ingrediente_item  = array(
            "ingredienteID" => $id,
            "nombre" => $nombre,
            "alergeno" => $alergeno
        );

        array_push($ingredientes_array["records"], $ingrediente_item);
    }

    http_response_code(200);

    echo json_encode($ingredientes_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

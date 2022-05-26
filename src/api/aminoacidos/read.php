<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/aminoacido.php';

$database = new Database();
$db = $database->getConnection();

$aminoacido = new Aminoacido($db);

$stmt = $aminoacido->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $aminos_array = array();
    $aminos_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $amino_item  = array(
            "aminoID" => $id,
            "nombre" => $nombre
        );

        array_push($aminos_array["records"], $amino_item);
    }

    http_response_code(200);

    echo json_encode($aminos_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

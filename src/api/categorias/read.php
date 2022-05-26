<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/categoria.php';

$database = new Database();
$db = $database->getConnection();

$categoria = new Categoria($db);

$stmt = $categoria->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $categorias_array = array();
    $categorias_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $categoria_item  = array(
            "categoriaID" => $id,
            "nombre" => $nombre
        );

        array_push($categorias_array["records"], $categoria_item);
    }

    http_response_code(200);

    echo json_encode($categorias_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

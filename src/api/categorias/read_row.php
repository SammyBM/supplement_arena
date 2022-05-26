<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/categoria.php';


$database = new Database();
$db = $database->getConnection();

$categoria = new Categoria($db);

$categoria->id = isset($_GET['id']) ? $_GET['id'] : die();


$categoria->readRow();

if ($categoria->nombre != null) {

    $categoria_item  = array(
        "categoriaID" => $categoria->id,
        "nombre" => $categoria->nombre
    );

    http_response_code(200);

    echo json_encode($categoria_item);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Categoria does not exist."));
}

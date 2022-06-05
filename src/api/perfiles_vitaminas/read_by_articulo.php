<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/perfil_vitaminas.php';


$database = new Database();
$db = $database->getConnection();

$perf = new PerfilVitaminas($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();


$stmt = $perf->readByArticulo($id);
$num = $stmt->rowCount();

if ($num > 0) {
    $articulos_array = array();


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $articulo_item  = array(
            "nombre" => $nombre,
            "cantidad" => $cantidad
        );

        array_push($articulos_array, $articulo_item);
    }

    http_response_code(200);

    echo json_encode($articulos_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Perfil vitaminas Not Found")
    );
}

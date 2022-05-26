<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/articulo.php';


$database = new Database();
$db = $database->getConnection();

$articulo = new Articulo($db);

$articulo->id = isset($_GET['id']) ? $_GET['id'] : die();


$articulo->readRow();

if ($articulo->titulo != null) {

    $articulo_array = array(
        "articuloID" => $articulo->id,
        "titulo" => $articulo->titulo,
        "etiquetas" => $articulo->etiquetas,
        "imagen" => $articulo->imagen,
        "categoriaID" => $articulo->categoriaID,
        "tamanoPorcion" => $articulo->tamanoPorcion,
        "calorias" => $articulo->calorias,
        "proteina" => $articulo->proteina,
        "lipidos" => $articulo->lipidos,
        "carbohidratos" => $articulo->carbohidratos
    );


    http_response_code(200);

    echo json_encode($articulo_array);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "Articulo does not exist."));
}

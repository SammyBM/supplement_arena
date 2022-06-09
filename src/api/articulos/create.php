<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../objects/articulo.php';

$database = new Database();
$db = $database->getConnection();

$articulo = new Articulo($db);

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->titulo) &&
    empty($data->etiquetas) &&
    empty($data->imagen) &&
    empty($data->categoriaID) &&
    empty($data->tamanoPorcion) &&
    empty($data->calorias) &&
    empty($data->proteina) &&
    empty($data->lipidos) &&
    empty($data->carbohidratos)
) {
    http_response_code(400);

    echo json_encode(array($data->titulo, $data->etiquetas, $data->imagen, $data->categoriaID, $data->tamanoPorcion, $data->calorias, $data->proteina, $data->lipidos, $data->carbohidratos));
    echo json_encode(array("message" => "Unable to create articulo. Data incomplete."));
} else {
    $articulo->titulo = $data->titulo;
    $articulo->etiquetas = $data->etiquetas;
    $articulo->imagen = $data->imagen;
    $articulo->categoriaID = $data->categoriaID;
    $articulo->tamanoPorcion = $data->tamanoPorcion;
    $articulo->calorias = $data->calorias;
    $articulo->proteina = $data->proteina;
    $articulo->lipidos = $data->lipidos;
    $articulo->carbohidratos = $data->carbohidratos;

    if ($articulo->create()) {

        http_response_code(201);

        echo json_encode(array("success" => "Articulo created"));
    } else {
        http_response_code(503);

        echo json_encode(array("message" => "Unable to create articulo."));
    }
}

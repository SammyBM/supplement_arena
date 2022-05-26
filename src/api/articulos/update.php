<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/articulo.php';

$database = new Database();
$db = $database->getConnection();

$articulo = new Articulo($db);

$data = json_decode(file_get_contents("php://input"));

$articulo->id = $data->id;

$articulo->titulo = $data->titulo;
$articulo->etiquetas = $data->etiquetas;
$articulo->imagen = $data->imagen;
$articulo->categoriaID = $data->categoriaID;
$rticulo->tamanoPorcion = $data->tamanoPorcion;
$articulo->calorias = $data->calorias;
$articulo->proteina = $data->proteina;
$articulo->lipidos = $data->lipidos;
$articulo->carbohidratos = $data->carbohidratos;

if ($articulo->update()) {
    http_response_code(200);

    echo json_encode(array("message" => "Articulo was updated."));
} else {
    http_response_code(503);

    echo json_encode(array("message" => "Unable to update articulo."));
}

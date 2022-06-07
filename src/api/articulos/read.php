<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/articulo.php';

$database = new Database();
$db = $database->getConnection();

$articulo = new Articulo($db);

$stmt = $articulo->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $articulos_array = array();
    $articulos_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $articulo_item  = array(
            "articuloID" => $articuloID,
            "titulo" => $titulo,
            "etiquetas" => $etiquetas,
            "imagen" => $imagen,
            "categoriaID" => $categoriaID,
            "tamanoPorcion" => $tamanoPorcion,
            "calorias" => $calorias,
            "proteina" => $proteina,
            "lipidos" => $lipidos,
            "carbohidratos" => $carbohidratos
        );

        array_push($articulos_array["records"], $articulo_item);
    }

    http_response_code(200);

    echo json_encode($articulos_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Articulo Not Found")
    );
}

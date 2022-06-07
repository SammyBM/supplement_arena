<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/perfil_omegas.php';

$database = new Database();
$db = $database->getConnection();

$perfil = new PerfilOmegas($db);

$stmt = $perfil->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $perfils_array = array();
    $perfils_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $perfil_item  = array(
            "omegas" => $omegas
        );

        array_push($perfils_array["records"], $perfil_item);
    }

    http_response_code(200);

    echo json_encode($perfils_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Perfil omegas Not Found")
    );
}

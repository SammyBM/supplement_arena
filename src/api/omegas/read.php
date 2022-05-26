<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/omega.php';

$database = new Database();
$db = $database->getConnection();

$omega = new Omega($db);

$stmt = $omega->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $omegas_array = array();
    $omegas_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $omega_item  = array(
            "omegaID" => $id,
            "nombre" => $nombre
        );

        array_push($omegas_array["records"], $omega_item);
    }

    http_response_code(200);

    echo json_encode($omegas_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "Not Found")
    );
}

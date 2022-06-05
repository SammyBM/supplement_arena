<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf8');

include_once '../config/database.php';
include_once '../objects/usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$stmt = $usuario->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $usuarios_array = array();
    $usuarios_array["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $usuario_item  = array(
            "usuarioID" => $id,
            "tipoUsuarioID" => $tipoUsuario,
            "correo" => $correo,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "nombreUsuario" => $nombreUsuario,
            "fechaNacimiento" => $fechaNacimiento,
            "contrasena" => $contrasena
        );

        array_push($usuarios_array["records"], $usuario_item);
    }

    http_response_code(200);

    echo json_encode($usuarios_array);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "User Not Found")
    );
}

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


include_once '../config/database.php';
include_once '../objects/usuario.php';


$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$usuario->correo = $_POST['correo'];
$usuario->contrasena = $_POST['contrasena'];

$usuario->login();

if ($usuario != false && $usuario != null) {

    $usuario_array = array(
        "usuarioID" => $usuario->id,
        "tipoUsuarioID" => $usuario->tipoUsuarioID,
        "correo" => $usuario->correo,
        "nombre" => $usuario->nombre,
        "apellido" => $usuario->apellido,
        "nombreUsuario" => $usuario->nombreUsuario,
        "fechaNacimiento" => $usuario->fechaNacimiento,
    );


    http_response_code(200);

    echo json_encode($usuario_array);
} else {

    http_response_code(404);

    echo json_encode(array("message" => "User does not exist."));
}

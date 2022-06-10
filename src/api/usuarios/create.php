<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../objects/usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->tipoUsuario) &&
    empty($data->correo) &&
    empty($data->nombre) &&
    empty($data->apellido) &&
    empty($data->nombreUsuario) &&
    empty($data->fechaNacimiento) &&
    empty($data->contrasena)
) {
    http_response_code(400);

    echo json_encode(array("message" => "Unable to create usuario. Data incomplete."));
} else {
    $contrasena_hash = password_hash($data->contrasena, PASSWORD_BCRYPT);

    $usuario->tipoUsuario = $data->tipoUsuario;
    $usuario->correo = $data->correo;
    $usuario->nombre = $data->nombre;
    $usuario->apellido = $data->apellido;
    $usuario->nombreUsuario = $data->nombreUsuario;
    $usuario->fechaNacimiento = $data->fechaNacimiento;
    $usuario->contrasena = $contrasena_hash;

    if ($usuario->login() == null) {

        if ($usuario->create()) {

            http_response_code(201);

            echo json_encode(array("success" => "usuario created"));
        } else {
            http_response_code(503);

            echo json_encode(array("message" => "Unable to create usuario."));
        }
    } else {
        echo json_encode(array("message" => "User already exists"));
    }
}

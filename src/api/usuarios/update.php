<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

$usuario->id = $data->id;

$usuario->tipoUsuario = $data->tipoUsuario;
$usuario->correo = $data->correo;
$usuario->nombre = $data->nombre;
$usuario->apellido = $data->apellido;
$usuario->nombreUsuario = $data->nombreUsuario;
$usuario->fechaNacimiento = $data->fechaNacimiento;
$usuario->contrasena = $data->contrasena;

if ($usuario->update()) {
    http_response_code(200);

    echo json_encode(array("message" => "Usuario was updated."));
} else {
    http_response_code(503);

    echo json_encode(array("message" => "Unable to update usuario."));
}

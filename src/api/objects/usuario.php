<?php
class Usuario
{
    private $connection;
    private $table_name = "usuarios";

    public $id;
    public $tipoUsuario;
    public $correo;
    public $nombre;
    public $apellido;
    public $nombreUsuario;
    public $fechaNacimiento;
    public $contrasena;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " SET tipoUsuarioID=:tipoUsuario, correo=:correo, nombre=:nombre, apellido=:apellido,nombreUsuario=:nombreUsuario,fechaNacimiento=:fechaNacimiento,contrasena=:contrasena";

        $stmt = $this->connection->prepare($query);

        $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
        $this->fechaNacimiento = htmlspecialchars(strip_tags($this->fechaNacimiento));

        $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);
        $stmt->bindParam(':correo', $this->correo);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':apellido', $this->apellido);
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam('fechaNacimiento', $this->fechaNacimiento);
        $stmt->bindParam('contrasena', $this->contrasena);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readRow()
    {
        $query = "SELECT tipoUsuarioID, nombre, apellido, nombreUsuario, fechaNacimiento, contrasena FROM " . $this->table_name . " WHERE usuarioID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->tipoUsuario = $row['tipoUsuarioID'];
        $this->nombre = $row['nombre'];
        $this->apellido = $row['apellido'];
        $this->nombreUsuario = $row['nombreUsuario'];
        $this->fechaNacimiento = $row['fechaNacimiento'];
        $this->contrasena = $row['contrasena'];
    }

    function update()
    {
        $query = "UPDATE" . $this->table_name . "SET tipoUsuarioID=:tipoUsuarioID, nombre = :nombre, apellido = :apellido, nombreUsuario = :nombreUsuario, fechaNacimiento = :fechaNacimiento WHERE usuarioID = :id";

        $stmt = $this->connection->prepare($query);

        $this->tipoUsuario = htmlspecialchars(strip_tags($this->tipoUsuario));
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->nombreUsuario = htmlspecialchars(strip_tags($this->nombreUsuario));
        $this->fechaNacimiento = htmlspecialchars(strip_tags($this->fechaNacimiento));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':tipoUsuario', $this->tipoUsuario);
        $stmt->bindParam(':correo', $this->correo);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':apellido', $this->apellido);
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':fechaNacimiento', $this->fechaNacimiento);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->connection->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}

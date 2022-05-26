<?php
class Ingrediente
{
    private $connection;
    private $table_name = "ingredientes";

    public $id;
    public $nombre;
    public $alergeno;

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
        $query = "INSERT INTO " . $this->table_name . " SET nombre=:nombre, alergeno=:alergeno";

        $stmt = $this->connection->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->alergeno = htmlspecialchars(strip_tags($this->alergeno));

        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':alergeno', $this->alergeno);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readRow()
    {
        $query = "SELECT nombre, alergeno FROM " . $this->table_name . " WHERE ingrdienteID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->nombre = $row['nombre'];
        $this->alergeno = $row['alergeno'];
    }
}

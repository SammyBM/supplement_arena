<?php
class Vitamina
{
    private $connection;
    private $table_name = "vitaminas";

    public $id;
    public $nombre;
    public $reqDiario;

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

    function readRow()
    {
        $query = "SELECT nombre, reqDiario FROM " . $this->table_name . " WHERE vitaminaID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->nombre = $row['nombre'];
        $this->reqDiario = $row['reqDiario'];
    }
}

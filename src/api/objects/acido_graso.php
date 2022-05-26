<?php
class AcidoGraso
{
    private $connection;
    private $table_name = "acidos_grasos";

    public $id;
    public $nombre;

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
        $query = "SELECT nombre FROM " . $this->table_name . " WHERE acidoGrasoID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->nombre = $row['nombre'];
    }
}

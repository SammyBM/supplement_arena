<?php
class Reporte
{
    private $connection;
    private $table_name = "reportes";

    public $id;
    public $resumen;
    public $texto;
    public $fechaCreacion;
    public $articuloID;
    public $usuarioID;

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
        $query = "INSERT INTO " . $this->table_name . " SET resumen=:resumen, texto=:texto, fechaCreacion=:fechaCreacion, articuloID=:articuloID,usuarioID=:usuarioID";

        $stmt = $this->connection->prepare($query);

        $this->resumen = htmlspecialchars(strip_tags($this->resumen));
        $this->texto = htmlspecialchars(strip_tags($this->texto));
        $this->fechaCreacion = htmlspecialchars(strip_tags($this->fechaCreacion));
        $this->articuloID = htmlspecialchars(strip_tags($this->articuloID));
        $this->usuarioID = htmlspecialchars(strip_tags($this->usuarioID));

        $stmt->bindParam(':resumen', $this->resumen);
        $stmt->bindParam(':texto', $this->texto);
        $stmt->bindParam(':fechaCreacion', $this->fechaCreacion);
        $stmt->bindParam(':articuloID', $this->articuloID);
        $stmt->bindParam(':usuarioID', $this->usuarioID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readRow()
    {
        $query = "SELECT resumen, texto, fechaCreacion, articuloID, usuarioID  FROM " . $this->table_name . " WHERE reporteID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->resumen = $row['resumen'];
        $this->texto = $row['texto'];
        $this->fechaCreacion = $row['fechaCreacion'];
        $this->articuloID = $row['articuloID'];
        $this->usuarioID = $row['usuarioID'];
    }

    function update()
    {
        $query = "UPDATE" . $this->table_name . "SET resumen=:resumen, texto=:texto, fechaCreacion=:fechaCreacion, articuloID=:articuloID,usuarioID=:usuarioID WHERE usuarioID = :id";

        $stmt = $this->connection->prepare($query);

        $this->resumen = htmlspecialchars(strip_tags($this->resumen));
        $this->texto = htmlspecialchars(strip_tags($this->texto));
        $this->fechaCreacion = htmlspecialchars(strip_tags($this->fechaCreacion));
        $this->articuloID = htmlspecialchars(strip_tags($this->articuloID));
        $this->usuarioID = htmlspecialchars(strip_tags($this->usuarioID));

        $stmt->bindParam(':resumen', $this->resumen);
        $stmt->bindParam(':texto', $this->texto);
        $stmt->bindParam(':fechaCreacion', $this->fechaCreacion);
        $stmt->bindParam(':articuloID', $this->articuloID);
        $stmt->bindParam(':usuarioID', $this->usuarioID);
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

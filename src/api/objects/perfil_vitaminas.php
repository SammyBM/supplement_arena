<?php
class PerfilVitaminas
{
    private $connection;
    private $table_nombre = "vitaminasxarticulo";

    public $vitaminas = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " ORDER BY articuloID, vitaminaID";
        echo $query;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->vitaminas); $x++) {
            if ($this->createRow($this->vitaminas[$x]->articuloID, $this->vitaminas[$x]->vitaminaID, $this->vitaminas[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $vitaminaID, $cantidad)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, vitaminaID=:vitaminaID, cantidad=:cantidad";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $vitaminaID = htmlspecialchars(strip_tags($vitaminaID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('vitaminaID', $vitaminaID);
        $stmt->bindParam('cantidad', $cantidad);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readByArticulo($articulo)
    {
        $query = "SELECT v.nombre, pv.cantidad FROM " . $this->table_nombre . " AS pv
        INNER JOIN vitaminas as v ON pv.vitaminaID = v.vitaminaID
        WHERE pv.articuloID = :articuloID ORDER BY pv.vitaminaID";

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function update()
    {
        for ($x = 0; $x < count($this->vitaminas); $x++) {
            if ($this->updateRow($this->vitaminas[$x]->articuloID, $this->vitaminas[$x]->vitaminaID, $this->vitaminas[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    function updateRow($vitaminaID, $articuloID, $cantidad)
    {
        $query = "UPDATE" . $this->table_nombre . "SET cantidad=:cantidad WHERE articuloID=:articuloID AND vitaminaID=:vitaminaID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $vitaminaID = htmlspecialchars(strip_tags($vitaminaID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':vitaminaID', $vitaminaID);
        $stmt->bindParam(':cantidad', $cantidad);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete()
    {
        $query = "DELETE FROM " . $this->table_nombre . " WHERE articuloID = ?";
        $stmt = $this->connection->prepare($query);

        $id = htmlspecialchars(strip_tags($this->vitaminas[0]->vitaminasID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        echo json_encode($stmt);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

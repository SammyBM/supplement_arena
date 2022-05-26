<?php
class PerfilOmegas
{
    private $connection;
    private $table_nombre = "omegasxarticulo";

    public $omegas = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " GROUP BY articuloID ORDER BY omegaID ASC";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->omegas); $x++) {
            if ($this->createRow($this->omegas[$x]->articuloID, $this->omegas[$x]->omegaID, $this->omegas[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $omegaID, $cantidad)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, omegaID=:omegaID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $omegaID = htmlspecialchars(strip_tags($omegaID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('omegaID', $omegaID);
        $stmt->bindParam('cantidad', $cantidad);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    function readByArticulo($articulo)
    {
        $query = "SELECT o.nombre FROM " . $this->table_nombre . " AS po
        LEFT JOIN omegas as o ON po.omegaID = o.omegaID
        WHERE po.articuloID = :articuloID";


        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function deleteRow($omegaID)
    {
        $query = "DELETE FROM " . $this->table_nombre . " WHERE articuloID=:articuloID AND omegaID=:omegaID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($this->omegas[0]->articuloID));
        $omegaID = htmlspecialchars(strip_tags($omegaID));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':omegaID', $omegaID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete($articuloID)
    {
        $query = "DELETE FROM " . $this->table_nombre . " WHERE articuloID = ?";
        $stmt = $this->connection->prepare($query);

        $id = htmlspecialchars(strip_tags($articuloID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        echo json_encode($stmt);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

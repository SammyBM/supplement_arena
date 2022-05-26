<?php
class PerfilAminos
{
    private $connection;
    private $table_nombre = "perfil_aminoacidos";

    public $aminos = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " ORDER BY articuloID, aminoID";
        echo $query;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->aminos); $x++) {
            if ($this->createRow($this->aminos[$x]->articuloID, $this->aminos[$x]->aminoID, $this->aminos[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $aminoID, $cantidad)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, aminoID=:aminoID, cantidad=:cantidad";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $aminoID = htmlspecialchars(strip_tags($aminoID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('aminoID', $aminoID);
        $stmt->bindParam('cantidad', $cantidad);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readByArticulo($articulo)
    {
        $query = "SELECT a.nombre, pa.cantidad FROM " . $this->table_nombre . " AS pa
        INNER JOIN aminoacidos as a
        WHERE pa.articuloID = :articuloID ORDER BY pa.aminoID";

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function update()
    {
        for ($x = 0; $x < count($this->aminos); $x++) {
            if ($this->updateRow($this->aminos[$x]->articuloID, $this->aminos[$x]->aminoID, $this->aminos[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    function updateRow($aminoID, $articuloID, $cantidad)
    {
        $query = "UPDATE" . $this->table_nombre . "SET cantidad=:cantidad WHERE articuloID=:articuloID AND aminoID=:aminoID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $aminoID = htmlspecialchars(strip_tags($aminoID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':aminoID', $aminoID);
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

        $id = htmlspecialchars(strip_tags($this->aminos[0]->aminosID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        echo json_encode($stmt);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

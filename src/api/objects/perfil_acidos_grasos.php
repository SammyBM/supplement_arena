<?php
class PerfilAG
{
    private $connection;
    private $table_nombre = "perfil_acidos_grasos";

    public $acidosGrasos = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " GROUP BY articuloID ORDER BY acidoGrasoID ASC";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->acidosGrasos); $x++) {
            if ($this->createRow($this->acidosGrasos[$x]->articuloID, $this->acidosGrasos[$x]->acidoGrasoID, $this->acidosGrasos[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $acidoGrasoID, $cantidad)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, acidoGrasoID=:acidoGrasoID, cantidad=:cantidad";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $acidoGrasoID = htmlspecialchars(strip_tags($acidoGrasoID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('acidoGrasoID', $acidoGrasoID);
        $stmt->bindParam('cantidad', $cantidad);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readByArticulo($articulo)
    {
        $query = "SELECT a.nombre, pa.cantidad FROM " . $this->table_nombre . " AS pa
        LEFT JOIN acidos_grasos as a ON pa.acidoGrasoID = a.acidoGrasoID
        WHERE pa.articuloID = :articuloID";


        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function update()
    {
        for ($x = 0; $x < count($this->acidosGrasos); $x++) {
            if ($this->updateRow($this->acidosGrasos[$x]->articuloID, $this->acidosGrasos[$x]->acidoGrasoID, $this->acidosGrasos[$x]->cantidad))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    function updateRow($acidoGrasoID, $articuloID, $cantidad)
    {
        $query = "UPDATE" . $this->table_nombre . "SET cantidad=:cantidad WHERE articuloID=:articuloID AND acidoGrasoID=:acidoGrasoID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $acidoGrasoID = htmlspecialchars(strip_tags($acidoGrasoID));
        $cantidad = htmlspecialchars(strip_tags($cantidad));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':acidoGrasoID', $acidoGrasoID);
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

        $id = htmlspecialchars(strip_tags($this->acidosGrasos[0]->acidosGrasosID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

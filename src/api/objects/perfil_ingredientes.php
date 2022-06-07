<?php
class PerfilIngredientes
{
    private $connection;
    private $table_nombre = "ingredientesxarticulo";

    public $ingredientes = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " AS ip INNER JOIN ingredientes AS i ON  ip.ingredienteID = i.ingredienteID
        ORDER BY articuloID, ip.ingredienteID";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->ingredientes); $x++) {
            if ($this->createRow($this->ingredientes[$x]->articuloID, $this->ingredientes[$x]->ingredienteID, $this->ingredientes[$x]->alergeno))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $ingredienteID, $alergeno)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, ingredienteID=:ingredienteID, alergeno=:alergeno";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $ingredienteID = htmlspecialchars(strip_tags($ingredienteID));
        $alergeno = htmlspecialchars(strip_tags($alergeno));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('ingredienteID', $ingredienteID);
        $stmt->bindParam('alergeno', $alergeno);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readByArticulo($articulo)
    {
        $query = "SELECT a.nombre, a.alergeno, ip.ingActivo FROM " . $this->table_nombre . " AS ip
        INNER JOIN ingredientes as a ON ip.ingredienteID = a.ingredienteID
        WHERE ip.articuloID = :articuloID ORDER BY ip.ingredienteID"; 

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function update()
    {
        for ($x = 0; $x < count($this->ingredientes); $x++) {
            if ($this->updateRow($this->ingredientes[$x]->articuloID, $this->ingredientes[$x]->ingredienteID, $this->ingredientes[$x]->alergeno))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    function updateRow($ingredienteID, $articuloID, $alergeno)
    {
        $query = "UPDATE" . $this->table_nombre . "SET alergeno=:alergeno WHERE articuloID=:articuloID AND ingredienteID=:ingredienteID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $ingredienteID = htmlspecialchars(strip_tags($ingredienteID));
        $alergeno = htmlspecialchars(strip_tags($alergeno));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':ingredienteID', $ingredienteID);
        $stmt->bindParam(':alergeno', $alergeno);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete()
    {
        $query = "DELETE FROM " . $this->table_nombre . " WHERE articuloID = ?";
        $stmt = $this->connection->prepare($query);

        $id = htmlspecialchars(strip_tags($this->ingredientes[0]->ingredientesID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        echo json_encode($stmt);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

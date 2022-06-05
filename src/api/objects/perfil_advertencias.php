<?php
class PerfilAdvertencias
{
    private $connection;
    private $table_nombre = "advertenciasxarticulo";

    public $advertencias = array();

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre . " ORDER BY articuloID, advertenciaID";
        echo $query;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function create()
    {
        for ($x = 0; $x < count($this->advertencias); $x++) {
            if ($this->createRow($this->advertencias[$x]->articuloID, $this->advertencias[$x]->advertenciaID, $this->advertencias[$x]->resumen))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    public function createRow($articuloID, $advertenciaID, $resumen)
    {
        $query = "INSERT INTO " . $this->table_nombre . " SET articuloID=:articuloID, advertenciaID=:advertenciaID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $advertenciaID = htmlspecialchars(strip_tags($advertenciaID));

        $stmt->bindParam('articuloID', $articuloID);
        $stmt->bindParam('advertenciaID', $advertenciaID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function readByArticulo($articulo)
    {
        $query = "SELECT a.resumen, a.texto FROM " . $this->table_nombre . " AS pa
        INNER JOIN advertencias as a ON pa.advertenciaID = a.advertenciaID
        WHERE pa.articuloID = :articuloID";

        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':articuloID', $articulo, PDO::PARAM_INT);

        $stmt->execute();


        return $stmt;
    }

    function update()
    {
        for ($x = 0; $x < count($this->advertencias); $x++) {
            if ($this->updateRow($this->advertencias[$x]->articuloID, $this->advertencias[$x]->advertenciaID, $this->advertencias[$x]->resumen, $this->advertencias[$x]->texto))
                continue;
            else {
                return false;
            }
        }

        return true;
    }

    function updateRow($advertenciaID, $articuloID, $resumen, $texto)
    {
        $query = "UPDATE" . $this->table_nombre . "SET resumen=:resumen, texto=:texto WHERE articuloID=:articuloID AND advertenciaID=:advertenciaID";

        $stmt = $this->connection->prepare($query);

        $articuloID = htmlspecialchars(strip_tags($articuloID));
        $advertenciaID = htmlspecialchars(strip_tags($advertenciaID));
        $resumen = htmlspecialchars(strip_tags($resumen));
        $texto = htmlspecialchars(strip_tags($texto));

        $stmt->bindParam(':articuloID', $articuloID);
        $stmt->bindParam(':advertenciaID', $advertenciaID);
        $stmt->bindParam(':resumen', $resumen);
        $stmt->bindParam(':texto', $texto);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete()
    {
        $query = "DELETE FROM " . $this->table_nombre . " WHERE articuloID = ?";
        $stmt = $this->connection->prepare($query);

        $id = htmlspecialchars(strip_tags($this->advertencias[0]->advertenciasID));


        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        echo json_encode($stmt);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

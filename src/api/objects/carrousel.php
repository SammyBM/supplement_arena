<?php

include_once "../utils/file.php";

class Carrousel
{

    private $connection;
    private $table_nombre = "fotos_carrusel";
    private $fileController = new FileController("uploads/carrusel", false);

    public  $id;
    public  $nombre_foto;


    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function create()
    {
        $isFileUpload = $this->fileController->postFile();

        if ($isFileUpload !== false) {

            $query = "INSERT INTO " . $this->table_nombre . " nombre_foto = ?";

            $stmt = $this->connection->prepare($query);

            $this->titulo = htmlspecialchars(strip_tags($this->nombre_foto));
            $stmt->bindParam(-1, json_decode($isFileUpload)["Success:"]);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        } else {
            echo $isFileUpload;
        }
    }

    public function read()
    {
        $query = "SELECT * FROM " . $this->table_nombre;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function read_row()
    {
        $query = "SELECT nombre_foto FROM " . $this->table_nombre . " WHERE fotoID = ? LIMIT 1";
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['fotoID'];
        $this->nombre_foto = $row['nombre_foto'];
    }

    public function delete()
    {
        $this->read_row();

        if ($this->fileController->deleteFile($this->nombre_foto)) {

            $query = "DELETE FROM " . $this->table_nombre . " WHERE fotoID = ?";
            $stmt = $this->connection->prepare($query);

            $this->id = htmlspecialchars(strip_tags($this->id));


            $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true;
            }
            return false;
        }
    }
}

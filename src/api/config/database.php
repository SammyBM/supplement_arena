<?php

// REST API tutorial
// https://codeofaninja.com/create-simple-rest-api-in-php/

class Database
{

    private $host = 'localhost';
    private $db_name = 'supplement_arena';
    private $username = 'root';
    private $password = '';
    public $connection;

    public function getConnection()
    {
        $this->connection = null;

        try {
            $this->connection = new PDO("mysql:host=" . $this->host . "; dbname=" . $this->db_name . ";charset=utf8", $this->username, $this->password);
            $this->connection->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->connection;
    }
}

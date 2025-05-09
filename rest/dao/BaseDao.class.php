
<?php

require_once __DIR__ . "/../Config.class.php";

class BaseDao {
    protected $connection;
    private $table;

    public function __construct($table) {
        $this->table = $table;
        try {
            $db_info = array(
                'host' => Config::DB_HOST(),
                'port' => Config::DB_PORT(),
                'name' => Config::DB_SCHEMA(),
                'user' => Config::DB_USERNAME(),
                'pass' => Config::DB_PASSWORD()
                );
      
                $options = array(
                  PDO::MYSQL_ATTR_SSL_CA => 'https://drive.google.com/file/d/1Kd6gF0QbgjGkWS36anKuSEjZbO7CPs1j/view?usp=drive_link',
                  PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
        
                );
      
              $this->table = $table;
      
              $this->connection = new PDO( 'mysql:host=' . $db_info['host'] . ';port=' . $db_info['port'] . ';dbname=' . $db_info['name'], $db_info['user'], $db_info['pass'], $options );
              
              $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e){
            throw $e;
        }
    }

    function query($query, $params) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function get_all() {
        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getById($id) {
        $stmt = $this->connection->prepare("SELECT * FROM ".$this->table." WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return reset($result);
    }

    public function add($entity) {
        $query = "INSERT INTO " . $this->table . " (" ;
        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity); // sql injection prevention
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    public function delete($id) {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
        $stmt->bindParam(':id', $id); // SQL injection prevention
        $stmt->execute();
    }

    public function update($id, $entity, $id_column = "id") {
        $query = "UPDATE " . $this->table . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "= :" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE $id_column = :id";

        $stmt = $this->connection->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
    }

    protected function query_unique($query, $params) {
        $results = $this->query($query, $params);
        return reset($results);
    }

}

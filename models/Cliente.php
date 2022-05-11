<?php 

class cliente {

  public $id;
  public $nome;
  public $telefone;
  public $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function insert($data) {

    $sql = "INSERT INTO cliente (nome, telefone) VALUES(:nome, :telefone)";

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":nome", $data['nome']);
    $stmt->bindParam(":telefone", $data['telefone']);
    $stmt->execute();
  }

  public function getAll() {

    $sql = "SELECT * FROM cliente ORDER BY id DESC";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $clienteData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $clienteData;
  }

  public function search($data) {

    $sql = "SELECT * FROM cliente WHERE 1 = 1";

    if(!empty($data['id'])) {
      $sql = $sql . " AND id = :id";
    }
    
    if(!empty($data['nome'])) {
      
      $nome = $data['nome'];
      $sql = $sql . " AND nome LIKE '%$nome%'";

    }

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    $clienteData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $clienteData;

  }

  public function delete($data) {

    $sql = "DELETE FROM cliente WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

  }
}
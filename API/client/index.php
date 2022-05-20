<?php
$con = new PDO("mysql:host=localhost;dbname=kylogramer", "root", "");

if(isset($_POST) && !empty($_POST)) {
  
  $stmt = $con->prepare("INSERT INTO cliente (nome, telefone) VALUES(:name, :phone)");
  $stmt->bindParam(":name", $_POST['client-name']);
  $stmt->bindParam(":phone", $_POST['client-phone']);
  $stmt->execute();
  $stmt = $con->prepare("SELECT * FROM cliente ORDER BY id DESC");
  $result = $stmt->execute();
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  exit;

}

if(isset($_GET) && empty($_GET)) {
  
  $stmt = $con->prepare("SELECT * FROM cliente ORDER BY id DESC");
  $result = $stmt->execute();
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  exit;
  
}
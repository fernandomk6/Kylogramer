<?php

if(isset($_POST) && !empty($_POST)) {
  
  $con = new PDO("mysql:host=localhost;dbname=kylogramer", "root", "");
  
  $stmt = $con->prepare("INSERT INTO cliente (nome, telefone) VALUES(:name, :phone)");
  $stmt->bindParam(":name", $_POST['client-name']);
  $stmt->bindParam(":phone", $_POST['client-phone']);
  $stmt->execute();

  $stmt = $con->prepare("SELECT * FROM cliente");
  $result = $stmt->execute();

  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

}
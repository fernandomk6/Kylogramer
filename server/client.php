<?php
$username = "root";
$password = "";

$conn = new PDO('mysql:host=localhost;dbname=kylogramer', $username, $password);

if (isset($_POST) && !empty($_POST)) {
  if ($_POST['type'] == "insert") {

    $sql = "INSERT INTO `client`(`name`, `phone`) VALUES (:name, :phone)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $_POST['name']);
    $stmt->bindParam(':phone', $_POST['phone']);
    $stmt->execute();
    exit();
  }
}
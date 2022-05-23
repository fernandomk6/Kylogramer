<?php
$host = "localhost";
$dbname = "kylogramer";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

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

if (isset($_GET) && !empty($_GET)) {
  if ($_GET['type'] == "selectAll") {
    $sql = "SELECT * FROM client WHERE deleted = 0 ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit();
  }
}
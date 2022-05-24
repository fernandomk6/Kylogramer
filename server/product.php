<?php
require_once("./conn.php");

if (isset($_POST) && !empty($_POST)) {
  if ($_POST['type'] == "insert") {

    if ($_POST['id'] == "0") {

      $sql = "INSERT INTO `product`(`name`, `price`) VALUES (:name, :price)";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $_POST['name']);
      $stmt->bindParam(':price', $_POST['price']);
      $stmt->execute();
      exit();

    } else {

      $sql = "UPDATE `product` SET `name` = :name, `price` = :price WHERE id = :id";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $_POST['name']);
      $stmt->bindParam(':price', $_POST['price']);
      $stmt->bindParam(':id', $_POST['id']);
      $stmt->execute();
      exit();

    }
  }

  if ($_POST['type'] == "delete") {

    $sql = "UPDATE `product` SET `deleted` = 1 WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_POST['id']);
    $stmt->execute();
    exit();

  }
}

if (isset($_GET) && !empty($_GET)) {

  if ($_GET['type'] == "selectAll") {

    $sql = "SELECT * FROM product WHERE deleted = 0 ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit();

  }

  if ($_GET['type'] == "selectById") {

    $sql = "SELECT * FROM product WHERE deleted = 0 AND id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_GET['id']);
    $stmt->execute();
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    exit();
    
  }

  if ($_GET['type'] == "search") {
    
    $name = "%".$_GET['name']."%";
    $price = "%".$_GET['price']."%";

    if (!empty($_GET['id'])) {

      $sql = "SELECT *
              FROM `product`
              WHERE deleted = 0
              AND name LIKE :name
              AND price LIKE :price
              AND id = :id";

      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':id', $_GET['id']);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':price', $price);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
      exit();

    } else {

      $sql = "SELECT *
              FROM `product`
              WHERE deleted = 0
              AND name LIKE :name
              AND price LIKE :price";

      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':price', $price);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
      exit();
    }

  }
}
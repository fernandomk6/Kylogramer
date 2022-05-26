<?php

require_once("./conn.php");

if (isset($_POST) && !empty($_POST)) {
  if ($_POST['type'] == "insert") {

    if ($_POST['id'] == "0") {

      $sql = "INSERT INTO `client`(`name`, `phone`) VALUES (:name, :phone)";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $_POST['name']);
      $stmt->bindParam(':phone', $_POST['phone']);
      $stmt->execute();
      exit();

    } else {

      $sql = "UPDATE `client` SET `name` = :name, `phone` = :phone WHERE id = :id";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $_POST['name']);
      $stmt->bindParam(':phone', $_POST['phone']);
      $stmt->bindParam(':id', $_POST['id']);
      $stmt->execute();
      exit();

    }
  }

  if ($_POST['type'] == "delete") {

    $sql = "UPDATE `sale` SET `deleted` = 1 WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_POST['id']);
    $stmt->execute();
    exit();

  }
}

if (isset($_GET) && !empty($_GET)) {

  if ($_GET['type'] == "selectAll") {

    $sql = "SELECT * FROM sale WHERE deleted = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT 
              sale.id AS 'sale__id', 
              client.name AS 'sale__client_name',
              client.id AS 'sale__client_id',
              sale.date AS 'sale__date',
              sale.total AS 'sale__total',
              product.name AS 'product__name',
              product.id AS 'product__id',
              sale_product.kilogram AS 'product__kiloram',
              sale_product.unitary AS 'product__unitary'
            FROM 
              sale, sale_product, product, client
            WHERE 
              sale.id = sale_product.sale_id
            AND 
              sale_product.product_id = product.id
            AND
              sale.client_id = client.id
            AND
              sale.deleted = 0";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT 
              sale.id AS 'sale__id',
              client.name AS 'sale__client_name', 
              client.id AS 'sale__client_id',
              sale.date AS 'sale__date', 
              sale.total AS 'sale__total', 
              payment.name AS 'payment__name',
              payment.id AS 'payment__id', 
              sale_payment.total AS 'payment__total' 
            FROM 
              sale, sale_payment, payment, client 
            WHERE 
              sale.id = sale_payment.sale_id 
            AND 
              sale_payment.payment_id = payment.id 
            AND 
              sale.client_id = client.id 
            AND 
              sale.deleted = 0";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);


    $allSales= []; // array contendo arrys de cada venda

    // iterando cada id de venda $value
    foreach ($sales as $id => $value) {
      // array modelo de saida
      $atualSale = [
        "id",
        "date",
        "client_id",
        "client_name",
        "total",
        "products" => [
          "id",
          "name",
          "kiloram",
          "unitary",
          "total"
        ],
        "payment" => [
          "id",
          "name",
          "total"
        ],
      ];
       
      // montar array modelo com os dados do banco


      // adicionar array atual no allSales
      $allSales[] = $actualSale;
    }

    echo json_encode($allSales);
    exit();
  }

  if ($_GET['type'] == "selectById") {

    $sql = "SELECT 
              sale.id AS 'sale__id', 
              client.name AS 'sale__client_name',
              client.id AS 'sale__client_id',
              sale.date AS 'sale__date',
              sale.total AS 'sale__total',
              product.name AS 'product__name',
              product.id AS 'product__id',
              sale_product.kilogram AS 'product__kiloram',
              sale_product.unitary AS 'product__unitary'
            FROM 
              sale, sale_product, product, client
            WHERE 
              sale.id = sale_product.sale_id
            AND 
              sale_product.product_id = product.id
            AND
              sale.id = :id
            AND
              sale.client_id = client.id
            AND
              sale.deleted = 0";
  
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_GET['id']);
    $stmt->execute();
    $products = $stmt->fetch(PDO::FETCH_ASSOC);

    $sql = "SELECT 
              sale.id AS 'sale__id', 
              client.name AS 'sale__client name',
              client.id AS 'sale__client_id',
              sale.date AS 'sale__date',
              sale.total AS 'sale__total',
              payment.name AS 'payment__name',
              payment.id AS 'payment__id',
              sale_payment.total AS 'payment__total'
            FROM 
              sale, sale_payment, payment, client
            WHERE 
              sale.id = sale_payment.sale_id
            AND 
              sale_payment.payment_id = payment.id
            AND
              sale.id = :id
            AND
              sale.client_id = client.id
            AND
              sale.deleted = 0";
  
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_GET['id']);
    $stmt->execute();
    $payments = $stmt->fetch(PDO::FETCH_ASSOC);

    

    echo json_encode(["products" => $products, "payments" => $payments]);
    exit();
    
  }

  if ($_GET['type'] == "search") {
    
    $name = "%".$_GET['name']."%";
    $phone = "%".$_GET['phone']."%";

    if (!empty($_GET['id'])) {

      $sql = "SELECT *
              FROM `client`
              WHERE deleted = 0
              AND name LIKE :name
              AND phone LIKE :phone
              AND id = :id
              ORDER BY id DESC";

      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':id', $_GET['id']);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':phone', $phone);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
      exit();

    } else {

      $sql = "SELECT *
              FROM `client`
              WHERE deleted = 0
              AND name LIKE :name
              AND phone LIKE :phone
              ORDER BY id DESC";

      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':phone', $phone);
      $stmt->execute();
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
      exit();
    }

  }
}
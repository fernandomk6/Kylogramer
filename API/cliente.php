<?php

require_once("../models/Cliente.php");
require_once("../models/Connection.php");

$cliente = new Cliente(Connection::conn());

if($_POST['operation'] == "insert-cliente"){

  $cliente->insert($_POST);
  
  echo json_encode($cliente->getAll());

}

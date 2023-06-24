<?php
    include "connection.php";
    include "cors.php";
    
    $id = $_GET["id"];

    $sql = $connection->prepare("select * from cities where id = ?;");
    $sql->bind_param("i", $id); 
    $sql->execute();
    $result = $sql->get_result();
    
    $sql->close(); 
    echo json_encode($result->fetch_assoc());
?>
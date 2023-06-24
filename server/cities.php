<?php
    include "connection.php";
    include "cors.php";
    
    $sql = $connection->prepare("select * from cities;"); 
    $sql->execute();
    $result = $sql->get_result();
    
    $jsonResult = array();
    while ($row = $result->fetch_assoc()) {
        $jsonResult[] = $row;
    }
    $sql->close(); 
    echo json_encode($jsonResult);
?>
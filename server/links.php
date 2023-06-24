<?php
    function cmp($x, $y) {
        $val1 = $x["duration"] * 0.6 + $x["distance"] * 0.4;
        $val2 = $y["duration"] * 0.6 + $y["distance"] * 0.4;
        if ($val1 == $val2) {
            return 0;
        }
        return ($val1 < $val2) ? -1 : 1;
    }

    include "connection.php";
    include "cors.php";

    $cityId = $_GET["id"];
    
    $sql = $connection->prepare("select * from links where cityId1 = ?;"); 
    $sql->bind_param("i", $cityId);
    $sql->execute();
    $result = $sql->get_result();
    
    $jsonResult = array();
    while ($row = $result->fetch_assoc()) {
        $jsonResult[] = $row;
    }
    $sql->close(); 
    usort($jsonResult, 'cmp');
    echo json_encode($jsonResult);
?>
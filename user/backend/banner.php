<?php
require './include/db.php';
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $stmt = "select * from banner WHERE status = 1";
    if ($result = $conn->query($stmt)) {
        $arr = array();
        while ($rowArray = $result->fetch_assoc()) {
            array_push($arr, $rowArray);
        }

        echo json_encode(['banners' => $arr]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    exit();
}

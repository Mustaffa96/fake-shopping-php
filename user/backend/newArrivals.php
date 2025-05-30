<?php

// 
// New Arrivals API Endpoint
// 
// This endpoint retrieves the 3 most recently added active products from the database.
// Used to display new arrivals section on the frontend.
// 
// Method: GET
// Response: JSON
//   - Success: {newArrivals: Array<Product>}
//   - Error: {error: string}
//   

require './include/db.php';
// header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $stmt = "select * from product WHERE status = 1 order by added_on desc limit 3";
    if ($result = $conn->query($stmt)) {
        $arr = array();
        while ($rowArray = $result->fetch_assoc()) {
            array_push($arr, $rowArray);
        }

        echo json_encode(['newArrivals' => $arr]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    exit();
}

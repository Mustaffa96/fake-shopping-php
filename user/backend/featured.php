<?php

// Featured Products API Endpoint

// This endpoint retrieves 3 random active products from the database
// to be displayed as featured items on the frontend.

// Method: GET
// Response Format: JSON
// - Success: {featured: Array<Product>}
// - Error: {error: string}

require './include/db.php';
// header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $stmt = "select * from product WHERE status = 1 order by rand() limit 3";
    if ($result = $conn->query($stmt)) {
        $arr = array();
        while ($rowArray = $result->fetch_assoc()) {
            array_push($arr, $rowArray);
        }

        echo json_encode(['featured' => $arr]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    exit();
}

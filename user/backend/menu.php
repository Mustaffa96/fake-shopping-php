<?php

//  
// Menu Categories API Endpoint
// 
// This endpoint retrieves all active categories from the database.
// Method: GET
// Response Format: JSON
// Success Response: {categories: string[]} - Array of category names
// Error Response: {error: string} - Error message if request fails
//   

error_reporting(0);

try {
    require './include/db.php';
    // header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json'); 

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $stmt = "select name from category where status = 1";
        if ($result = $conn->query($stmt)) {
            $arr = array();
            while ($row = $result->fetch_assoc()) {
                if (isset($row['name'])) {
                    array_push($arr, $row['name']);
                }
            }
            echo json_encode(['categories' => $arr]);
        } else {
            echo json_encode(['error' => 'Database query failed']);
        }
    } else {
        echo json_encode(['error' => 'Invalid request method']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
exit();

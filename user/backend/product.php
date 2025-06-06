

<?php

// 
// Product API Endpoint
// 
// This file handles product-related API requests:
// 1. Category-based product filtering: GET /?category={category_name}
//    Returns all active products in the specified category
// 
// 2. Product search: GET /?search={search_term}
//    Returns all active products where name matches the search term
// 
// All responses are in JSON format with either:
// - Success: {"products": [...]}
// - Error: {"error": "message"}
//  

require './include/db.php';
// header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['category'])) {
    $stmt = "select * from product WHERE status = 1 and category_id = ( select id from category where name = ?)";
    $prep_stmt = $conn->prepare($stmt);
    $category = $_GET['category'];
    $prep_stmt->bind_param('s', $category);
    $prep_stmt->execute();
    if ($result = $prep_stmt->get_result()) {
        $arr = array();
        while ($rowArray = $result->fetch_assoc()) {
            array_push($arr, $rowArray);
        }

        echo json_encode(['products' => $arr]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    $prep_stmt->close();
    exit();
}

// Handle search query
if ($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['search'])) {
    $stmt = "SELECT * FROM product WHERE status = 1 AND name LIKE ?";
    $prep_stmt = $conn->prepare($stmt);
    $search_term = "%" . $_GET['search'] . "%";
    $prep_stmt->bind_param('s', $search_term);
    $prep_stmt->execute();
    if ($result = $prep_stmt->get_result()) {
        $arr = array();
        while ($rowArray = $result->fetch_assoc()) {
            array_push($arr, $rowArray);
        }
        echo json_encode(['products' => $arr]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    $prep_stmt->close();
    exit();
}
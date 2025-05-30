<?php

// Inventory Stock Management API

// This file handles inventory stock level queries for products in the fake-shopping system.
// It provides an endpoint to retrieve the current stock level for a specific product by its ID.

// Endpoint: GET /?id={product_id}
// Response: JSON containing either the stock level or an error message

// @return JSON { "stock": number } | { "error": string }


require './include/db.php';
// header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['id'])) {
    $stmt = "select stock from inventory WHERE product_id = ?";
    $prep_stmt = $conn->prepare($stmt);
    $id = $_GET['id'];
    $prep_stmt->bind_param('i', $id);
    $prep_stmt->execute();
    if ($result = $prep_stmt->get_result()) {
        // $arr = array();
        // while ($rowArray = $result->fetch_assoc()) {
            // array_push($arr, $result->fetch_assoc());
        // }

        echo json_encode(['stock' => $result->fetch_assoc()['stock']]);
    } else {
        echo json_encode(['error' => 'Something went wrong.']);
    }
    $prep_stmt->close();
    exit();
}

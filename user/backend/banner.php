 <?php

// Banner API Endpoint
  
// This file handles the retrieval of active banner information from the database.
// It provides a GET endpoint that returns all active banners (status = 1) in JSON format.

//   Response format:
// Success: { "banners": [...array of banner objects] }
// Error: { "error": "error message" } 


require './include/db.php';
// header('Access-Control-Allow-Origin: *');

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

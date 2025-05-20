<?php
require './include/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = 'describe user;';
    $result = $conn->query($stmt);
    $arr = array();
    while ($row = $result->fetch_assoc())
        array_push($arr, $row);
    array_splice($arr, 0, 1);
    echo json_encode(['columns' => $arr]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $stmt = 'insert into user (username, password, email, first_name, last_name) values (?, ?, ?, ?, ?);';
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param('sssss', $username, $password, $email, $first_name, $last_name);
    try {
        if ($prep_stmt->execute()) {
            echo json_encode(['registration' => true]);
        } else {
            echo json_encode(['error' => 'Registration failed! Try again later.']);
        }
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) { // Duplicate entry error code
            echo json_encode(['error' => 'Username already exists. Please choose a different username.']);
        } else {
            echo json_encode(['error' => 'Registration failed! Try again later.']);
        }
    }
    $prep_stmt->close();
    exit();
}

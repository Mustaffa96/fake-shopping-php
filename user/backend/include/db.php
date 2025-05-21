<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Credentials: true');

session_start(['cookie_samesite' => 'None', 'cookie_secure' => true]);
// Load environment variables from .env file
$envFile = __DIR__ . '/../../../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}


$conn = new mysqli(
    $_ENV['DB_HOST'] ?? 'localhost:3306',
    $_ENV['DB_USER'] ?? 'root',
    $_ENV['DB_PASSWORD'] ?? '',
    $_ENV['DB_NAME'] ?? 'fakeshop'
);
if ($conn->connect_errno) {
    echo json_encode(['error' => $conn->connect_error]);
    exit();
}

<?php

// === CORS Headers ===
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === 'http://localhost:3000') {
    header("Access-Control-Allow-Origin: $origin"); // don't use '*'
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
}

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');
// === DB class ===
require_once '../dbconiction.php';
$db = new Dbconiction();
$dbcon = $db->start_db_conn();



function getRecipient($dbcon, $token) {
    $sql = 'SELECT 
                username, 
                phone_number, 
                COUNT(DISTINCT message_id) AS message_count
            FROM recepment 
            WHERE senderId = ?
            GROUP BY username, phone_number';
    
    $stmt = $dbcon->prepare($sql);
    if (!$stmt) {
        return json_encode([
            'success' => false,
            'message' => 'Failed to prepare connection'
        ]);
    }

    $stmt->bind_param('s', $token);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);

        return json_encode([
            'success' => true,
            'data' => $data
        ]);
    } else {
        return json_encode([
            'success' => false,
            'message' => 'Query execution failed'
        ]);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_COOKIE['token'];
    echo getRecipient($dbcon ,$token);
}
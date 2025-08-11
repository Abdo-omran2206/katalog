<?php

// === CORS Headers ===
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === 'http://localhost:3000') {
    header("Access-Control-Allow-Origin: $origin"); // don't use '*'
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET,POST,PUT, OPTIONS");
}

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');

// Import the database class
require_once '../dbconiction.php';  // Make sure this path is correct

// Instantiate the DB connection class
$db = new Dbconiction();
$dbcon = $db->start_db_conn();  // Save the result of the connection


function getMessageCode($dbcon, string $token){
    $sql = 'SELECT message_id FROM recepment WHERE recepment_code = ? AND sendin < CURRENT_DATE;';
    $stmt = $dbcon->prepare($sql);
    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $dbcon->error
        ]);
    }
    $stmt->bind_param('s', $token);

    if ($stmt->execute()) {
        $result = $stmt->get_result(); // get result set

        if ($result && $result->num_rows > 0) {
            $messageid = $result->fetch_assoc();
            return json_encode([
                "success" => true,
                "message" => $messageid
            ]);
        } else {
            return json_encode([
                "success" => false,
                "message" => "User not found"
            ]);
        }
    } else {
        return json_encode([
            "success" => false,
            "message" => "Query execution failed: " . $stmt->error
        ]);
    }
}
function getMessageContent($dbcon, string $token){
    $sql = 'SELECT message FROM messages WHERE messageId = ?';
    $stmt = $dbcon->prepare($sql);
    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $dbcon->error
        ]);
    }
    $stmt->bind_param('s', $token);

    if ($stmt->execute()) {
        $result = $stmt->get_result(); // get result set

        if ($result && $result->num_rows > 0) {
            $message = $result->fetch_assoc();
            unset($message['recipients']);
            return json_encode([
                "success" => true,
                "message" => $message
            ]);
        } else {
            return json_encode([
                "success" => false,
                "message" => "message not found"
            ]);
        }
    } else {
        return json_encode([
            "success" => false,
            "message" => "Query execution failed: " . $stmt->error
        ]);
    }
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reqdata = file_get_contents('php://input');
    $data = json_decode($reqdata, true);
    $messageId = json_decode(getMessageCode($dbcon, $data['message_code']), true);
    if($messageId['success']){
        $msc = getMessageContent($dbcon,$messageId['message']['message_id']);
        echo json_encode($msc);
    }else{
        echo json_encode([
            "success" => false,
            "message" => $messageId['message']
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'error' => 'Method not allowed'
    ]);
}

$dbcon->close();

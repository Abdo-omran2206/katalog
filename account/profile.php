<?php
// === CORS Headers ===
// Allow only trusted origins
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

// === Include the DB class ===
require_once '../dbconiction.php';

// === Initialize DB Connection ===
$db = new Dbconiction();
$dbcon = $db->start_db_conn();
// $db->createAccountsTable($dbcon);

function get_user_information($db , $token){
    $sql = 'SELECT username , gender , email FROM accounts WHERE random_code = ?';
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $db->error
        ]);
    }
    $stmt->bind_param('s',$token);
    
    if($stmt->execute()){
        $result = $stmt->get_result();

         if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();
            return json_encode([
                "success" => true,
                "user" => $user
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

function get_message_newst($db, $token){
    $sql = 'SELECT message FROM messages WHERE senderId = ?';
    $stmt = $db->prepare($sql);
    if(!$stmt){
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $db->error
        ]);
    }
    $stmt->bind_param('s',$token);
    if($stmt->execute()){
        $result = $stmt->get_result();

         if ($result && $result->num_rows > 0) {
            $messages = [];
            while($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }
            return json_encode([
                "success" => true,
                "messages" => $messages
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_COOKIE['token'])) {
        $cookie = $_COOKIE['token'];

        if (!$cookie) {
            echo json_encode([
                "success" => false,
                "message" => "Empty token"
            ]);
            return;
        }
        echo json_encode([
            "success" => true,
            "userinfo" => get_user_information($dbcon, $cookie),]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Token not found in cookies"
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
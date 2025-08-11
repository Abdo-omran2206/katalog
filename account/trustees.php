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
// === DB class ===
require_once '../dbconiction.php';
$db = new Dbconiction();
$dbcon = $db->start_db_conn();

function add_new_date(){

}

function lastCheck($dbcon,$token){
    $sql = 'SELECT lastcheck,`default` FROM trustees WHERE senderId = ?';
    $stmt = $dbcon->prepare($sql);
    if(!$stmt){
        return json_encode([
            'success' => false,
            'message0' => 'Faild to praper connection'
        ]);
    }
    $stmt->bind_param('s',$token);
    if($stmt->execute()){
        $result = $stmt->get_result();
        if ($result && $result->num_rows > 0){
            $date = $result->fetch_assoc();
            return json_encode([
                'success' => true,
                'message' => $date
            ]);
        }else{
            return json_encode([
                'success' => false,
                'message' => 'User not found'
            ]);
        }
    }else {
        return json_encode([
            "success" => false,
            "message" => "Query execution failed: " . $stmt->error
        ]);
    }
}

function updateDate($dbcon,$token,$def){
    $sql = 'SELECT lastcheck FROM trustees WHERE senderId = ?';
    $stmt = $dbcon->prepare($sql);
    if(!$stmt){
        return json_encode([
            'success' => false,
            'message' => 'Faild to praper connection'
        ]);
    }
    $stmt->bind_param('s',$token);
    if($stmt->execute()){
        $result = $stmt->get_result();
        if ($result && $result->num_rows > 0){
            $row = $result->fetch_assoc();
            $date = $row['lastcheck']; // e.g., "2024-11-05"

            $dt = new DateTime($date);
            $dt->modify("+{$def} months");

            $newSendin = $dt->format('Y-m-d'); // full date for DB

            $stmt2 = $dbcon->prepare('UPDATE trustees SET `default` = ?, sendin = ? WHERE senderId = ?');
            if (!$stmt2) {
                return json_encode([
                    'success' => false,
                    'message' => 'Failed to prepare statement: ' . $dbcon->error
                ]);
            }

            $stmt2->bind_param('iss', $def, $newSendin, $token);

            if ($stmt2->execute()) {
                return json_encode([
                    'title' => 'Trustee updated successfully',
                    'success' => true,
                    'message' => 'The New Date Is '. $newSendin
                ]);
            } else {
                return json_encode([
                    'success' => false,
                    'message' => 'Execution failed: ' . $stmt2->error
                ]);
            }
        }else{
            return json_encode([
                'success' => false,
                'message' => 'User not found'
            ]);
        }
    }else {
        return json_encode([
            "success" => false,
            "message" => "Query execution failed: " . $stmt->error
        ]);
    }
}


function updateLastcheck($dbcon,$token){
    $sql = 'SELECT lastcheck,`default`,sendin FROM trustees WHERE senderId = ?';
    $stmt = $dbcon->prepare($sql);
    if(!$stmt){
        return json_encode([
            'success' => false,
            'message0' => 'Faild to praper connection'
        ]);
    }
    $stmt->bind_param('s',$token);
    if($stmt->execute()){
        $result = $stmt->get_result();
        if ($result && $result->num_rows > 0){
            $data = $result->fetch_assoc();
            
            $newlastcheck = date('Y-m-d');
            $default = $data['default'];
            $sendin_date = new DateTime($newlastcheck);
            $sendin_date->modify("+{$default} months");
            $newSendin = $sendin_date->format('Y-m-d');

            $stmt2 = $dbcon->prepare('UPDATE trustees SET lastcheck = ?, sendin = ? WHERE senderId = ?');
            if (!$stmt2) {
                return json_encode([
                    'success' => false,
                    'message0' => 'Failed to prepare statement: ' . $dbcon->error
                ]);
            }

            $stmt2->bind_param('sss', $newlastcheck,$newSendin, $token);

            if ($stmt2->execute()) {
                return json_encode([
                    'title' => 'Trustee updated successfully',
                    'success' => true,
                    'message' => 'The New Date Is '. $newSendin,
                    'newDate' => $newlastcheck
                ]);
            } else {
                return json_encode([
                    'success' => false,
                    'message' => 'Execution failed: ' . $stmt2->error
                ]);
            }

        }else{
            return json_encode([
                'success' => false,
                'message' => 'User not found'
            ]);
        }
    }else {
        return json_encode([
            "success" => false,
            "message" => "Query execution failed: " . $stmt->error
        ]);
    }
}

$reqdata = file_get_contents('php://input');
$data = json_decode($reqdata, true);
$token = $_COOKIE['token'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_COOKIE['token'];
    echo updateLastcheck($dbcon,$token);
}elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $token = $_COOKIE['token'];
    echo updateDate($dbcon,$token,$data['updateDefault']);
}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $token = $_COOKIE['token'];
    echo lastCheck($dbcon,$token);
}
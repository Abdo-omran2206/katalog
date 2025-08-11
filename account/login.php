<?php
// CORS headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
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

function checkuser($db, $data) {
    $sql = 'SELECT username, gender, email, password_hashed, random_code FROM accounts WHERE email = ?';
    $stmt = $db->prepare($sql);

    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $db->error
        ]);
    }

    $stmt->bind_param('s', $data['email']);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result(); // get result set

        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify(trim($data['password']), $user['password_hashed'])) {
                return json_encode([
                    "success" => true,
                    "message" => "User found",
                    "code" => $user['random_code']
                ]);
            } else {
                return json_encode([
                    "success" => false,
                    "message" => "Password is incorrect"
                ]);
            }
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reqdata = file_get_contents('php://input');
    $data = json_decode($reqdata, true);

    if (!empty($data) && is_array($data)) {
        // Validate required fields
        $requiredFields = ['password', 'email'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "error" => "Missing required field: $field"
                ]);
                exit();
            }
        }

        $usercheker = checkuser($dbcon, $data);
        echo $usercheker;

        // Decode to access token
        $inserted_data = json_decode($usercheker, true);

        if ($inserted_data && $inserted_data['success'] === true) {
            setcookie('token', $inserted_data['code'], time() + (60 * 60 * 24 * 7), '/', '', true, true);
        }

    } else {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Invalid or empty JSON data"
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
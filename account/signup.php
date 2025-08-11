<?php
// === CORS Headers ===
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
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
$db->createAccountsTable($dbcon);
$db->createTrusteesTable($dbcon);
$db->createMessageTable($dbcon);
$db->createRecepmentTable($dbcon);



// === Utility: Generate Code ===
function generateRandomCode($length = 35) {
    return bin2hex(random_bytes($length / 2));
}

// === Insert User Function ===
function set_trustees_data($dbcon, $token) {
    $default_value = 3; // months

    // Last check is today
    $lastcheck = date('Y-m-d');

    // Calculate sendin = lastcheck + default_value months
    $sendin_date = new DateTime($lastcheck);
    $sendin_date->modify("+{$default_value} months");
    $sendin = $sendin_date->format('Y-m-d');

    $sql = "INSERT INTO trustees (senderId, lastcheck, sendin, `default`) VALUES (?, ?, ?, ?)";
    $stmt = $dbcon->prepare($sql);

    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $dbcon->error
        ]);
    }

    $stmt->bind_param('sssi', $token, $lastcheck, $sendin, $default_value);

    if ($stmt->execute()) {
        return json_encode([
            "success" => true,
            "message" => "Trustee inserted successfully"
        ]);
    } else {
        return json_encode([
            "success" => false,
            "message" => "Execution failed: " . $stmt->error
        ]);
    }
}



function data_insert_db($db, $data) {
    try{
        $sql = "INSERT INTO accounts (username, gender, password_hashed, email, random_code) 
            VALUES (?, ?, ?, ?, ?)";

        $stmt = $db->prepare($sql);

        if (!$stmt) {
            return json_encode([
                "success" => false,
                "message" => "SQL prepare failed: " . $db->error
            ]);
        }

        $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
        $random_code = generateRandomCode();

        $stmt->bind_param(
            'sssss',
            $data['name'],
            $data['gender'],
            $hashed_password,
            $data['email'],
            $random_code
        );

        if ($stmt->execute()) {
            $trustee_result = set_trustees_data($db, $random_code);
            $trustee_data = json_decode($trustee_result, true);
            
            if ($trustee_data['success'] === false) {
                // If trustee insertion fails, still return success for user creation
                // but include a warning about trustee creation
                return json_encode([
                    "success" => true,
                    "message" => "User added successfully, but trustee setup failed",
                    "warning" => $trustee_data['message'],
                    "data" => [
                        "random_code" => $random_code
                    ]
                ]);
            }
            
            return json_encode([
                "success" => true,
                "message" => "User added successfully",
                "data" => [
                    "random_code" => $random_code
                ]
            ]);
        } else {
            return json_encode([
                "success" => false,
                "message" => "User not added: " . $stmt->error
            ]);
        }
    }catch(Exception $e){
        return json_encode([
                "success" => false,
                "message" => "Account already exists by this email or database error occurred",
                "error_details" => $e->getMessage()
            ]);
    }
}

// === Handle POST Request ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reqdata = file_get_contents('php://input');
    $data = json_decode($reqdata, true);

    if (!empty($data) && is_array($data)) {
        // Validate required fields
        $requiredFields = ['name', 'gender', 'password', 'email'];
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
        $inserted_data_json = data_insert_db($dbcon, $data);
        echo $inserted_data_json;

        // Decode to access token
        $inserted_data = json_decode($inserted_data_json, true);
        if ($inserted_data && $inserted_data['success'] === true) {
            setcookie('token', $inserted_data['data']['random_code'], time() + (60 * 60 * 24 * 7), '/', '');
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

// === Close DB connection ===
$dbcon->close();

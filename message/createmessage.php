<?php
// === CORS Headers ===
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === 'http://localhost:3000') {
    header("Access-Control-Allow-Origin: $origin"); // don't use '*'
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
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

// $db->createMessageTable($dbcon);
// $db->createRecepmentTable($dbcon);
// $db->createTrusteesTable($dbcon);

// === Random Code Generator ===
function generateRandomCode($length = 35) {
    return bin2hex(random_bytes($length / 2));
}

// === local Uploader ===
function uploader() {
    $uploaded_files = [];

    if (!empty($_FILES['files'])) {
        if (is_array($_FILES['files']['name'])) {
            $fileCount = count($_FILES['files']['name']);

            for ($i = 0; $i < $fileCount; $i++) {
                $name = $_FILES['files']['name'][$i];
                $tmpName = $_FILES['files']['tmp_name'][$i];
                $error = $_FILES['files']['error'][$i];

                if ($error === UPLOAD_ERR_OK) {
                    $uploadPath = 'uploads/' . basename($name);
                    if (move_uploaded_file($tmpName, $uploadPath)) {
                        $uploaded_files[] = $uploadPath;
                    }
                }
            }
        } else {
            // Single file fallback
            $name = $_FILES['files']['name'];
            $tmpName = $_FILES['files']['tmp_name'];
            $error = $_FILES['files']['error'];

            if ($error === UPLOAD_ERR_OK) {
                $uploadPath = 'uploads/' . basename($name);
                if (move_uploaded_file($tmpName, $uploadPath)) {
                    $uploaded_files[] = $uploadPath;
                }
            }
        }
    }

    return $uploaded_files;
}

function uploaderToGofile($token, $folderId = null) {
    $uploaded_files = [];

    if (empty($_FILES['files'])) {
        return $uploaded_files;
    }

    $files = is_array($_FILES['files']['name'])
        ? $_FILES['files']
        : [
            'name'     => [$_FILES['files']['name']],
            'tmp_name' => [$_FILES['files']['tmp_name']],
            'error'    => [$_FILES['files']['error']],
        ];

    foreach ($files['name'] as $i => $name) {
        if ($files['error'][$i] !== UPLOAD_ERR_OK) {
            continue;
        }

        $tmpPath = $files['tmp_name'][$i];
        $postData = [
            'file' => new CURLFile($tmpPath, mime_content_type($tmpPath), $name)
        ];

        if ($folderId) {
            $postData['folderId'] = $folderId;
        }

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL            => 'https://upload.gofile.io/uploadfile',
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => [
                'Authorization: Bearer ' . $token
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS     => $postData,
        ]);

        $response = curl_exec($curl);
        curl_close($curl);

        if (!$response) {
            continue;
        }

        $respData = json_decode($response, true);
        if (!empty($respData['data']['downloadPage'])) {
            $uploaded_files[] = $respData['data']['downloadPage'];
        }
    }

    return $uploaded_files;
}



function getSendin($dbcon, $token) {
    $sql = 'SELECT sendin FROM trustees WHERE senderId = ?';
    $stmt = $dbcon->prepare($sql);
    if (!$stmt) {
        return json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $dbcon->error
        ]);
    }

    $stmt->bind_param('s', $token);
    
    if (!$stmt->execute()) {
        return json_encode([
            "success" => false,
            "message" => "SQL execute failed: " . $stmt->error
        ]);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    $stmt->close();

    if ($row) {
        return $row['sendin']; // just return the value
    } else {
        return null; // or false if no match found
    }
}


// === Handle POST Request ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? null;
    $messageText = $_POST['message'] ?? null;
    // Remove old single recipient lines
    // $recepment_name = $_POST['recepment_name'] ?? null;
    // $recepment_number = $_POST['recepment_number'] ?? null;
    $token = $_COOKIE['token'] ?? null;

    // Debug: Log what we received
    error_log("POST data: " . print_r($_POST, true));
    error_log("Token: " . $token);

    // Collect all recipients
    $recipients = [];
    foreach ($_POST as $key => $value) {
        if (preg_match('/^recepment_name_(\d+)$/', $key, $matches)) {
            $index = $matches[1];
            $name = $value;
            $numberKey = 'recepment_number_' . $index;
            if (isset($_POST[$numberKey])) {
                $recipients[] = [
                    'name' => $name,
                    'number' => $_POST[$numberKey]
                ];
            }
        }
    }

    error_log("Recipients found: " . count($recipients));
    error_log("Recipients: " . print_r($recipients, true));

    if (!$title || !$messageText || empty($recipients)) {
        echo json_encode([
            'success' => false, 
            'error' => 'Missing required fields',
            'debug' => [
                'title' => $title,
                'message' => $messageText,
                'recipients_count' => count($recipients)
            ]
        ]);
        exit;
    }

    // === Upload files to Gofile
    // $uploaded_files = uploader();
    $uploaded_files = uploaderToGofile("VrphQrUPvKTAVHxVFlUyd8ab9rhciXrl");

    // === Create JSON Message
    $messageJson = json_encode([
        'title' => $title,
        'body' => $messageText,
        'recipients' => $recipients,
        'files' => $uploaded_files,
        'submitted_at' => date('Y-m-d H:i:s')
    ]);

    $messageId = generateRandomCode(16);
    $recepment_code = generateRandomCode(10);
    $senderId = $token;
    $sendin = getSendin($dbcon , $token);
    // echo $messageJson ;
    // === Insert into `messages` table

    $stmt1 = $dbcon->prepare("INSERT INTO messages (message, messageId, senderId,sendin) VALUES (?, ?, ?,?)");
    $stmt1->bind_param("ssss", $messageJson, $messageId, $senderId,$sendin);

    $success = $stmt1->execute();
    $recepmentSuccess = true;
    if ($success) {
        // Insert each recipient
        $stmt2 = $dbcon->prepare("INSERT INTO recepment (username, phone_number, recepment_code, message_id,senderId,sendin) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($recipients as $recipient) {
            $stmt2->bind_param("ssssss", $recipient['name'], $recipient['number'], $recepment_code, $messageId, $senderId, $sendin);
            if (!$stmt2->execute()) {
                $recepmentSuccess = false;
                break;
            }
        }
        $stmt2->close();
    }

    if ($success && $recepmentSuccess) {
        echo json_encode([
            'success' => true,
            'message' => 'Message and recipients saved successfully.',
            'messageId' => $messageId,
            'files' => $uploaded_files
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Insert failed',
            'debug' => $dbcon->error
        ]);
    }

    $stmt1->close();
    

} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);
}
$dbcon->close();

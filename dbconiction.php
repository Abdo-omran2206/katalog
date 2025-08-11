<?php

class Dbconiction {
    private $db_host = 'localhost';
    private $db_user = 'root';
    private $db_pass = '';
    private $db_name = 'katalog';

    /**
     * Start a MySQL database connection using mysqli.
     * @return mysqli
     */
    public function start_db_conn() {
        try {
            $dbcon = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);

            if ($dbcon->connect_error) {
                throw new Exception('Database connection failed: ' . $dbcon->connect_error);
            }

            $dbcon->set_charset("utf8mb4");
            return $dbcon;

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Database connection failed: ' . $e->getMessage()
            ]);
            exit();
        }
    }

    /**
     * Create the `accounts` table if it doesn't already exist.
     * @param mysqli $dbcon
     * @return bool
     */
    public function createAccountsTable($dbcon) {
        $sql = "CREATE TABLE IF NOT EXISTS accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            gender ENUM('male', 'female') NOT NULL,
            password_hashed VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            random_code VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

        return $dbcon->query($sql);
    }

    public function createTrusteesTable($dbcon){
        $sql = "CREATE TABLE IF NOT EXISTS trustees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            senderId VARCHAR(255) NOT NULL,
            lastcheck DATE NOT NULL,
            sendin DATE NOT NULL,
            `default` INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_sender_sendin (senderId, sendin)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        return $dbcon->query($sql);
    }

    public function createMessageTable($dbcon) {
        $sql = "CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            message JSON NOT NULL,
            messageId VARCHAR(255) NOT NULL,
            senderId VARCHAR(255) NOT NULL,
            sendin DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_message_sendin (messageId, sendin),
            UNIQUE KEY unique_message_sender (messageId, senderId),
            UNIQUE KEY unique_message_sender_sendin (messageId, senderId, sendin),
            FOREIGN KEY (senderId, sendin) 
                REFERENCES trustees(senderId, sendin) 
                ON DELETE CASCADE 
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        return $dbcon->query($sql);
    }

    public function createRecepmentTable($dbcon) {
        $sql = "CREATE TABLE IF NOT EXISTS recepment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            recepment_code VARCHAR(255),
            message_id VARCHAR(255) NOT NULL,
            senderId VARCHAR(255) NOT NULL,
            sendin DATE NOT NULL,
            FOREIGN KEY (message_id, senderId, sendin) 
                REFERENCES messages(messageId, senderId, sendin) 
                ON DELETE CASCADE 
                ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        return $dbcon->query($sql);
    }



}

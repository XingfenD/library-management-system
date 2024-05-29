<?php
    header('Content-type:text/json;charset=utf-8');
    require_once '../private/mysql-conn-config.php';

    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    session_start();
    $auth = 0;
    $uname = 'visitor';
    if (isset($_SESSION['username'])) {
        $auth = $_SESSION['authority'];
        $uname = $_SESSION['username'];
    }

    if ($_POST['oper'] == 'backup') {
        if ($auth >= 3) {
            try {
                $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                $backupFile = 'backup_'.date('Y-m-d_H-i-s').'.sql';
                $handle = fopen($backupFile, 'w');
            
                $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
            
                foreach ($tables as $table) {
                    $createTable = $pdo->query("SHOW CREATE TABLE $table")->fetch(PDO::FETCH_ASSOC)['Create Table'];
                    fwrite($handle, "$createTable;\n\n");
            
                    $rows = $pdo->query("SELECT * FROM $table")->fetchAll(PDO::FETCH_ASSOC);
            
                    foreach ($rows as $row) {
                        $values = array_map([$pdo, 'quote'], array_values($row));
                        $values = implode(", ", $values);
                        fwrite($handle, "INSERT INTO $table VALUES ($values);\n");
                    }
                    fwrite($handle, "\n\n");
                }
            
                fclose($handle);
                echo "Database backup successful. Backup file: $backupFile";
            } catch (Exception $e) {
                echo "Database backup failed: " . $e->getMessage();
            }
        } else {
            echo json_encode(Array(
                "status"=>-1,
                "msg"=>"you don't have the authority to do this!"
            ));
        }
    } else if ($_POST['oper'] == 'restore') {
        if ($auth >= 4) {

        } else {
            echo json_encode(Array(
                "status"=>-1,
                "msg"=>"you don't have the authority to do this!"
            ));
        }
    }
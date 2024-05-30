<?php
    header('Content-type:text/json;charset=utf-8');
    require_once '../private/mysql-conn-config.php';

    session_start();
    $auth = 0;
    $uname = 'visitor';
    if (isset($_SESSION['username'])) {
        $auth = $_SESSION['authority'];
        $uname = $_SESSION['username'];
    }

    if ($_POST['oper'] == 'backup') {
        if ($auth >= 3) {
            $backupDir = '../private/backup';
            // 备份文件名，可以包含时间戳等信息
            $backupFile = 'backup_'.$_POST['input'].'_'.date('Y-m-d_H-i-s') . '.sql';
            echo backupDatabase($backupDir, $backupFile);
        } else {
            echo json_encode(Array(
                "status"=>-1,
                "msg"=>"you don't have the authority to do this!"
            ));
        }
    } else if ($_POST['oper'] == 'restore') {
        if ($auth >= 4) {
            restoreDatabase($_POST['input']);
        } else {
            echo json_encode(Array(
                "status"=>-1,
                "msg"=>"you don't have the authority to do this!"
            ));
        }
    } else if ($_POST['oper'] == 'delete') {
        if ($auth >= 4) {
            echo deleteBackup($_POST['input']);
        } else {
            echo json_encode(Array(
                "status"=>-1,
                "msg"=>"you don't have the authority to do this!"
            ));
        }
    }


    function backupDatabase($backupDir, $backupFile) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
        try {
            // 创建一个PDO实例以确保数据库连接是可行的
            $pdo = new PDO($dsn, DB_USER, DB_PASS);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // 使用mysqldump命令进行备份
            $command = "mysqldump --host=" . DB_HOST . " --user=" . DB_USER . " --password=" . DB_PASS . " --no-tablespaces " . DB_NAME . " > " . escapeshellarg($backupDir . '/' . $backupFile);

            system($command, $retval);

            if ($retval == 0) {
                return "Backup successful!";
            } else {
                return "Backup failed!";
            }

        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    function deleteBackup($backupFile) {
        // 检查文件是否存在并且是一个文件
        $filePath = "../private/backup/".$backupFile;
        if (file_exists($filePath) && is_file($filePath)) {
            // 尝试删除文件
            chmod($filePath, 0755);
            if (unlink($filePath)) {
                return "Backup file '$backupFile' deleted successfully.";
            } else {
                return "Failed to delete backup file '$backupFile'.";
            }
        } else {
            return "Backup file '$backupFile' does not exist.";
        }
    }

    function restoreDatabase($backupFile) {
        $filePath = "../private/backup/".$backupFile;

        if (file_exists($filePath) && is_file($filePath)) {
            // 构建mysql命令来恢复数据库
            $command = "mysql --host=" . DB_HOST . " --user=" . DB_USER . " --password=" . DB_PASS . " " . DB_NAME . " < " . escapeshellarg($filePath);
            
            system($command, $retval);

            if ($retval == 0) {
                return "Database restored successfully.";
            } else {
                return "Database restoration failed.";
            }
        } else {
            return "Backup file '$backupFile' does not exist.";
        }
    }
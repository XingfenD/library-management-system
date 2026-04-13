<?php
// 统一错误处理：捕获所有错误/异常，返回纯净 JSON，不向前端暴露代码细节

ob_start();
ini_set('display_errors', '0');
ini_set('log_errors', '1');

function _send_error($message) {
    ob_clean();
    if (!headers_sent()) {
        header('Content-type: application/json; charset=utf-8');
    }
    echo json_encode(array('status' => -99, 'msg' => $message));
    exit;
}

// 捕获 PHP Warning / Notice / Error 等
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        return false; // 遵守 @ 运算符
    }
    $level = ($errno & (E_ERROR | E_USER_ERROR)) ? 'Error' : 'Warning';
    error_log("[{$level}] {$errstr} in {$errfile}:{$errline}");
    if ($errno & (E_ERROR | E_USER_ERROR)) {
        _send_error('Server error');
    }
    return true; // Warning/Notice 只记录日志，不中断执行
});

// 捕获未捕获的异常
set_exception_handler(function($e) {
    error_log('[Exception] ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    _send_error('Server error');
});

// 捕获 Fatal Error（语法错误、内存耗尽等）
register_shutdown_function(function() {
    $err = error_get_last();
    if ($err && ($err['type'] & (E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR))) {
        error_log('[Fatal] ' . $err['message'] . ' in ' . $err['file'] . ':' . $err['line']);
        _send_error('Server error');
    }
});

FROM php:7.4-apache

RUN echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free" > /etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian-security/ bullseye-security main contrib non-free" >> /etc/apt/sources.list

RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# 启用PHP扩展
RUN docker-php-ext-install mysqli

# 复制项目文件到容器内
COPY . /var/www/html/

# 创建必要的目录
RUN mkdir -p /var/www/html/private/key-pair /var/www/html/private/backup

# 配置Apache2
RUN echo "<Directory /var/www/html/private>"    >> /etc/apache2/apache2.conf && \
    echo "        Require all denied"           >> /etc/apache2/apache2.conf && \
    echo "        Deny from all"                >> /etc/apache2/apache2.conf && \
    echo "</Directory>"                         >> /etc/apache2/apache2.conf

# 生成RSA密钥对
RUN openssl genrsa -out /var/www/html/private/key-pair/private_key.pem 2048
RUN openssl rsa -in /var/www/html/private/key-pair/private_key.pem -pubout -out /var/www/html/private/key-pair/public_key.pub

# 配置MySQL连接信息
RUN echo "<?php"                                                > /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_HOST', 'mysql');"                      >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_USER', 'LMS');"                        >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_PASS', 'LBS-mysql-admin-password');"   >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_NAME', 'LMS_DB');"                     >> /var/www/html/private/mysql-conn-config.php && \
    echo "?>"                                                   >> /var/www/html/private/mysql-conn-config.php

# 将公钥写入entry.js文件
RUN chmod +x /var/www/html/insert_pub_key.sh && \
    cd /var/www/html && ./insert_pub_key.sh

# 设置权限
RUN chmod -R 755 /var/www/html/private/backup /var/www/html/private/key-pair
RUN chown -R www-data:www-data /var/www/html/private/backup /var/www/html/private/key-pair

# 暴露80端口
EXPOSE 80

# 启动Apache2服务
CMD ["apache2-foreground"]
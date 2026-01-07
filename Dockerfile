FROM php:7.4-apache

# 启用PHP扩展
RUN docker-php-ext-install mysqli pdo pdo_mysql

# 复制项目文件到容器内
COPY . /var/www/html/

# 创建必要的目录
RUN mkdir -p /var/www/html/private/backup

# 配置Apache2
RUN echo "<Directory /var/www/html/private>"    >> /etc/apache2/apache2.conf && \
    echo "        Require all denied"           >> /etc/apache2/apache2.conf && \
    echo "        Deny from all"                >> /etc/apache2/apache2.conf && \
    echo "</Directory>"                         >> /etc/apache2/apache2.conf

# 配置MySQL连接信息
RUN echo "<?php"                                                > /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_HOST', 'mysql');"                      >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_USER', 'LMS');"                        >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_PASS', 'LBS-mysql-admin-password');"   >> /var/www/html/private/mysql-conn-config.php && \
    echo "    define('DB_NAME', 'LMS_DB');"                     >> /var/www/html/private/mysql-conn-config.php && \
    echo "?>"                                                   >> /var/www/html/private/mysql-conn-config.php

# 设置权限
RUN chmod -R 755 /var/www/html/private/backup
RUN chown -R www-data:www-data /var/www/html/private/backup

# 暴露80端口
EXPOSE 80

# 启动Apache2服务
CMD ["apache2-foreground"]
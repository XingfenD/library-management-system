# README

## The environment

The Library Management System is implemented using the LAMP development environment along with HTML, JavaScript, and CSS.

If you want to deploy this project locally, here is my development environment for your reference.

| Linux            | Apache2                | Mysql                            | PHP                           |
| ---------------- | ---------------------- | -------------------------------- | ----------------------------- |
| Ubuntu-20.02-WSL | Apache/2.4.41 (Ubuntu) | 8.0.36-0ubuntu0.20.04.1 (Ubuntu) | PHP Version 7.4.3-4ubuntu2.22 |

Before you proceed with the following steps, ensure that you have already set up the aforementioned environment.

## Clone the project

Clone the project from the repository:

```bash
git clone https://github.com/xingfend/library-management-system.git library-management-system-master
```

## Start with Docker

To start the project with Docker, you can run the following commands.

```bash
cd library-management-system-master

# Production mode (code baked into image):
docker-compose -f deploy/docker-compose.prod.yml up -d

# Development mode (live edits via volume mount):
docker-compose -f deploy/docker-compose.dev.yml up -d
```

Then access the project at:

```url
http://localhost:80
```

## Manual deployment

### Move project files

```bash
cd library-management-system-master
sudo cp -r src/* /var/www/html/
sudo cp deploy/scripts/LMS_DB_SETUP.sql /var/www/html/
```

### Set up the database

```bash
cd /var/www/html
mysql -u${your_mysql_username} -p${your_mysql_password} < LMS_DB_SETUP.sql
```

Or in the MySQL terminal:

```sql
SOURCE /var/www/html/LMS_DB_SETUP.sql
```

### Create MySQL user

```sql
CREATE USER 'LMS'@'localhost' IDENTIFIED BY 'LBS-mysql-admin-password';
GRANT ALL ON LMS_DB.* TO 'LMS'@'localhost';
```

The SQL script creates a default **root** user with password **123456**. Change it after logging in.

### Configure Apache

```bash
sudo vim /etc/apache2/apache2.conf
```

Add:

```conf
<Directory /var/www/html/private>
        Require all denied
        Deny from all
</Directory>
```

```bash
sudo service apache2 restart
```

### Database connection config

The config file is already at `/var/www/html/private/mysql-conn-config.php`. If you're deploying locally (not Docker), change `DB_HOST` from `'mysql'` to `'localhost'`:

```php
define('DB_HOST', 'localhost');
```

### Grant permissions

```bash
sudo chmod -R 755 /var/www/html/private/backup
sudo chown -R www-data:www-data /var/www/html/private/backup
```

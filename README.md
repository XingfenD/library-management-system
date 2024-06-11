# README

## The environment

The Library Management System is implemented using the LAMP development environment along with HTML, JavaScript, and CSS.

If you want to deploy this project locally, here is my development environment for your reference.

| Linux            | Apache2                | Mysql                            | PHP                           |
| ---------------- | ---------------------- | -------------------------------- | ----------------------------- |
| Ubuntu-20.02-WSL | Apache/2.4.41 (Ubuntu) | 8.0.36-0ubuntu0.20.04.1 (Ubuntu) | PHP Version 7.4.3-4ubuntu2.22 |

Before you proceed with the following steps, ensure that you have already set up the aforementioned environment.

## Download the project

After downloading the zip, you should unzip it firstly:

```bash
unzip library-management-system-master.zip
```

Move the project files to the default http server directory:

```bash
cd library-management-system-master
sudo mv * /var/www/html # move the files to the http server directory
mv /var/www/html/index.html /var/www/html/index.html.backup
```

## Set up the database structure

The sql script of the database used in this project is list in the root directory `./LMS_DB_SETUP.sql`.

To set up the database, you can run the following commands in the Linux bash.

```bash
cd /var/www/html
mysql -u${your_mysql_username} -p=${your_mysql_password} < LMS_DB_SETUP.sql
```

Replace the three varibles with your mysql username, your mysql password and the path to LMS_DB_SETUP.sql.

**Or** run this command in the MySQL terminal:

```sql
SOURCE path_to_LMS_DB_SETUP.sql
```

## Create mysql user

```sql
CREATE user 'LMS'@'localhost' identified by 'LBS-mysql-admin-password';
GRANT all on LMS_DB.* to 'LMS'@'localhost';
```

The SQL Script will defaultly create a **root** user for the system, which is identified by password **123456**, please change it in the system after the configuration.

## Configure the apache2

The configuration file paths for Apache2 may vary depending on the version or the operating system. Consequently, the specific operations for this step may vary from person to person.

```bash
sudo vim /etc/apache2/apache2.conf # edit the configuration file
```

Add the below content to the configuration file:

```conf
<Directory /var/www/html/private>
        Require all denied
        Deny from all
</Directory>
```

```bash
service apache2 restart # restart the apache2 service
```

## Create the directory and file

```bash
# create the private directory
cd /var/www/html
sudo mkdir private
sudo mkdir private/key-pair
cd private/key-pair 
```

```bash
# generate the rsa key-pair

# run these commands in the directory /var/www/html/private/key-pair !!
openssl genrsa -out ./private_key.pem 2048
openssl rsa -in ./private_key.pem -pubout -out ./public_key.pub
```

Open the public_key.pub file and copy all the content:

```bash
# paste the content to the varible publicKey in /var/www/html/js/entry.js line 125
vim /var/www/html/js/entry.js
# Over write the previous publicKey
```

If you don't want to do the step above, you can also run the commands below instead:

```bash
# this may auto write the public key into the js file
cd /var/www/html
sudo chmod +x insert_pub_key.sh
./insert_pub_key.sh
```

Create the account config file:

```bash
cd .. # cd /var/www/html/private
sudo touch mysql-conn-config.php # create the file which define the mysql account_info
sudo vim mysql-conn-config.php # define the mysql account_info
mkdir backup #create backup directory
```

Write the follow content into the mysql-conn-config.php:

```php
<?php
    define('DB_HOST', 'localhost');
    define('DB_USER', 'LMS');
    define('DB_PASS', 'LBS-mysql-admin-password'); // replace the password with your own password
    define('DB_NAME', 'LMS_DB');
```

## Grant user authority

If this step is not carried out, the project will not be able to operate normally.

```bash
sudo chmod -R 755 /var/www/html/private/backup
sudo chown -R www-data:www-data /var/www/html/private/backup
sudo chmod -R 755 /var/www/html/private/key-pair
sudo chown -R www-data:www-data /var/www/html/private/key-pair
```

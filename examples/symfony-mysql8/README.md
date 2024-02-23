# Symfony MySQL 8Example

This example exists primarily to test the following documentation:

* [Symfony Recipe](https://docs.lando.dev/symfony/config.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from web folder
lando ssh -s appserver -c "curl -L localhost" | grep "MYSQL8"

# Should be running apache 2.4 by default
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should use php 5.6 if specified by user
lando php -v | grep "PHP 5.6"

# Should be running mysql 8 if specified by user
lando mysql -V | grep "mysql"| grep "Ver 8.0.22"

# Should be able to connect to the database with the default creds
lando mysql symfony -e quit

# Should use the defauly mysql8 config file
lando ssh -s database -c "cat /opt/bitnami/mysql/conf/my_custom.cnf" | grep "LANDOSYMFONYMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

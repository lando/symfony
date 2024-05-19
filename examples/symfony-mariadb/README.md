# Symfony MariaDB Example

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
lando ssh -s appserver -c "curl -L localhost" | grep "MariaDB"

# Should be running apache 2.4 by default
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should use php 8.3 if specified by user
lando php -v | grep "PHP 8.3."

# Should be running mariadb 11.3.x if specified by user
lando mariadb -V | grep "mariadb" | grep "11.3."

# Should be able to connect to the database with the default creds
lando mariadb symfony -e quit

# Should use the default mariadb config file
lando ssh -s database -c "cat /opt/bitnami/mariadb/conf/my_custom.cnf" | grep "innodb_lock_wait_timeout = 121"
lando mariadb -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

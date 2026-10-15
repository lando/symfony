# Symfony MySQL 8.4 Example

This example exists primarily to test the following documentation:

* [Symfony Recipe](https://docs.lando.dev/symfony/config.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from web folder
lando exec appserver -- curl -L localhost | grep "MYSQL8"

# Should be running apache 2.4 by default
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should use php 5.6 if specified by user
lando php -v | grep "PHP 5.6"

# Should be running mysql 8.4.x via the mysql:8 alias
lando mysql -V | grep '8.4.'

# Should be able to connect to the database with the default creds
lando mysql symfony -e quit

# Should use the default mysql8 config file
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOSYMFONYMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127

# Should use binlog_expire_logs_seconds instead of the removed expire_logs_days
lando mysql -u root -e "show variables;" | grep binlog_expire_logs_seconds | grep 864000
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

# Symfony Downstreamer Example

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
# Should be using mysql8
lando mysql -V | grep 8.0

# Should use the default database connection info
lando mysql -usymfony -psymfony symfony -e quit

# Should use the default mysql8 config file
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDOSYMFONYMYSQL8CNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 127
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

# Symfony Custom 8Example

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
# Should serve from bob folder
lando exec appserver -- curl -L appserver_nginx | grep "HI BOB"

# Should be serving from nginx 1.17
lando exec appserver_nginx -- nginx -v 2>&1 | grep "nginx version" | grep "nginx/1.17"
lando exec appserver -- curl -IL appserver_nginx | grep Server | grep nginx

# Should use php 8.3
lando php -v | grep "PHP 8.3"

# Should use composer 2.0.7
lando exec appserver -- /bin/sh -c 'NO_COLOR=1 composer -V' | grep "Composer version 2.0.7"

# Should be running mysql 5.7
lando mysql -V | grep "mysql" | grep "Distrib 5.7."

# Should be running memcached 1.5
lando exec cache -- memcached --version | grep 1.5.12

# Should be able to connect to the database with the default creds
lando mysql symfony -e quit

# Should have xdebug enabled
lando php -m | grep Xdebug

# Should have proxy urls present in lando info
lando info | grep "http://symfony-custom.lndo.site"
lando info | grep "http://another.symfony-custom.lndo.site"

# Should be using custom config files
lando exec appserver -- curl -L appserver_nginx/info.php | grep memory_limit | grep 513M
lando exec appserver_nginx -- cat /opt/bitnami/nginx/conf/vhosts/lando.conf | grep server_name | grep pirog
lando mysql -u root -e "show variables;" | grep thread_cache_size | grep 12
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```

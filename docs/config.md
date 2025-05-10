---
title: Configuration
description: Learn how to configure the Lando Laravel recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/landofile/recipes.html) set sane defaults so they work out of the box they are also [configurable](https://docs.lando.dev/landofile/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe. If you are unsure about where this goes or what this means we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/landofile/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: symfony
config:
  php: '8.2'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  cache: none
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough all Lando recipes can be further [extended and overriden](https://docs.lando.dev/landofile/recipes.html#extending-and-overriding-recipes).

## Choosing a php version

You can set `php` to any version that is available in our [php service](https://docs.lando.dev/plugins/php). However, you should consult the [Symfony requirements](https://symfony.com/doc/current/setup.html) to make sure that version is actually supported by Symfony itself.

Here is the [recipe config](https://docs.lando.dev/landofile/recipes.html#config) to set the Symfony recipe to use `php` version `8.3`

```yaml
recipe: symfony
config:
  php: '8.3'
```

## Choosing a web server

By default this recipe will be served by the default version of our [apache](https://docs.lando.dev/plugins/apache) service but you can also switch this to use [`nginx`](https://docs.lando.dev/plugins/nginx). We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache) and [nginx](https://docs.lando.dev/plugins/nginx) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: symfony
config:
  via: apache:2.4
```

#### With nginx

```yaml
recipe: symfony
config:
  via: nginx:1.25
```

## Choosing a database backend

By default, this recipe will use the default version of our [mysql](https://docs.lando.dev/plugins/mysql) service as the database backend but you can also switch this to use [`mariadb`](https://docs.lando.dev/plugins/mariadb) or ['postgres'](https://docs.lando.dev/plugins/postgres) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database`, we *highly recommend* you check out the [mysql](https://docs.lando.dev/plugins/mysql), [mariadb](https://docs.lando.dev/plugins/mariadb)and ['postgres'](https://docs.lando.dev/plugins/postgres) services before you change the default.

#### Using MySQL (default)

```yaml
recipe: symfony
config:
  database: mysql:5.7
```

#### Using MariaDB

```yaml
recipe: symfony
config:
  database: mariadb:10.11
```

#### Using Postgres

```yaml
recipe: symfony
config:
  database: postgres:16
```

## Choosing a caching backend

By default this recipe will not spin up a caching backend.

However, you can specify one using the `cache` recipe config and setting it to use either our use [`redis`](https://docs.lando.dev/plugins/redis) or [`memcached`](https://docs.lando.dev/plugins/memcached) service. Note that you can optionally/additionally specify a particular version for either *as long as it is a version documented as available for use with lando* for either service.

If you are unsure about how to configure the `cache` we *highly recommend* you check out our [redis](https://docs.lando.dev/plugins/redis) and [memcached](https://docs.lando.dev/plugins/memcached)) docs as well as the [Symfony ones](https://symfony.com/doc/current/cache.html).

#### Using redis (recommended)

```yaml
recipe: symfony
config:
  cache: redis:7.2
```

#### Using Memcached

```yaml
recipe: symfony
config:
  cache: memcached:1.6
```

## Environment File

By default, Symfony comes with a `.env` configuration file. You will want to modify the following `.env` key so that it makes sense for use with Lando.

Here is what that file would look like if you installed symfony [as above](https://docs.lando.dev/plugins/symfony/getting-started.html). Note that your file might be slightly different depending on your configuration.

```bash
# In all environments, the following files are loaded if they exist,
# the later taking precedence over the former:
#
#  * .env                contains default values for the environment variables needed by the app
#  * .env.local          uncommitted file with local overrides
#  * .env.$APP_ENV       committed environment-specific defaults
#  * .env.$APP_ENV.local uncommitted environment-specific overrides
#
# Real environment variables win over .env files.
#
# DO NOT DEFINE PRODUCTION SECRETS IN THIS FILE NOR IN ANY OTHER COMMITTED FILES.
#
# Run "composer dump-env prod" to compile .env files for production use (requires symfony/flex >=1.2).
# https://symfony.com/doc/current/best_practices/configuration.html#infrastructure-related-configuration

###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=7045ca855d01cf6b008c6744bff58916
#TRUSTED_PROXIES=127.0.0.1,127.0.0.2
#TRUSTED_HOSTS='^localhost|example\.com$'
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###
# Format described at http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/configuration.html#connecting-using-a-url
# For an SQLite database, use: "sqlite:///%kernel.project_dir%/var/data.db"
# Configure your db driver and server_version in config/packages/doctrine.yaml
DATABASE_URL=mysql://symfony:symfony@database/symfony
###< doctrine/doctrine-bundle ###

###> symfony/swiftmailer-bundle ###
# For Gmail as a transport, use: "gmail://username:password@localhost"
# For a generic SMTP server, use: "smtp://localhost:25?encryption=&auth_mode="
# Delivery is disabled by default via "null://localhost"
MAILER_URL=null://localhost
###< symfony/swiftmailer-bundle ###
```

## Symfony CLI

The Symfony CLI is a developer tool to help you build, run, and manage your Symfony applications directly from your terminal. It is included in the `appserver` service and can be run using `lando symfony`.

## Connecting to your database and/or cache

Lando will automatically set up a database with a user and password and also set an environment variables called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

Here are is the default database connection information for a Symfony site. Note that the `host` is not `localhost` but `database`.

```yaml
database: symfony
username: symfony
password: symfony
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

If you've also specified a caching backend here are the default connection settings.

```yaml
host: cache
# Redis
port: 6379
# Memcache
port: 11211
```

You can get also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Using custom config files

You may need to override our [default Symfony config](https://github.com/lando/symfony/tree/main/builders) with your own.

If you do this you must use files that exists inside your applicaton and express them relative to your project root as below.

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache/config.html) and [nginx](https://docs.lando.dev/plugins/nginx/config.html) if you plan to use a custom `vhosts` or `server` config.

#### A hypothetical project

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory in the below example but you can call it whatever you want such as `.lando`.

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

#### Landofile using custom symfony config

```yaml
recipe: symfony
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```

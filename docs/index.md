---
title: Symfony Lando Plugin
description: Use Symfony on Lando for local development; powered by Docker and Docker Compose, config php version, swap db or caching backends or web server, use composer. symfony console, xdebug and custom config files, oh and also import and export databases.
next: ./getting-started.html
---

# Symfony

Symfony is a PHP framework for web projects.

Lando offers a configurable [recipe](https://docs.lando.dev/landofile/recipes.html) for developing [Symfony](https://symfony.com/) apps.

#### Features of this plugin:

* Configurable `php` version (e.g., PHP 5.3 to 8.4+ via Lando's PHP service)
* Configurable `webroot`
* Configurable web server (`apache` or `nginx`)
* Configurable database backend (`mariadb`, `mysql`, or `postgres`)
* Configurable `composer`
* Configurable caching backend (`redis` or `memcached`)
* Includes the Symfony CLI, accessible via `lando symfony`
* `xdebug` support


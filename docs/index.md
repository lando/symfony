---
title: Symfony Lando Plugin
description: Use Symfony on Lando for local development; powered by Docker and Docker Compose, config php version, swap db or caching backends or web server, use composer. symfony console, xdebug and custom config files, oh and also import and export databases.
next: ./getting-started.html
---

# Symfony

Symfony is a PHP framework for web projects.

Lando offers a configurable [recipe](https://docs.lando.dev/config/recipes.html) for developing [Symfony](https://symfony.com/) apps.

#### Features of this plugin:

* Configurable `php` version from `5.3` all the way to `8.1`
* Configurable `webroot`
* Configurable web server (`apache` or `nginx`)
* Configurable database backend (`mariadb`, `mysql`, or `postgres`)
* Configurable `composer`
* Configurable caching backend (`redis` or `memcached`)
* `xdebug`

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/symfony
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/symfony
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/symfony" line to install a particular version eg
# npm install @lando/symfony@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:18-alpine sh -c \
  "npm init -y \
  && npm install @lando/symfony --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/symfony \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/symfony /plugins/@lando/symfony"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/symfony`. This command will also show you _where_ the plugin is being loaded from.

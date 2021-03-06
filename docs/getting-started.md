---
description: Learn how to get started with the Lando Symfony recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/installation/system-requirements.html) and gotten familar with [its basics](https://docs.lando.dev/started.html)
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Symfony site.

```bash
# Initialize a symfony recipe
lando init \
  --source cwd \
  --recipe symfony \
  --webroot public \
  --name my-first-symfony-app

# Install symfony
lando composer create-project symfony/website-skeleton tmp && cp -r tmp/. . && rm -rf tmp

# Install other Symfony dependencies you may like
lando composer require annotations asset doctrine encore form logger maker profiler security security-guard stof/doctrine-extensions-bundle twig validator var-dumper

# Start it up
lando start

# List information about this app.
lando info

# Run bin/console commands with: lando console
# Here is how to clear cache; 
lando console cache:clear
```

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/symfony" line to install a particular version eg
# yarn add @lando/symfony@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/symfony --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/symfony \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/symfony /plugins/@lando/symfony"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/symfony
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/symfony`. This command will also show you _where_ the plugin is being loaded from.

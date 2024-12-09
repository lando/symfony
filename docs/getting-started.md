---
description: Learn how to get started with the Lando Symfony recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familar with [its basics](https://docs.lando.dev/getting-started/)
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/landofile/) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/services/lando-3.html), [tooling](https://docs.lando.dev/landofile/tooling.html), [events](https://docs.lando.dev/landofile/events.html) and [routing](https://docs.lando.dev/landofile/proxy.html) Lando offers.

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


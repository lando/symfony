# Symfony Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Symfony](https://symfony.com/). When installed it...

* Allows users to run a `symfony` app
* Allows users to configure `php` version from `5.3` all the way to `8.1`
* Allows users to configure `webroot`
* Allows users to configure web server to (`apache` or `nginx`)
* Allows users to configure database backend to (`mariadb`, `mysql`, or `postgres`)
* Allows users to configure `composer`
* Allows users to configure a caching backend (`redis` or `memcached`)
* Allows users to configure `xdebug`

Of course, once a user is running their Symfony project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `symfony` recipe to your Landofile

```yaml
name: symfony-app
recipe: symfony
```

For more info you should check out the [docs](https://docs.lando.dev/symfony):

* [Getting Started](https://docs.lando.dev/symfony/)
* [Configuration](https://docs.lando.dev/symfony/config.html)
* [Tooling](https://docs.lando.dev/symfony/tooling.html)
* [Examples](https://github.com/lando/symfony/tree/main/examples)
* [Development](https://docs.lando.dev/symfony/development.html)

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/symfony/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/symfony/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/symfony/releases).

## Contributors

<a href="https://github.com/lando/symfony/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/symfony" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/symfony/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)

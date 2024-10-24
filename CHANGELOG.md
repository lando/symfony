## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

  * Removed unnecessary dependency lando/nginx.

## v1.7.0 - [October 18, 2024](https://github.com/lando/symfony/releases/tag/v1.7.0)

* Updated lando/php to v1.5.0..
* Updated lando/mariadb to v1.5.0.
* Updated lando/mysql to v1.3.0.

## v1.6.1 - [September 6, 2024](https://github.com/lando/symfony/releases/tag/v1.6.1)

## Bug Fixes

* Fixed bug causing default `proxy` settings to be clobbered by user specified ones

## Internal

* Updated DevOps to use new `lando exec`
* Updated `ubuntu` test runners to `24.04`

## v1.6.0 - [May 31, 2024](https://github.com/lando/symfony/releases/tag/v1.6.0)

* Use mysql command for MariaDB 10.3.x and below [#52](https://github.com/lando/symfony/issues/52)

## v1.5.0 - [March 8, 2024](https://github.com/lando/symfony/releases/tag/v1.5.0)

* Updated to latest database services.

## v1.4.1 - [March 4, 2024](https://github.com/lando/symfony/releases/tag/v1.4.1)

### Fixes

* Improved `database` selection for purposes of `config` loading, fixes some `database` bootup issues when the `database` type is overridden downstream

## v1.4.0 - [February 22, 2024](https://github.com/lando/symfony/releases/tag/v1.4.0)

### Fixes

* Fixed `CRITICAL` issue with default config files not loading correctly.

## v1.3.0 - [February 21, 2024](https://github.com/lando/symfony/releases/tag/v1.3.0)

* Updated memcached plugin to [v1.1.0](https://github.com/lando/memcached/releases/tag/v1.1.0).
* Added testing of memcached.
* Fixed issue with proxy URLs not showing up.

## v1.2.0 - [February 19, 2024](https://github.com/lando/symfony/releases/tag/v1.2.0)

* Included ability to specify `database: mssql` in the `config` section to maintain backwards compatibility. [@lando/mssql#31](https://github.com/lando/mssql/issues/31)
* Updated dependencies.

## v1.1.0 - [February 19, 2024](https://github.com/lando/symfony/releases/tag/v1.1.0)

* Fixed issue with @lando/memcached path being in an unexpected location. [#38](https://github.com/lando/symfony/issues/38)

## v1.0.0 - [December 13, 2023](https://github.com/lando/symfony/releases/tag/v1.0.0)

* Dialed fully for `lando update`

## v0.9.0 - [July 3, 2023](https://github.com/lando/symfony/releases/tag/v0.9.0)

* Removed bundle-dependencies and version-bump-prompt from plugin.
* Updated package to use prepare-release-action.
* Updated documentation to reflect new release process.

## v0.8.0 - [February 26, 2022](https://github.com/lando/symfony/releases/tag/v0.8.0)

* Add compatibility for MySQL 8.x [lando/lando#1426](https://github.com/lando/lando/issues/1462)

## v0.7.0 - [December 12, 2022](https://github.com/lando/symfony/releases/tag/v0.7.0)

* Added bundle-dependencies to release process.
* Fixed bug in plugin dogfooding test.

## v0.6.0 - [September 7, 2022](https://github.com/lando/symfony/releases/tag/v0.6.0)

* HYPERDRIVED

## v0.5.0 - [January 10, 2022](https://github.com/lando/symfony/releases/tag/v0.5.0)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Initial Release

# Symfony Init Example

This example exists primarily to test the following documentation:

* [Symfony Recipe](https://docs.lando.dev/symfony/getting-started.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should clone Symfony code and init a symfony recipe landofile
rm -rf symfony && mkdir -p symfony && cd symfony
lando init --source remote --remote-url https://github.com/symfony/symfony/releases/download/1.26.2/symfony.zip --recipe symfony --webroot symfony --name symfony
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml

# Should start up successfully
cd symfony
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the Symfony installation page by default
cd symfony
lando ssh -s appserver -c "curl -L localhost" | grep "Symfony CMS 1"

# Should use 8.2 as the default php version
cd symfony
lando php -v | grep "PHP 8.2"

# Should be running apache 2.4 by default
cd symfony
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mariadb 10.6 by default
cd symfony
lando mysql -V | grep 10.6 | grep MariaDB

# Should not enable xdebug by default
cd symfony
lando php -m | grep xdebug || echo $? | grep 1

# Should be able to connect to the database with the default creds
cd symfony
lando mysql symfony -e quit

# Should use bee 1.x-1.x by default
cd symfony/symfony
lando bee version | grep "Bee for Symfony CMS" | grep "1.x-1.x"

# Should be able to install Symfony with bee and verify it installed
cd symfony/symfony
chmod +x core/scripts/*
lando bee site-install --db-name=symfony --db-user=symfony --db-pass=symfony --db-host=database --username=admin --password=a --email=mike@lando.dev --site-name="Vibes Rising" --auto
lando bee status | grep "Site name" | grep "Vibes Rising"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd symfony
lando destroy -y
lando poweroff
```

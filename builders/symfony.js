'use strict';

// Modules
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/*
* Helper to get cache
*/
const getCache = cache => {
  const version = _.includes(cache, ':') ? _.last(cache.split(':')) : false;
  // Return redis
  if (_.includes(cache, 'redis')) {
    return {
      type: version ? `symfony-redis:${version}` : 'symfony-redis',
      portforward: true,
      persist: true,
    };
    // Or memcached
  } else if (_.includes(cache, 'memcached')) {
    return {
      type: version ? `symfony-memcached:${version}` : 'symfony-memcached',
      portforward: true,
    };
  }
};

/*
* Helper to get services
*/
const getServices = options => ({
  appserver: {
    build_as_root_internal: options.build_root,
    build_internal: options.build,
    composer: options.composer,
    composer_version: options.composer_version,
    config: getServiceConfig(options),
    run_as_root_internal: options.run_root,
    ssl: true,
    type: `symfony-php:${options.php}`,
    via: options.via,
    xdebug: options.xdebug,
    webroot: options.webroot,
    nginxServiceType: `symfony-${options.via}`,
  },
  database: {
    config: getServiceConfig(options, ['database']),
    authentication: 'mysql_native_password',
    type: `symfony-${options.database}`,
    portforward: true,
    creds: {
      user: options.recipe,
      password: options.recipe,
      database: options.recipe,
    },
  },
});

/*
* Helper to get service config
*/
const getServiceConfig = (options, types = ['php', 'server', 'vhosts']) => {
  const config = {};
  _.forEach(types, type => {
    if (_.has(options, `config.${type}`)) {
      config[type] = options.config[type];
    } else if (!_.has(options, `config.${type}`) && _.has(options, `defaultFiles.${type}`)) {
      if (_.has(options, 'confDest')) {
        config[type] = path.join(options.confDest, options.defaultFiles[type]);
      }
    }
  });
  return config;
};

// Tooling defaults
const toolingDefaults = {
  'composer': {
    service: 'appserver',
    cmd: 'composer --ansi',
  },
  'db-import <file>': {
    service: ':host',
    description: 'Imports a dump file into a database service',
    cmd: '/helpers/sql-import.sh',
    user: 'root',
    options: {
      'host': {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      'no-wipe': {
        description: 'Do not destroy the existing database before an import',
        boolean: true,
      },
    },
  },
  'db-export [file]': {
    service: ':host',
    description: 'Exports database from a database service to a file',
    cmd: '/helpers/sql-export.sh',
    user: 'root',
    options: {
      host: {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      stdout: {
        description: 'Dump database to stdout',
      },
    },
  },
  'php': {
    service: 'appserver',
    cmd: 'php',
  },
};

/*
* Helper to get the phar build command
*/
const getDbTooling = database => {
  // Make sure we strip out any version number
  database = database.split(':')[0];
  // Choose wisely
  if (_.includes(['mysql', 'mariadb'], database)) {
    return {mysql: mysqlCli};
  } else if (database === 'postgres') {
    return {psql: postgresCli};
  } else if (database === 'mongo') {
    return {mongo: {
      service: 'database',
      description: 'Drop into the mongo shell',
    }};
  }
};

// Default DB cli commands
const mysqlCli = {
  service: ':host',
  description: 'Drops into a MySQL shell on a database service',
  cmd: 'mysql -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
const postgresCli = {
  service: ':host',
  description: 'Drops into a psql shell on a database service',
  cmd: 'psql -Upostgres',
  user: 'root',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};

/*
* Helper to get config defaults
*/
const getConfigDefaults = options => {
  // Get the viaconf
  if (_.startsWith(options.via, 'nginx')) options.defaultFiles.vhosts = 'default.conf.tpl';

  // Get the default db conf
  const dbConfig = _.get(options, 'database', 'mysql');
  const database = _.first(dbConfig.split(':'));
  const version = _.last(dbConfig.split(':')).substring(0, 2);
  if (database === 'mysql' || database === 'mariadb') {
    if (version === '8.') {
      options.defaultFiles.database = 'mysql8.cnf';
    } else {
      options.defaultFiles.database = 'mysql.cnf';
    }
  }

  // Verify files exist and remove if it doesn't
  _.forEach(options.defaultFiles, (file, type) => {
    if (!fs.existsSync(`${options.confDest}/${file}`)) {
      delete options.defaultFiles[type];
    }
  });
};

/*
* Helper to get tooling
*/
const getTooling = options => _.merge({}, toolingDefaults, getDbTooling(options.database));


/*
* Build Symfony
*/
module.exports = {
  name: 'symfony',
  parent: '_recipe',
  config: {
    confSrc: path.resolve(__dirname, '..', 'config'),
    config: {},
    composer: {},
    database: 'mysql',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '8.2',
    database: 'mysql:5.7',
    services: {appserver: {overrides: {environment: {
      APP_LOG: 'errorlog',
    }}}},
    tooling: {symfony: {service: 'appserver'}},
    via: 'apache',
    webroot: '.',
    xdebug: false,
    proxy: {},
  },
  builder: (parent, config) => class LandoSymfony extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Add in console tooling
      options.tooling.console = {
        service: 'appserver',
        cmd: `php /app/${options.webroot}/../bin/console`,
      };
      if (_.has(options, 'cache')) options.services.cache = getCache(options.cache);

      // Rebase on top of any default config we might already have
      options.defaultFiles = _.merge({}, getConfigDefaults(_.cloneDeep(options)), options.defaultFiles);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);
      // Switch the proxy if needed
      if (!_.has(options, 'proxyService')) {
        if (_.startsWith(options.via, 'nginx')) options.proxyService = 'appserver_nginx';
        else if (_.startsWith(options.via, 'apache')) options.proxyService = 'appserver';
      }
      options.proxy = _.set(options.proxy, options.proxyService, [`${options.app}.${options._app._config.domain}`]);

      // Send downstream
      super(id, options);
    };
  },
};

'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'rabbitmq',
  config: {
    version: '3',
    supported: ['3'],
    pinPairs: {
      '3': 'rabbitmq:3-management',
    },
    patchesSupported: true,
    confSrc: path.join(__dirname, '..', 'config'),
    healthcheck: 'rabbitmq-diagnostics -q ping',
    persist: false,
    port: '15672',
    portforward: 15672,
    moreHttpPorts: ['15672'],
  },
  parent: '_service',
  builder: (parent, config) => class LandoRabbitMQ extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);

      const rabbitmq = {
        image: `rabbitmq:${options.version}`,
        command: 'rabbitmq-server',
        volumes: [
          `${options.confDest}/rabbitmq-isolated.conf:/etc/rabbitmq/rabbitmq.config`,
        ],
      };
      super(id, options, {services: _.set({}, options.name, rabbitmq)});
    };
  },
};

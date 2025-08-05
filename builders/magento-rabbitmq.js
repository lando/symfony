'use strict';

const _ = require('lodash');
const LandoRabbitMQ = require('./../custom/rabbitmq/builders/rabbitmq.js');

// Builder
module.exports = {
  name: 'magento-rabbitmq',
  parent: '_service',
  builder: parent => class MagentoRedis extends LandoRabbitMQ.builder(parent, LandoRabbitMQ.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};

'use strict';

const _ = require('lodash');
const LandoRedis = require('@lando/redis/builders/redis.js');

// Builder
module.exports = {
  name: 'symfony-redis',
  parent: '_service',
  builder: (parent, config) => class SymfonyRedis extends LandoRedis.builder(parent, LandoRedis.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    };
  },
};

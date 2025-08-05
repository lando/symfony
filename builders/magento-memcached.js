'use strict';

const _ = require('lodash');
const LandoMemcached = require('@lando/memcached/builders/memcached.js');

// Builder
module.exports = {
  name: 'magento-memcached',
  parent: '_service',
  builder: parent => class MagentoMemcached extends LandoMemcached.builder(parent, LandoMemcached.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};

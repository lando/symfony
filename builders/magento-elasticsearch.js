'use strict';

const _ = require('lodash');
const LandoElasticSearch = require('@lando/redis/builders/redis.js');

// Builder
module.exports = {
  name: 'magento-redis',
  parent: '_service',
  builder: parent => class MagentoElasticSearch extends LandoElasticSearch.builder(parent, LandoElasticSearch.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};

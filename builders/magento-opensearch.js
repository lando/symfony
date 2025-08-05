'use strict';

const _ = require('lodash');
const LandoOpenSearch = require('./../custom/opensearch/builders/opensearch.js');

// Builder
module.exports = {
  name: 'magento-opensearch',
  parent: '_service',
  builder: parent => class MagentoRedis extends LandoOpenSearch.builder(parent, LandoOpenSearch.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};

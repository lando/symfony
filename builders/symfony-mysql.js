'use strict';

const _ = require('lodash');
const LandoMysql = require('./../node_modules/@lando/mysql/builders/mysql.js');

// Builder
module.exports = {
  name: 'symfony-mysql',
  parent: '_service',
  builder: parent => class SymfonyMysql extends LandoMysql.builder(parent, LandoMysql.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};

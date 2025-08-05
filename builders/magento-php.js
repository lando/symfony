'use strict';

const path = require('path');
const landoPhpPath = path.join(__dirname, '../node_modules/@lando/php');
const LandoPhp = require(`${landoPhpPath}/builders/php.js`);

/**
 * Symfony PHP builder class that extends Lando PHP builder.
 * Uses the bundled version of @lando/php plugin instead of user's version.
 *
 * @module magento-php
 */
module.exports = {
  name: 'magento-php',
  parent: '_appserver',
  /**
   * Builder function that returns the SymfonyPhp class
   * @param {Object} parent - Parent builder class
   * @return {Class} SymfonyPhp class extending LandoPhp builder
   */
  builder: parent => class MagentoPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    /**
     * Create a new SymfonyPhp instance
     * @param {string} id - Service id
     * @param {Object} options - Service options
     * @param {Object} factory - App factory instance
     */
    constructor(id, options = {}, factory) {
      options.nginxServiceType = 'magento-nginx';
      super(id, options, factory);
    }
  },
};

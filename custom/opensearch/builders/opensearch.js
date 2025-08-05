'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'opensearch',
  config: {
    version: '2.19',
    supported: ['2.19'],
    patchesSupported: true,
    confSrc: path.join(__dirname, '..', 'config'),
    healthcheck: 'curl -XGET http://localhost:9200/_cluster/health?wait_for_status=yellow&timeout=50s',
    persist: false,
    port: '9200',
    portforward: 9200,
    moreHttpPorts: ['9200'],
  },
  parent: '_service',
  builder: (parent, config) => class LandoOpenSearch extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);

      const opensearch = {
        image: `opensearchproject/opensearch:${options.version}`,
        command: './opensearch-docker-entrypoint.sh',
        environment: {
          'DISABLE_SECURITY_PLUGIN': 'true',
          'discovery.type': 'single-node',
        },
      };

      super(id, options, {services: _.set({}, options.name, opensearch)});
    };
  },
};

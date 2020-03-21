const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Request service operations
 */
class GeolocationService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async send() {
        this.logger.info('TOOD');
    }
}

module.exports = GeolocationService;

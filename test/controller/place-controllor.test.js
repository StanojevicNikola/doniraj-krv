const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const Controller = require('../../source/controllers/place-controller');

const placeService = app.container.resolve('placeService');
const geolocationService = app.container.resolve('geolocationService');
const logger = app.container.resolve('logger');
const utils = require('../../source/utils');

const controller = new Controller({
    logger, placeService, geolocationService,
});

describe('PLACE controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();

        // sinonSandbox = sinon.createSandbox();
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

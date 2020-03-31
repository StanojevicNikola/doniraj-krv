const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const config = require('../../test-config');
const RequestController = require('../../source/controllers/request-controller');
const utils = require('../../source/utils');

describe('Request controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('should pass publishRequest', async () => {
        try {
            const geolocationService = app.container.resolve('geolocationService');
            const requestService = app.container.resolve('requestService');
            const emailService = app.container.resolve('emailService');
            const recipientService = app.container.resolve('recipientService');
            const donorService = app.container.resolve('donorService');
            const geoService = app.container.resolve('geoService');
            const logger = app.container.resolve('logger');
            const bloodGroupService = app.container.resolve('bloodGroupService');

            const bgId = await geolocationService.create({
                city: 'Beograd',
                lat: '44.818611',
                lng: '20.468056',
            });

            const recId = await recipientService.create({});

            const requestController = new RequestController(
                {
                    logger,
                    geolocationService,
                    requestService,
                    config,
                    emailService,
                    donorService,
                    geoService,
                    bloodGroupService,
                },
            );

            const { data, message } = await requestController.publishRequest(
                5000,
                'Beograd',
                recId,
                'COMPATIBLE',
                ['A+'],
                [],
            );

            assert.notDeepEqual(data, null);
            assert.deepEqual(message, 'Kompatibilni donori su obavesteni o Vasem zahtevu!');
        } catch (e) {
            assert(false, e);
        }
    });


    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

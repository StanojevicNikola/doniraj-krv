const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const Controller = require('../../source/controllers/info-controller');

const newsService = app.container.resolve('newsService');
const eventService = app.container.resolve('eventService');
const bloodGroupService = app.container.resolve('bloodGroupService');
const geolocationService = app.container.resolve('geolocationService');
const logger = app.container.resolve('logger');

const controller = new Controller({
    logger, newsService, eventService, bloodGroupService, geolocationService,
});

describe('INFO controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();

        // sinonSandbox = sinon.createSandbox();
    });

    it('Should find all NEWS', async () => {
        const inserted = {
            title: 'Title10',
            description: 'Description10',
        };

        try {
            const id = await newsService.create(inserted);
            const fetched = await controller.getNews();

            assert.equal(inserted.title, fetched[0].title, 'This is all news <title>!');
            assert.equal(inserted.description, fetched[0].description, 'This is all news <decription>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should find all EVENTS', async () => {
        const inserted = {
            title: 'Title1',
            description: 'Description1',
            hour: '10.00 h',
        };

        try {
            const id = await eventService.create(inserted);
            const fetched = await controller.getEvents();

            assert.equal(inserted.title, fetched[0].title, 'This is all events <title>!');
            assert.equal(inserted.description, fetched[0].description, 'This is all events <decription>!');
            assert.equal(inserted.hour, fetched[0].hour, 'This is all events <hour>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should find all BLOOD_GROUPS', async () => {
        const inserted1 = {
            groupType: 'AAA+',
        };
        const inserted2 = {
            groupType: 'BBB+',
        };
        const inserted3 = {
            groupType: 'CCC+',
        };
        const inserted4 = {
            groupType: 'DDDD+',
        };

        try {
            await bloodGroupService.create(inserted1);
            await bloodGroupService.create(inserted2);
            await bloodGroupService.create(inserted3);
            await bloodGroupService.create(inserted4);
            const fetched = await controller.getBloodGroups();

            assert.equal(inserted1.groupType, fetched[0].groupType, 'This is all blood groups <groupType>!');
            assert.equal(inserted2.groupType, fetched[1].groupType, 'This is all blood groups <groupType>!');
            assert.equal(inserted3.groupType, fetched[2].groupType, 'This is all blood groups <groupType>!');
            assert.equal(inserted4.groupType, fetched[3].groupType, 'This is all blood groups <groupType>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should find all GEOLOCATIONS', async () => {
        const inserted = {
            city: 'Aleksinac',
            lat: '115',
            lng: '995',
        };

        try {
            const id = await geolocationService.create(inserted);
            const fetched = await controller.getCities();

            assert.equal(inserted.city, fetched[0].city, 'This is all geolocations <city>!');
            assert.equal(inserted.lat, fetched[0].lat, 'This is all geolocations <lat>!');
            assert.equal(inserted.lng, fetched[0].lng, 'This is all geolocations <lng>!');
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

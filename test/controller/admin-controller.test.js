const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const Controller = require('../../source/controllers/admin-controller');

const newsService = app.container.resolve('newsService');
const eventService = app.container.resolve('eventService');
const placeService = app.container.resolve('placeService');
const geolocationService = app.container.resolve('geolocationService');
const logger = app.container.resolve('logger');

const controller = new Controller({
    logger, newsService, eventService, placeService, geolocationService,
});

describe('ADMIN controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();

        // sinonSandbox = sinon.createSandbox();
    });

    it('Should CREATE news', async () => {
        const inserted = {
            title: 'Title10',
            description: 'Description10',
        };

        try {
            const id = await controller.createNews(inserted);
            const fetched = await newsService.findById(id);

            assert.equal(inserted.title, fetched.title, 'News is created <title>!');
            assert.equal(inserted.description, fetched.description, 'News is created  <decription>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should UPDATE news', async () => {
        const inserted = {
            title: 'Title11',
            description: 'Description11',
        };

        const updated = {
            title: 'Title12',
            description: 'Description12',
        };

        try {
            const id = await controller.createNews(inserted);
            await controller.updateNews(inserted.title, updated);
            const fetched = await newsService.findById(id);

            assert.equal(fetched.title, updated.title, 'News is created <title>!');
            assert.equal(fetched.description, updated.description, 'News is created  <decription>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should CREATE event', async () => {
        const inserted = {
            title: 'Title13',
            description: 'Description13',
            hour: '10.00 h',
            city: 'Cuprija',
            lat: '112',
            lng: '998',
        };
        try {
            const id = await controller.createEvent(inserted);
            const fetched = await eventService.findById(id);

            assert.equal(inserted.title, fetched.title, 'Event is created <title>!');
            assert.equal(inserted.description, fetched.description, 'Event is created <decription>!');
            assert.equal(inserted.hour, fetched.hour, 'Event is created  <hour>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should UPDATE event', async () => {
        const inserted = {
            title: 'Title13',
            description: 'Description13',
            hour: '10.00 h',
            city: 'Aleksinac',
            lat: '112',
            lng: '998',
        };
        const updated = {
            title: 'Title14',
            description: 'Description14',
            hour: '11.00 h',
            city: 'Paracin',
            lat: '113',
            lng: '997',
        };
        try {
            const id = await controller.createEvent(inserted);
            await controller.updateEvent(inserted.title, updated);
            const fetched = await eventService.findById(id);

            assert.equal(updated.title, fetched.title, 'Event is updated <title>!');
            assert.equal(updated.description, fetched.description, 'Event is updated <decription>!');
            assert.equal(updated.hour, fetched.hour, 'Event is updated  <hour>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should CREATE place', async () => {
        const inserted = {
            address: 'adresa14',
            name: 'name14',
            description: 'description14',
            workingHours: 14,
            isStatic: true,
            city: 'Smederevo',
            lat: '113',
            lng: '997',
        };
        try {
            const id = await controller.createPlace(inserted);
            const fetched = await placeService.findById(id);

            assert.equal(inserted.address, fetched.address, 'Place is created <address>!');
            assert.equal(inserted.name, fetched.name, 'Place is created <name>!');
            assert.equal(inserted.description, fetched.description, 'Place is created <description>!');
            assert.equal(inserted.workingHours, fetched.workingHours, 'Place is created <workingHours>!');
            assert.equal(inserted.isStatic, fetched.isStatic, 'Place is created <isStatic>!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should UPDATE place', async () => {
        const inserted = {
            address: 'Adresa15',
            name: 'Ime15',
            description: 'Description15',
            workingHours: 150,
            isStatic: false,
            city: 'Novi Sad',
            lat: '114',
            lng: '996',
        };
        const updated = {
            address: 'Adresa17',
            name: 'Ime17',
            description: 'Description17',
            workingHours: 170,
            isStatic: false,
            city: 'Novi Grad',
            lat: '115',
            lng: '995',
        };
        try {
            const id = await controller.createPlace(inserted);
            await controller.updatePlace(inserted.name, updated);
            const fetched = await placeService.findById(id);

            assert.equal(updated.address, fetched.address, 'Place is updated <address>!');
            assert.equal(updated.name, fetched.name, 'Place is updated <name>!');
            assert.equal(updated.description, fetched.description, 'Place is updated <description>!');
            assert.equal(updated.workingHours, fetched.workingHours, 'Place is updated <workingHours>!');
            assert.equal(updated.isStatic, fetched.isStatic, 'Place is updated <isStatic>!');
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

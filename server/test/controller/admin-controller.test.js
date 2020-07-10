const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const mongoose = require('mongoose');

const AdminController = require('../../source/controllers/admin-controller');


describe('ADMIN controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE news', async () => {
        const inserted = {
            title: 'Title10',
            description: 'Description10',
        };

        try {
            const newsService = app.container.resolve('newsService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                newsService,
            });

            const id = await adminController.createNews(inserted);
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
            const newsService = app.container.resolve('newsService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                newsService,
            });

            const id = await adminController.createNews(inserted);
            await adminController.updateNews(id, updated);
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
            const eventService = app.container.resolve('eventService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                eventService,
            });

            const id = await adminController.createEvent(inserted);
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
            const eventService = app.container.resolve('eventService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                eventService,
            });

            const id = await adminController.createEvent(inserted);
            await adminController.updateEvent(id, updated);
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
            const placeService = app.container.resolve('placeService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                placeService,
            });

            const id = await adminController.createPlace(inserted);
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
            const newsService = app.container.resolve('newsService');
            const eventService = app.container.resolve('eventService');
            const placeService = app.container.resolve('placeService');
            const geolocationService = app.container.resolve('geolocationService');
            const bloodGroupService = app.container.resolve('bloodGroupService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                newsService,
                eventService,
                placeService,
                geolocationService,
                bloodGroupService,
            });

            const id = await adminController.createPlace(inserted);
            await adminController.updatePlace(id, updated);
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

    it('Should throw CREATE transaction - bad place', async () => {
        const bloodData = {
            groupType: 'A+',
        };
        try {
            const placeService = app.container.resolve('placeService');
            const bloodGroupService = app.container.resolve('bloodGroupService');
            const storageService = app.container.resolve('storageService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                placeService,
                bloodGroupService,
                storageService,
            });

            const blood = await bloodGroupService.create(bloodData);
            const amount = 10;

            await adminController.createTransaction({
                place: mongoose.Types.ObjectId(),
                blood,
                amount,
            });
        } catch (e) {
            assert.deepEqual(e.message, 'Izabrali ste nepostojecu lokaciju!');
        }
    });

    it('Should fail CREATE transaction - bad blood group', async () => {
        const placeData = {
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
            const placeService = app.container.resolve('placeService');
            const bloodGroupService = app.container.resolve('bloodGroupService');
            const storageService = app.container.resolve('storageService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                placeService,
                bloodGroupService,
                storageService,
            });

            const id = await adminController.createPlace(placeData);
            const amount = 10;

            await adminController.createTransaction({
                place: id,
                blood: mongoose.Types.ObjectId(),
                amount,
            });
        } catch (e) {
            assert.deepEqual(e.message, 'Izabrali ste nepostojecu krvnu grupu!');
        }
    });

    it('Should pass CREATE transaction', async () => {
        const bloodData = {
            groupType: 'A+',
        };
        const placeData = {
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
            const placeService = app.container.resolve('placeService');
            const bloodGroupService = app.container.resolve('bloodGroupService');
            const storageService = app.container.resolve('storageService');
            const logger = app.container.resolve('logger');

            const adminController = new AdminController({
                logger,
                placeService,
                bloodGroupService,
                storageService,
            });

            const blood = await bloodGroupService.create(bloodData);
            const place = await adminController.createPlace(placeData);
            const amount = 10;

            const { data, message } = await adminController.createTransaction({
                place,
                blood,
                amount,
            });
            assert.deepEqual(data, null);
            assert.deepEqual(message, 'Uspesno ste azurirali stanje krvi');
        } catch (e) {
            assert(e, false);
        }
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

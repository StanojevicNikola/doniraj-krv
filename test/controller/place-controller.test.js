const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const Controller = require('../../source/controllers/place-controller');

const placeService = app.container.resolve('placeService');
const geolocationService = app.container.resolve('geolocationService');
const geoService = app.container.resolve('geoService');
const logger = app.container.resolve('logger');

const controller = new Controller({
    logger, placeService, geolocationService, geoService,
});

describe('PLACE controller test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();

        // sinonSandbox = sinon.createSandbox();
    });

    it('Should find places by geolocation without distance constraint', async () => {
        try {
            const inserted_geo = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };
            const id_geo = await geolocationService.create(inserted_geo);

            const inserted_place = {
                address: 'Adresa1',
                name: 'Ime1',
                description: 'Description1',
                workingHours: '10',
                isStatic: true,
                geolocation: id_geo,
            };
            const id_place = await placeService.create(inserted_place);
            const fetched_place = await placeService.findById(id_place);

            const tested_data = {
                body: {
                    // query: { _id: id_place },
                    query: {},
                    constraint: { adress: 'Adresa1' },
                },
            };
            const data = await controller.find(tested_data);

            assert.equal(data[0].address, inserted_place.address, 'Those are places <address> filtered by geolocation!');
            assert.equal(data[0].geolocation.id_geo, inserted_place.geolocation.id_geo, 'Those are places <geolocation_id> filtered by geolocation!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should find places by geolocation with distance constraint', async () => {
        try {
            const inserted_geo = {
                city: 'Cuprija',
                lat: '43.928388',
                lng: '21.374491',
            };
            const id_geo = await geolocationService.create(inserted_geo);

            const inserted_place = {
                address: 'Adresa2',
                name: 'Ime2',
                description: 'Description2',
                workingHours: '20',
                isStatic: true,
                geolocation: id_geo,
            };
            const id_place = await placeService.create(inserted_place);
            const fetched_place = await placeService.findById(id_place);

            const tested_data = {
                body: {
                    query: { _id: id_place },
                    // query: {},
                    constraint: { distance: 1000 },
                },
            };
            const data_geolocation = await controller.find(tested_data);

            assert.equal(data_geolocation[0].city, inserted_geo.city, 'Should find places by distance constraint!');
        } catch (e) {
            assert(false, e);
        }
    });

    it('Should NOT find places by geolocation with distance constraint', async () => {
        try {
            const inserted_geo = {
                city: 'Nis',
                lat: '43.323356',
                lng: '21.901779',
            };
            const id_geo = await geolocationService.create(inserted_geo);

            const inserted_place = {
                address: 'Adresa3',
                name: 'Ime3',
                description: 'Description3',
                workingHours: '30',
                isStatic: true,
                geolocation: id_geo,
            };
            const id_place = await placeService.create(inserted_place);
            const fetched_place = await placeService.findById(id_place);

            const tested_data = {
                body: {
                    // query: { _id: id_place },
                    query: {},
                    constraint: { distance: 1 },
                },
            };
            const data_geolocation = await controller.find(tested_data);

            assert.equal(data_geolocation.length, 0, 'Should NOT find places by distance constraint <small distance>!');
        } catch (e) {
            assert.deepEqual('Ne postoji grad u zadatom radijusu!', e.message);
        }
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const service = app.container.resolve('geolocationService');

describe('Geolocation service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };

            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            assert.equal(inserted.lat, fetched.lat, 'Fetched <geolocation.lat> should BE same as inserted one');
            assert.equal(inserted.lng, fetched.lng, 'Fetched <geolocation.lng> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted = {
                city: 'Sombor',
                lat: '112',
                lng: '998',
            };

            const id = await service.create(inserted);
            const query = { city: 'Sombor' };
            const fetched = await service.findOne(query);

            assert.equal(inserted.city, fetched.city, 'Fetched <geolocation.city> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };

            const id = await service.create(inserted);
            const query = {
                $or: [
                    { lat: { $gt: 1111 } },
                    { lng: 997 },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.city, fetched.city, 'Fetched <geolocation.city> should BE same as inserted one');
            assert.equal(inserted.lng, fetched.lng, 'Fetched <geolocation.lng> should BE same as inserted one');
            assert.equal(inserted.lat, fetched.lat, 'Fetched <geolocation.lat> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };

            const id = await service.create(inserted);
            const query = {
                $and: [
                    { lat: { $gt: 111 } },
                    { lng: 997 },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.city, fetched.city, 'Fetched <geolocation.city> should BE same as inserted one');
            assert.equal(inserted.lng, fetched.lng, 'Fetched <geolocation.lng> should BE same as inserted one');
            assert.equal(inserted.lat, fetched.lat, 'Fetched <geolocation.lat> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should NOT FIND_ONE by FIELD object in database', async () => {
        try {
            const query = { city: 'Neki Grad' };
            const fetched = await service.findOne(query);

            assert.equal(fetched, null, 'Fetched <geolocation> should NOT be found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL object in database', async () => {
        try {
            const fetched = await service.find({});
            let size = 0;
            fetched.forEach(() => {
                size += 1;
            });
            assert.equal(fetched.length, size, 'Fetched <all geolocation> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted = {
                city: 'Novi Beograd',
                lat: '116',
                lng: '994',
            };
            const id = await service.create(inserted);
            const query = ({ }, { lat: { $gt: 112 } });
            const fetched = await service.find(query);
            let size = 0;
            fetched.forEach((el) => {
                if (el.lat > 112) size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection geolocation> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                city: 'Subotica',
                lat: '114',
                lng: '996',
            };

            const id = await service.create(inserted);
            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <geolocation> should NOT be same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('update', async () => {
        const inserted = {
            city: 'Subotica',
            lat: '114',
            lng: '996',
        };

        const id = await service.create(inserted);
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

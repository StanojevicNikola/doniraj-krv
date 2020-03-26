const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const serviceTime = app.container.resolve('timeService');

const service = app.container.resolve('placeService');
const serviceRef = app.container.resolve('geolocationService');

describe('Event service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa1',
                name: 'Ime1',
                description: 'Description1',
                workingHours: '10',
                date: serviceTime.getTimeWithOffset(10, '+'),
                isStatic: true,
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            assert.equal(inserted.address, fetched.address, 'Fetched <place.address> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <place.name> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <place.description> should BE same as inserted one');
            assert.equal(inserted.workingHours, fetched.workingHours, 'Fetched <place.workingHours> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.isStatic, fetched.isStatic, 'Fetched <place.isStatic> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <place.geolocation> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Sombor',
                lat: '112',
                lng: '998',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa2',
                name: 'Ime2',
                description: 'Description2',
                workingHours: '20',
                date: serviceTime.getTimeWithOffset(20, '+'),
                isStatic: true,
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = { address: 'Adresa2' };
            const fetched = await service.findOne(query);

            assert.equal(inserted.address, fetched.address, 'Fetched <place.address> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <place.name> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <place.description> should BE same as inserted one');
            assert.equal(inserted.workingHours, fetched.workingHours, 'Fetched <place.workingHours> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.isStatic, fetched.isStatic, 'Fetched <place.isStatic> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <place.geolocation> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa3',
                name: 'Ime3',
                description: 'Description3',
                workingHours: '30',
                date: serviceTime.getTimeWithOffset(30, '+'),
                isStatic: true,
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = {
                $or: [
                    { name: 'Ime3' },
                    { workingHours: '20' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.address, fetched.address, 'Fetched <place.address> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <place.name> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <place.description> should BE same as inserted one');
            assert.equal(inserted.workingHours, fetched.workingHours, 'Fetched <place.workingHours> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.isStatic, fetched.isStatic, 'Fetched <place.isStatic> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <place.geolocation> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Novi Becej',
                lat: '114',
                lng: '996',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa4',
                name: 'Ime4',
                description: 'Description4',
                workingHours: '40',
                date: serviceTime.getTimeWithOffset(40, '+'),
                isStatic: true,
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = {
                $and: [
                    { name: 'Ime4' },
                    { workingHours: '40' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.address, fetched.address, 'Fetched <place.address> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <place.name> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <place.description> should BE same as inserted one');
            assert.equal(inserted.workingHours, fetched.workingHours, 'Fetched <place.workingHours> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.isStatic, fetched.isStatic, 'Fetched <place.isStatic> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <place.geolocation> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });


    it('Should NOT FIND_ONE by FIELD object in database', async () => {
        try {
            const query = { address: 'Adresa4' };
            const fetched = await service.findOne(query);

            assert.equal(fetched, null, 'Fetched <place> should NOT be found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Novi Beograd',
                lat: '116',
                lng: '994',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa4',
                name: 'Ime6',
                description: 'Description4',
                workingHours: '60',
                date: serviceTime.getTimeWithOffset(60, '+'),
                isStatic: false,
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = ({ }, {
                $or: [{
                    address: 'Adresa4',
                    workingHours: { $gt: 50 },
                }],
            });
            const fetched = await service.find(query);

            let size = 0;
            fetched.forEach((el) => {
                if (el.address === 'Adresa4' || parseInt(el.workingHours, 10) > 50) size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection place> should BE found');
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

            assert.equal(fetched.length, size, 'Fetched <all place> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Novi Grad',
                lat: '115',
                lng: '995',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                address: 'Adresa6',
                name: 'Ime6',
                description: 'Description7',
                workingHours: '70',
                date: serviceTime.getTimeWithOffset(70, '+'),
                isStatic: false,
                geolocation: {
                    _id: id_ref,
                },
            };

            const id = await service.create(inserted);
            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <place> should NOT be same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    afterEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.drop();
        await storage.disconnect();
    });
});

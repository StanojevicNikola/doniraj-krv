const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const serviceTime = app.container.resolve('timeService');

const service = app.container.resolve('eventService');
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
                title: 'Title1',
                description: 'Description1',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '10.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            assert.equal(inserted.title, fetched.title, 'Fetched <event.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <event.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.hour, fetched.hour, 'Fetched <event.hour> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <event.geolocation> should BE same as inserted one');
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
                title: 'Title2',
                description: 'Description2',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '11.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = { title: 'Title2' };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <event.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <event.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.hour, fetched.hour, 'Fetched <event.hour> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <event.geolocation> should BE same as inserted one');
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
                title: 'Title3',
                description: 'Description3',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '12.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = {
                $or: [
                    { description: 'Description3' },
                    { geolocation: id_ref },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <event.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <event.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.hour, fetched.hour, 'Fetched <event.hour> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <event.geolocation> should BE same as inserted one');
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
                title: 'Title4',
                description: 'Description4',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '13.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = {
                $and: [
                    { title: 'Title4' },
                    { description: 'Description4' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <event.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <event.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <event.date> should BE same as inserted one');
            assert.equal(inserted.hour, fetched.hour, 'Fetched <event.hour> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation._id, fetched.geolocation._id, 'Fetched <event.geolocation> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should NOT FIND_ONE by FIELD object in database', async () => {
        try {
            const query = { title: 'Title5' };
            const fetched = await service.findOne(query);

            assert.equal(fetched, null, 'Fetched <event> should NOT be found');
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
                title: 'Title6',
                description: 'Description4',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '15.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };
            const id = await service.create(inserted);
            const query = ({ }, { description: 'Description4' });
            const fetched = await service.find(query);

            let size = 0;
            fetched.forEach((el) => {
                if (el.description === 'Description4') size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection event> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should UPDATE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                title: 'Title10',
                description: 'Description10',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '17.00 h',
            };
            const id = await service.create(inserted);

            const update_id = { _id: id };
            const updated = { description: 'Decription11', hour: '19.00 h' };
            await service.updateOne(update_id, updated);

            const fetched = await service.findById(id);

            assert.equal(fetched.description, 'Decription11', '<Event> should BE updated with <description>');
            assert.equal(fetched.hour, '19.00 h', '<Event> should BE updated with <hour>');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted_ref = {
                city: 'Vracar',
                lat: '115',
                lng: '995',
            };
            const id_ref = await serviceRef.create(inserted_ref);

            const inserted = {
                title: 'Title5',
                description: 'Description5',
                date: serviceTime.getTimeWithOffset(10, '+'),
                hour: '14.00 h',
                geolocation: {
                    _id: id_ref,
                },
            };

            const id = await service.create(inserted);
            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <event> should NOT be same as inserted one');
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

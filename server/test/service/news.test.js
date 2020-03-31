const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const serviceTime = app.container.resolve('timeService');

const service = app.container.resolve('newsService');

describe('News service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted = {
                title: 'Title1',
                description: 'Description1',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            assert.equal(inserted.title, fetched.title, 'Fetched <news.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <news.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <news.date> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted = {
                title: 'Title2',
                description: 'Description2',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);
            const query = { title: 'Title2' };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <news.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <news.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <news.date> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted = {
                title: 'Title3',
                description: 'Description3',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);
            const query = {
                $or: [
                    { title: 'Title3' },
                    { description: 'Description2' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <news.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <news.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <news.date> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted = {
                title: 'Title4',
                description: 'Description4',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);
            const query = {
                $and: [
                    { title: 'Title4' },
                    { description: 'Description4' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.title, fetched.title, 'Fetched <news.title> should BE same as inserted one');
            assert.equal(inserted.description, fetched.description, 'Fetched <news.description> should BE same as inserted one');
            // assert.equal(inserted.date, fetched.date, 'Fetched <news.date> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should NOT FIND_ONE by FIELD object in database', async () => {
        try {
            const query = { title: 'Title5' };
            const fetched = await service.findOne(query);

            assert.equal(fetched, null, 'Fetched <news> should NOT be found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted = {
                title: 'Title6',
                description: 'Description4',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);
            const query = ({ }, { description: 'Description4' });
            const fetched = await service.find(query);

            let size = 0;
            fetched.forEach((el) => {
                if (el.description === 'Description4') size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection news> should BE found');
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
            };
            const id = await service.create(inserted);

            const update_id = { _id: id };
            const updated = { title: 'Title10', description: 'Description10' };
            await service.updateOne(update_id, updated);

            const fetched = await service.findById(id);

            assert.equal(fetched.title, 'Title10', '<News> should BE updated with <title>');
            assert.equal(fetched.description, 'Description10', '<News> should BE updated with <description>');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                title: 'Title5',
                description: 'Description5',
                date: serviceTime.getTimeWithOffset(10, '+'),
            };

            const id = await service.create(inserted);
            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <news> should NOT be same as inserted one');
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

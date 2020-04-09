const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const config = require('../../config');

const service = app.container.resolve('bloodGroupService');

describe('Blood group service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted = {
                groupType: 'AAA+',
            };

            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            assert.equal(inserted.groupType, fetched.groupType, 'Fetched <groupType> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND COMPATABLE by SEARCH_FOR object in database', async () => {
        try {
            const array_all = config.bloodGroups.all;
            const fetched_all = await service.findCompatible('ALL', ['A+', 'B+']);
            const array_groups = ['A+', 'B+'];
            const fetched_groups = await service.findCompatible('SPECIFIC', ['A+', 'B+']);
            const a_plus = new Set(config.bloodGroups.compatibleBloodGroups['A+']);
            const a_minus = new Set(config.bloodGroups.compatibleBloodGroups['A-']);
            const array_compatible = Array.from(new Set(a_plus, a_minus));
            const fetched_compatible = await service.findCompatible('COMPATIBLE', ['A+', 'A-']);

            assert.deepEqual(fetched_all, array_all, 'Fetched <all groupTypes> should BE same as <all inserted>');
            assert.deepEqual(fetched_groups, array_groups, 'Fetched <groupTypes> should BE same as <param groups>');
            assert.deepEqual(fetched_compatible, array_compatible, 'Fetched <groupTypes> should BE same as <param compatible>');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted = {
                groupType: 'XXX+',
            };
            const id = await service.create(inserted);
            const query = ({ }, { groupType: { $ne: 'XXX+' } });
            const fetched = await service.find(query);
            let size = 0;
            fetched.forEach((el) => {
                if (el.groupType !== 'XXX+') size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection groupTypes> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should UPDATE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                groupType: 'CCC+',
            };
            const id = await service.create(inserted);

            const update_id = { _id: id };
            const updated = { groupType: 'DDD+' };
            await service.updateOne(update_id, updated);

            const fetched = await service.findById(id);

            assert.equal(fetched.groupType, 'DDD+', '<Blood group> should BE updated with <group type>');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                groupType: 'WWW+',
            };

            const id = await service.create(inserted);
            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <groupType> should NOT be same as inserted one');
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

const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const models = require('../../source/models/user');

describe('Storage service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        const placeData = {
            city: 'Jagodina',
            lat: '111',
            lng: '999',
        };
        const bloodGroupData = {
            groupType: 'AAA+',
        };
        const placeService = app.container.resolve('placeService');
        const bloodGroupService = app.container.resolve('bloodGroupService');

        const storageService = app.container.resolve('storageService');
        try {
            const place = await placeService.create(placeData);
            const blood = await bloodGroupService.create(bloodGroupData);
            const amount = 10;

            const storageId = await storageService.create({
                place, blood, amount,
            });
            const storage = await storageService.findById(storageId);
            delete storage.createdAt;
            delete storage.updatedAt;
            delete storage.__v;
            delete storage._id;

            assert.deepEqual({
                place, blood, amount,
            }, storage);
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should pass updateBlood', async () => {
        const placeData = {
            city: 'Jagodina',
            lat: '111',
            lng: '999',
        };
        const bloodGroupData = {
            groupType: 'AAA+',
        };
        const placeService = app.container.resolve('placeService');
        const storageService = app.container.resolve('storageService');
        const bloodGroupService = app.container.resolve('bloodGroupService');

        try {
            const place = await placeService.create(placeData);
            const blood = await bloodGroupService.create(bloodGroupData);
            const amount = 10;
            const diff = 5;

            const storageId = await storageService.create({
                place, blood, amount,
            });

            await storageService.updateBlood(place, blood, diff);

            const storageEntry = await storageService.findById(storageId);
            delete storageEntry.createdAt;
            delete storageEntry.updatedAt;
            delete storageEntry.__v;
            delete storageEntry._id;

            assert.deepEqual({ place, blood, amount: amount + diff }, storageEntry);
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

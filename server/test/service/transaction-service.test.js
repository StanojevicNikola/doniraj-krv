const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const models = require('../../source/models/user');

describe('Transaction service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        const userData = {
            email: 'email1@gmail.com',
            name: 'name1',
            username: 'username1',
            password: 'password1',
        };
        const placeData = {
            city: 'Jagodina',
            lat: '111',
            lng: '999',
        };
        const bloodGroupData = {
            groupType: 'AAA+',
        };
        const placeService = app.container.resolve('placeService');
        const userService = app.container.resolve('userService');
        const bloodGroupService = app.container.resolve('bloodGroupService');

        const transactionService = app.container.resolve('transactionService');
        try {
            const place = await placeService.create(placeData);
            const blood = await bloodGroupService.create(bloodGroupData);
            const user = await userService.create(userData);
            const amount = 10;
            const date = new Date();

            const transactionId = await transactionService.create({
                place, user, blood, amount, date,
            });
            const transaction = await transactionService.findById(transactionId);
            delete transaction.createdAt;
            delete transaction.updatedAt;
            delete transaction.__v;
            delete transaction._id;

            assert.deepEqual({
                place, user, blood, amount, date,
            }, transaction);
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

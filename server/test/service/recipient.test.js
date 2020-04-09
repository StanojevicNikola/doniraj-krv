const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');

const serviceTime = app.container.resolve('timeService');

const service = app.container.resolve('recipientService');
const serviceRefBlood = app.container.resolve('bloodGroupService');
const serviceRefUser = app.container.resolve('userService');
const serviceRefGeolocation = app.container.resolve('geolocationService');
const serviceRefDonor = app.container.resolve('donorService');

describe('Recepient service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted_refBlood = {
                groupType: 'A+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refGeolocation = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refUser = {
                blood: 'email1@gmail.com',
                name: 'name1',
                username: 'username1',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id_refUser,
                },
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const inserted = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            const update_id = { _id: id_refUser };
            const updated = { donor: id_refDonor, recipient: id };
            await serviceRefUser.updateOne(update_id, updated);

            assert.deepEqual(inserted.blood._id, fetched.blood._id, 'Fetched <recipient.blood> should BE same as inserted one');
            assert.deepEqual(inserted.user._id, fetched.user._id, 'Fetched <recipient.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted_refBlood = {
                groupType: 'A+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refGeolocation = {
                city: 'Cuprija',
                lat: '112',
                lng: '998',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refUser = {
                blood: 'email2@gmail.com',
                name: 'name2',
                username: 'username2',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id_refUser,
                },
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const inserted = {
                blood: id_refBlood,
                user: id_refUser,
            };
            const id = await service.create(inserted);

            const update_id = { _id: id_refUser };
            const updated = { donor: id_refDonor, recipient: id };
            await serviceRefUser.updateOne(update_id, updated);

            const query = { blood: id_refBlood };
            const fetched = await service.findOne(query);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <recipient.blood> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <recipient.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted_refBlood = {
                groupType: 'A-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refGeolocation = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refUser = {
                blood: 'email3@gmail.com',
                name: 'name2',
                username: 'username3',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id_refUser,
                },
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const inserted = {
                blood: id_refBlood,
                user: id_refUser,
            };
            const id = await service.create(inserted);

            const update_id = { _id: id_refUser };
            const updated = { donor: id_refDonor, recipient: id };
            await serviceRefUser.updateOne(update_id, updated);

            const query = {
                $or: [
                    { blood: id_refBlood },
                    { user: id_refUser },
                ],
            };
            const fetched = await service.findOne(query);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <recipient.blood> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <recipient.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted_refBlood = {
                groupType: 'B-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refGeolocation = {
                city: 'Novi Grad',
                lat: '114',
                lng: '996',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refUser = {
                blood: 'email4@gmail.com',
                name: 'name3',
                username: 'username4',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id_refUser,
                },
                lastDonation: serviceTime.getTimeWithOffset(20, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const inserted = {
                blood: id_refBlood,
                user: id_refUser,
            };
            const id = await service.create(inserted);

            const update_id = { _id: id_refUser };
            const updated = { donor: id_refDonor, recipient: id };
            await serviceRefUser.updateOne(update_id, updated);

            const query = {
                $and: [
                    { blood: id_refBlood },
                    { user: id_refUser },
                ],
            };
            const fetched = await service.findOne(query);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <recipient.blood> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <recipient.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted_refBlood = {
                groupType: 'O+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refGeolocation = {
                city: 'Pozarevac',
                lat: '115',
                lng: '995',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refUser = {
                blood: 'email5@gmail.com',
                name: 'name5',
                username: 'username5',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id_refUser,
                },
                lastDonation: serviceTime.getTimeWithOffset(20, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const inserted = {
                blood: id_refBlood,
                user: id_refUser,
            };
            const id = await service.create(inserted);

            const update_id = { _id: id_refUser };
            const updated = { donor: id_refDonor, recipient: id };
            await serviceRefUser.updateOne(update_id, updated);

            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <recipient> should NOT be same as inserted one');
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

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

describe('Event service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted = {
                email: 'email1@gmail.com',
                name: 'name1',
                username: 'username1',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);
            const fetched = await service.findById(id);

            const inserted_refBlood = {
                groupType: 'A+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            assert.equal(inserted.email, fetched.email, 'Fetched <user.email> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <user.name> should BE same as inserted one');
            assert.equal(inserted.username, fetched.username, 'Fetched <user.username> should BE same as inserted one');
            assert.deepEqual(inserted.donor, fetched.donor, 'Fetched <user.donor> should BE same as inserted one');
            assert.deepEqual(inserted.recipient, fetched.recipient, 'Fetched <user.recipient> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted = {
                email: 'email2@gmail.com',
                name: 'name2',
                username: 'username2',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);

            const inserted_refBlood = {
                groupType: 'B+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Cuprija',
                lat: '112',
                lng: '998',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(20, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            const query = { email: 'email2@gmail.com' };
            const fetched = await service.findOne(query);

            assert.equal(inserted.email, fetched.email, 'Fetched <user.email> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <user.name> should BE same as inserted one');
            assert.equal(inserted.username, fetched.username, 'Fetched <user.username> should BE same as inserted one');
            assert.deepEqual(inserted.donor, fetched.donor, 'Fetched <user.donor> should BE same as inserted one');
            assert.deepEqual(inserted.recipient, fetched.recipient, 'Fetched <user.recipient> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted = {
                email: 'email3@gmail.com',
                name: 'name3',
                username: 'username3',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);

            const inserted_refBlood = {
                groupType: 'AB+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(30, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            const query = {
                $or: [
                    { email: 'email3@gmail.com' },
                    { name: 'name2' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.email, fetched.email, 'Fetched <user.email> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <user.name> should BE same as inserted one');
            assert.equal(inserted.username, fetched.username, 'Fetched <user.username> should BE same as inserted one');
            assert.deepEqual(inserted.donor, fetched.donor, 'Fetched <user.donor> should BE same as inserted one');
            assert.deepEqual(inserted.recipient, fetched.recipient, 'Fetched <user.recipient> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted = {
                email: 'email4@gmail.com',
                name: 'name3',
                username: 'username4',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);

            const inserted_refBlood = {
                groupType: 'AB-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Novi Grad',
                lat: '114',
                lng: '996',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(30, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            const query = {
                $and: [
                    { email: 'email4@gmail.com' },
                    { name: 'name3' },
                ],
            };
            const fetched = await service.findOne(query);

            assert.equal(inserted.email, fetched.email, 'Fetched <user.email> should BE same as inserted one');
            assert.equal(inserted.name, fetched.name, 'Fetched <user.name> should BE same as inserted one');
            assert.equal(inserted.username, fetched.username, 'Fetched <user.username> should BE same as inserted one');
            assert.deepEqual(inserted.donor, fetched.donor, 'Fetched <user.donor> should BE same as inserted one');
            assert.deepEqual(inserted.recipient, fetched.recipient, 'Fetched <user.recipient> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted = {
                email: 'email5@gmail.com',
                name: 'name3',
                username: 'username5',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);

            const inserted_refBlood = {
                groupType: 'B-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Novi Becej',
                lat: '113',
                lng: '997',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(30, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            const query = ({ }, { name: 'name3' });
            const fetched = await service.find(query);

            let size = 0;
            fetched.forEach((el) => {
                if (el.name === 'name3') size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection user> should BE found');
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

            assert.equal(fetched.length, size, 'Fetched <all user> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted = {
                email: 'email6@gmail.com',
                name: 'name5',
                username: 'username7',
                isAdmin: false,
                isActive: true,
            };
            const id = await service.create(inserted);

            const inserted_refBlood = {
                groupType: 'O-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Smederevo',
                lat: '114',
                lng: '996',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted_refDonor = {
                blood: {
                    _id: id_refBlood,
                },
                geolocation: {
                    _id: id_refGeolocation,
                },
                user: {
                    _id: id,
                },
                lastDonation: serviceTime.getTimeWithOffset(350, '+'),
            };
            const id_refDonor = await serviceRefDonor.create(inserted_refDonor);

            const update_id = { _id: id };
            const updated = { donor: id_refDonor, recipient: id_refRecipient };
            await service.updateOne(update_id, updated);

            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <user> should NOT be same as inserted one');
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

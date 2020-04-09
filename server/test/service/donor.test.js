const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');

const app = require('../test-app');
const models = require('../../source/models/user');

const serviceTime = app.container.resolve('timeService');

const service = app.container.resolve('donorService');
const serviceRefBlood = app.container.resolve('bloodGroupService');
const serviceRefRecipient = app.container.resolve('recipientService');
const serviceRefGeolocation = app.container.resolve('geolocationService');
const serviceRefUser = app.container.resolve('userService');

describe('Donor service test', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should CREATE object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email1@gmail.com',
                name: 'name1',
                username: 'username1',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'A+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Jagodina',
                lat: '111',
                lng: '999',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const fetched = await service.findById(id);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetched.geolocation, 'Fetched <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <donor.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by FIELD object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email2@gmail.com',
                name: 'name2',
                username: 'username2',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'A-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Cuprija',
                lat: '112',
                lng: '998',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const queryBlood = { blood: id_refBlood };
            const fetchedBlood = await service.findOne(queryBlood);

            assert.deepEqual(inserted.blood, fetchedBlood.blood, 'Fetched <by blood> <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetchedBlood.geolocation, 'Fetched <by blood> <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetchedBlood.user, 'Fetched <by blood> <donor.user> should BE same as inserted one');

            const queryGeolocation = { geolocation: id_refGeolocation };
            const fetchedGeolocation = await service.findOne(queryGeolocation);

            assert.deepEqual(inserted.blood, fetchedGeolocation.blood, 'Fetched <by geolocation> <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetchedGeolocation.geolocation, 'Fetched <by geolocation> <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetchedGeolocation.user, 'Fetched <by geolocation> <donor.user> should BE same as inserted one');

            const queryUser = { user: id_refUser };
            const fetchedUser = await service.findOne(queryUser);

            assert.deepEqual(inserted.blood, fetchedUser.blood, 'Fetched <by user> <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetchedUser.geolocation, 'Fetched <by user> <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetchedUser.user, 'Fetched <by user> <donor.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by OR object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email2@gmail.com',
                name: 'name2',
                username: 'username2',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'A-',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Cuprija',
                lat: '112',
                lng: '998',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const query = {
                $or: [
                    { blood: id_refBlood },
                    { geolocation: id_refGeolocation },
                ],
            };
            const fetched = await service.findOne(query);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetched.geolocation, 'Fetched <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <donor.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ONE by AND object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email3@gmail.com',
                name: 'name3',
                username: 'username3',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'B+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Novi Sad',
                lat: '113',
                lng: '997',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const query = {
                $and: [
                    { blood: id_refBlood },
                    { geolocation: id_refGeolocation },
                ],
            };
            const fetched = await service.findOne(query);

            assert.deepEqual(inserted.blood, fetched.blood, 'Fetched <donor.blood> should BE same as inserted one');
            assert.deepEqual(inserted.geolocation, fetched.geolocation, 'Fetched <donor.geolocation> should BE same as inserted one');
            assert.deepEqual(inserted.user, fetched.user, 'Fetched <donor.user> should BE same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND_ALL by PROJECTION object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email4@gmail.com',
                name: 'name3',
                username: 'username4',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'AB+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Novi Grad',
                lat: '114',
                lng: '996',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const query = ({ }, { 'blood.id_refBlood': id_refBlood });
            const fetched = await service.find(query);

            let size = 0;
            fetched.forEach((el) => {
                if (el.blood.id_refBlood === id_refBlood) size += 1;
            });

            assert.equal(fetched.length, size, 'Fetched <all by projection donors> should BE found');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should REMOVE_ONE by ID object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email5@gmail.com',
                name: 'name3',
                username: 'username4',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'O+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Aleksinac',
                lat: '115',
                lng: '995',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const deleted = await service.removeById(id);

            assert.notEqual(deleted, null, 'Deleted <donor> should NOT be same as inserted one');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should UPDATE_ONE by ID object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email5@gmail.com',
                name: 'name3',
                username: 'username4',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'O+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refBlood_update = {
                groupType: 'O-',
            };
            const id_refBlood_update = await serviceRefBlood.create(inserted_refBlood_update);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Aleksinac',
                lat: '115',
                lng: '995',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const update_id = { _id: id };
            const updated = { blood: id_refBlood_update };
            await service.updateOne(update_id, updated);

            const fetched = await service.findById(id);

            assert.deepEqual(fetched.blood, id_refBlood_update, '<Donor> should BE updated with <blood group>');
        } catch (err) {
            assert(false, err);
        }
    });

    it('Should FIND ELIGIBLE DONORS object in database', async () => {
        try {
            const inserted_refUser = {
                email: 'email7@gmail.com',
                name: 'name7',
                username: 'username7',
            };
            const id_refUser = await serviceRefUser.create(inserted_refUser);

            const inserted_refBlood = {
                groupType: 'A+',
            };
            const id_refBlood = await serviceRefBlood.create(inserted_refBlood);

            const inserted_refRecipient = {
                blood: {
                    _id: id_refBlood,
                },
                user: {
                    _id: id_refUser,
                },
            };
            const id_refRecipient = await serviceRefRecipient.create(inserted_refRecipient);

            const inserted_refGeolocation = {
                city: 'Cuprija',
                lat: '117',
                lng: '993',
            };
            const id_refGeolocation = await serviceRefGeolocation.create(inserted_refGeolocation);

            const inserted = {
                blood: id_refBlood,
                geolocation: id_refGeolocation,
                user: id_refUser,
                lastDonation: serviceTime.getTimeWithOffset(10, '+'),
            };
            const id = await service.create(inserted);

            const update_id_user = { _id: id_refUser };
            const updated_user = { donor: id, recipient: id_refRecipient };
            await serviceRefUser.updateOne(update_id_user, updated_user);

            const groups = ['A+', 'A-'];
            const donors = await service.findEligibleDonors([id_refGeolocation], groups);
            const true_size = 1;

            // function < findEligibleDonors(locations, groups) > NOT WORKING, return NULL
            assert.equal(donors.length, true_size, 'Should <find eligible donors> <by locations and blood groups>');
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

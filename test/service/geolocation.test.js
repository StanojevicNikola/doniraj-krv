const {
    describe, it, beforeEach, afterEach,
} = require('mocha');

const assert = require('assert');
const mongoose = require('mongoose');

const app = require('../test-app');

/**
 * What should be tested
 * create
 * find
 * find by id
 * find non existent
 * additional functions from specific service
 */

describe('Create tag creation claim use case', () => {
    beforeEach(async () => {
        const storage = app.container.resolve('storage');
        await storage.connect();
    });

    it('Should create tag creation claim object in database', async () => {
        try {
            const geolocationService = await app.container.resolve('geolocationService');
            const geolocation = {
                city: 'Jagodina',
                lat: '123',
                lng: '233',
            };
            const geoId = await geolocationService.create(geolocation);
            const fetchedGeolocation = await geolocationService.findById(geoId);
            geolocation._id = geoId;
            console.log(fetchedGeolocation);
            assert.deepEqual(geoId, fetchedGeolocation._id, 'Fetched geolocation id should be same as inserted one');
            assert.equal(geolocation.lat, fetchedGeolocation.lat, 'Fetched geolocation lat should be same as inserted one');
            assert.equal(geolocation.lng, fetchedGeolocation.lng, 'Fetched geolocation lng should be same as inserted one');
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

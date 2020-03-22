const utils = require('../source/utils');

class MockScript {
    constructor({
        logger, config, bloodGroupService, geolocationService, userController,
    }) {
        this.logger = logger;
        this.config = config;
        this.bloodGroupService = bloodGroupService;
        this.geolocationService = geolocationService;
        this.userController = userController;
    }

    async _prepareGeolocations() {
        const geolocation1 = {
            city: 'Belgrade',
            lat: '44.818611',
            lng: '20.468056',
        };
        const geolocation2 = {
            city: 'Cuprija',
            lat: '43.928388',
            lng: '21.374491',
        };
        const geolocation3 = {
            city: 'Nis',
            lat: '43.323356',
            lng: '21.901779',
        };
        const geolocations = [geolocation1, geolocation2, geolocation3];

        const ids = [];
        for (const g of geolocations) {
            // eslint-disable-next-line no-await-in-loop
            const id = await this.geolocationService.create(g);
            ids.push(id);
        }

        return ids;
    }

    async _prepareBloodGroups() {
        const groups = [];
        for (const g of this.config.bloodGroups.all) {
            groups.push({ groupType: g });
        }

        const ids = [];
        for (const g of groups) {
            // eslint-disable-next-line no-await-in-loop
            const id = await this.bloodGroupService.create(g);
            ids.push(id);
        }

        return ids;
    }

    async _prepareUsers(geolocations, bloodGroups) {
        const eligibleDonor1 = {
            userData: {
                email: 'dimitrije.misa@gmail.com',
            },
            role: 'DONOR',
            roleData: {
                geolocation: geolocations[0],
                bloodGroup: bloodGroups[0],
                lastDonation: new Date().toISOString(),
            },
        };

        const wrongdate = new Date();
        wrongdate.setDate(wrongdate.getDate() - 91);
        const notEligibleDonor1 = {
            userData: {
                email: 'dimitrije.sistem@gmail.com',
            },
            role: 'DONOR',
            roleData: {
                geolocation: geolocations[0],
                bloodGroup: bloodGroups[0],
                lastDonation: wrongdate,
            },
        };

        const okdate = new Date();
        okdate.setDate(okdate.getDate() - 30);
        const eligibleDonor2 = {
            userData: {
                email: 'dimitrije.systempro@gmail.com',
            },
            role: 'DONOR',
            roleData: {
                geolocation: geolocations[0],
                bloodGroup: bloodGroups[1],
                lastDonation: okdate,
            },
        };


        const receiver = {
            userData: {
                email: 'akinovak@gmail.com',
            },
            role: 'RECEIVER',
            roleData: {
                bloodGroup: bloodGroups[1],
            },
        };

        const userIds = [];
        const d1 = await this.userController.createUser(eligibleDonor1);
        const d2 = await this.userController.createUser(eligibleDonor2);
        const d3 = await this.userController.createUser(notEligibleDonor1);
        const r1 = await this.userController.createUser(receiver);

        userIds.push([d1, d2, d3, r1]);
        return userIds;
    }

    async prepareDatabase() {
        const geolocationIds = await this._prepareGeolocations();
        const bloodGroupIds = await this._prepareBloodGroups();
        const userIds = await this._prepareUsers(geolocationIds, bloodGroupIds);

        this.logger.info(`Created locations: ${geolocationIds}`);
        this.logger.info(`Created blood groups: ${bloodGroupIds}`);
        this.logger.info(`Created users: ${userIds}`);
    }
}

module.exports = MockScript;

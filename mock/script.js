class MockScript {
    constructor({
        // eslint-disable-next-line max-len
        logger, config, placeService, geoService, userService, requestService, donorService, receiverService, bloodGroupService, emailService, geolocationService,
    }) {
        this.logger = logger;
        this.config = config;
        this.placeService = placeService;
        this.geoService = geoService;
        this.userService = userService;
        this.donorService = donorService;
        this.receiverService = receiverService;
        this.bloodGroupService = bloodGroupService;
        this.requestService = requestService;
        this.emailService = emailService;
        this.geolocationService = geolocationService;
    }

    async prepareDatabase() {
        const bloodG = {
            groupType: 'A+',
        };
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
        const g1 = await this.geolocationService.create(geolocation1);
        const g2 = await this.geolocationService.create(geolocation2);
        const g3 = await this.geolocationService.create(geolocation3);
        const groupId = await this.bloodGroupService.create(bloodG);
        const donor1 = {
            bloodGroup: groupId,
            geolocation: g1,
            lastDonation: (new Date()).toISOString(),
        };
        const wrongdate = new Date();
        wrongdate.setDate(wrongdate.getDate() - 91);
        const donorNotEligible = {
            bloodGroup: groupId,
            geolocation: g1,
            lastDonation: wrongdate.toISOString(),
        };

        const okdate = new Date();
        okdate.setDate(okdate.getDate() - 30);
        const donorEligible = {
            bloodGroup: groupId,
            geolocation: g1,
            lastDonation: okdate.toISOString(),
        };

        const receiver1 = {
            bloodGroup: groupId,
        };
        const user1 = {
            email: 'dimitrije.misa@gmail.com',
        };
        const user2 = {
            email: 'akinovak@gmail.com',
        };
        const user3 = {
            email: 'dimitrije.systempro@gmail.com',
        };
        const user4 = {
            email: 'dimitrije.sistem@gmail.com',
        };
        donorNotEligible.user = await this.userService.create(user3);
        donorEligible.user = await this.userService.create(user4);
        donor1.user = await this.userService.create(user1);
        receiver1.user = await this.userService.create(user2);
        await this.donorService.create(donor1);
        await this.donorService.create(donorNotEligible);
        await this.donorService.create(donorEligible);
        await this.receiverService.create(receiver1);
    }
}

module.exports = MockScript;

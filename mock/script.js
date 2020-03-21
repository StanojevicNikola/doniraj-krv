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
        const receiver1 = {
            bloodGroup: groupId,
        };
        const user1 = {
            email: 'dimitrije.misa@gmail.com',
        };
        const user2 = {
            email: 'akinovak@gmail.com',
        };
        donor1.user = await this.userService.create(user1);
        receiver1.user = await this.userService.create(user2);
        await this.donorService.create(donor1);
        await this.receiverService.create(receiver1);
    }
}

module.exports = MockScript;

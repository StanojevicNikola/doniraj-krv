const utils = require('../utils');

class RequestController {
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

    async publishRequest(request) {
        const {
            radius, city, receiverId, groups,
        } = request;

        const geolocation = await this.geolocationService.findOne({ city });
        const requestId = await this.requestService
            .create({
                radius, geolocation: geolocation._id, receiver: receiverId, groups,
            });
        return this.notify(requestId);
    }

    async notify(requestId) {
        const request = await this.requestService.findById(requestId, ['geolocation', 'receiver']);
        const { lat, lng } = request.geolocation;
        const locations = await this.geoService
            .filterByRadius(lat, lng, request.radius);

        const cities = locations.map((l) => l._id);
        let donors;
        if (request.groups === 'ALL') {
            donors = await this.donorService.findEmailsByCityAndGroup(cities);
        } else {
            const groups = await this.bloodGroupService
                .findCompatible(request.receiver.bloodGroup);
            donors = await this.donorService.findEmailsByCityAndGroup(cities, groups);
        }

        for (const donor of donors) {
            const params = { name: donor.user.email };
            const options = { receiverEmail: donor.user.email, subject: 'Blood donation request' };
            // eslint-disable-next-line no-await-in-loop
            await this.emailService.handleEmail('request', params, options);
        }
        return donors;
    }
}

module.exports = RequestController;

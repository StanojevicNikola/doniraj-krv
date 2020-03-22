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
            radius, city, receiverId, searchFor, groups,
        } = request;

        const geolocation = await this.geolocationService.findOne({ city });
        const requestId = await this.requestService
            .create({
                radius, geolocation: geolocation._id, receiver: receiverId, groups, searchFor,
            });
        return this._notify(requestId);
    }

    async _notify(requestId) {
        const request = await this.requestService.findById(requestId, ['geolocation', 'receiver']);

        const { lat, lng } = request.geolocation;
        const locations = await this.geoService
            .filterByRadius(lat, lng, request.radius);
        const cities = utils.extract(locations, '_id');

        const { searchFor, groups } = request;

        const compatibleGroups = await this.bloodGroupService
            .findCompatible(searchFor, groups);

        const donors = await this.donorService.findEligibleDonors(cities, compatibleGroups);

        for (const donor of donors) {
            const params = { name: donor.user.email };
            const options = { receiverEmail: donor.user.email, subject: 'Blood donation request' };
            // eslint-disable-next-line no-await-in-loop
            await this.emailService.sendEmail('request', params, options);
        }
        return donors;
    }
}

module.exports = RequestController;

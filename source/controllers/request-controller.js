const utils = require('../utils');

class RequestController {
    constructor({
        // eslint-disable-next-line max-len
        logger, config, placeService, geoService, userService, requestService, donorService, recipientService, bloodGroupService, emailService, geolocationService,
    }) {
        this.logger = logger;
        this.config = config;
        this.placeService = placeService;
        this.geoService = geoService;
        this.userService = userService;
        this.donorService = donorService;
        this.recipientService = recipientService;
        this.bloodGroupService = bloodGroupService;
        this.requestService = requestService;
        this.emailService = emailService;
        this.geolocationService = geolocationService;
    }

    async publishRequest(radius, city, recipient, queryType, groups, places) {
        const geolocation = await this.geolocationService.findOne({ city });
        const requestId = await this.requestService
            .create({
                radius,
                geolocation: geolocation._id,
                recipient,
                groups,
                queryType,
                places,
            });
        return this._notify(requestId);
    }

    async _notify(requestId) {
        const request = await this.requestService.findById(requestId, ['geolocation', 'recipient', 'places']);

        const { lat, lng } = request.geolocation;
        const locations = await this.geoService
            .filterByRadius(lat, lng, request.radius);
        const cities = utils.extract(locations, '_id');

        const { queryType, groups, places } = request;

        const compatibleGroups = await this.bloodGroupService
            .findCompatible(queryType, groups);

        const donors = await this.donorService.findEligibleDonors(cities, compatibleGroups);

        const placesInfo = utils.extractMultiple(
            places, ['name', 'address', 'workingHours', 'date', 'isStatic'],
        );

        const promises = [];
        donors.forEach((donor) => {
            const params = { name: donor.user.name, places: utils.createHtmlList(placesInfo) };
            const options = {
                recipientEmail: donor.user.email,
                subject: 'Zahtev za donaciju krvi',
            };
            promises.push(this.emailService.sendEmail('request', params, options));
        });
        await Promise.all(promises);
        return donors;
    }
}

module.exports = RequestController;

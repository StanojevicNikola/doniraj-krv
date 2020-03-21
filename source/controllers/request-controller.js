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
                radius, geolocation: geolocation._id, receiverId, groups,
            });

        await this.notify(requestId);
    }

    async notify(requestId) {
        const request = await this.requestService.findById(requestId, ['geolocation', 'receiver']);
        const locations = this.geoService.filterByRadius(request.radius);
        let donors;
        if (request.groups === 'ALL') {
            donors = this.donorService.findEmailsByCityAndGroup(locations);
        } else {
            const groups = this.bloodGroupService.findCompatible(request.receiver.bloodGroup.type);
            donors = this.donorService.findEmailsByCityAndGroup(locations, groups);
        }
        await this.emailService.send(donors);
    }
}

module.exports = RequestController;

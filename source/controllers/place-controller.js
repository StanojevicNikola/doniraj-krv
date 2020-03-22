const utils = require('../utils');

class PlaceController {
    constructor({
        logger, config, placeService, geoService, geolocationService
    }) {
        this.logger = logger;
        this.config = config;
        this.placeService = placeService;
        this.geoService = geoService;
        this.geolocationService = geolocationService;
    }

    async find(request) {
        const { query, constraint } = request.body;

        const constraintKeys = Object.keys(constraint);
        let data = await this.placeService.find(query, ['geolocation']);
        if (constraintKeys.includes('distance')) {
            const remoteIP = utils.getIP(request);
            const { lat, lng } = await this.geoService.getCoords(remoteIP);

            data = await this.geoService.filterByRadius(lat, lng, constraint.distance);
        }

        return data;
    }

    async getCities() 
    {
        return this.geolocationService.find({});
    }

}

module.exports = PlaceController;

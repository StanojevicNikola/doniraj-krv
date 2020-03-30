const utils = require('../utils');

class PlaceController {
    constructor({
        logger, config, placeService, geoService,
    }) {
        this.logger = logger;
        this.config = config;
        this.placeService = placeService;
        this.geoService = geoService;
    }

    async find(request) {
        const { query, constraint } = request.body;

        const constraintKeys = Object.keys(constraint);
        let data = await this.placeService.find(query, ['geolocation']);
        let no_city_distance = 0;
        if (constraintKeys.includes('distance')) {
            const remoteIP = utils.getIP(request);
            const { lat, lng } = await this.geoService.getCoords(remoteIP);

            data = await this.geoService.filterByRadius(lat, lng, constraint.distance);
            if (data.length === 0) no_city_distance = 1;
        }

        if (constraintKeys.includes('distance') && no_city_distance) {
            throw Error('Ne postoji grad sa zadatom distancom!');
        }

        return data;
    }
}

module.exports = PlaceController;

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
        if (constraintKeys.includes('distance')) {
            const remoteIP = utils.getIP(request);
            const { lat, lng } = await this.geoService.getCoords(remoteIP);

            data = data.filter(
                (location) => {
                    const dist = this.geoService
                        .euclDistance(lat, lng, location.geolocation.lat, location.geolocation.lng);
                    return dist < constraint.distance;
                },
            );
        }

        return data;
    }
}

module.exports = PlaceController;

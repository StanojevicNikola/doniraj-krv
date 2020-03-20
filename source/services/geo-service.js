const geoip = require('geoip-lite');

/**
 * Encapsulates GeoService service operations
 */
class GeoService {
    constructor({ logger }) {
        this.logger = logger;
    }

    async getCoords(ip) {
        const geo = await geoip.lookup(ip);
        return { lat: geo.ll[0], lng: geo.ll[1] };
    }
}

module.exports = GeoService;

const geoip = require('geoip-lite');

/**
 * Encapsulates GeoService service operations
 */
class GeoService {
    constructor({ logger }) {
        this.logger = logger;
    }

    // eslint-disable-next-line class-methods-use-this
    async getCoords(ip) {
        const geo = await geoip.lookup(ip);
        return { lat: geo.ll[0], lng: geo.ll[1] };
    }
}

module.exports = GeoService;

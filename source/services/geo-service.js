const geoip = require('geoip-lite');

/**
 * Encapsulates GeoService service operations
 */
class GeoService {
    constructor({ logger, geolocationService }) {
        this.logger = logger;
        this.geolocationService = geolocationService;
    }

    async filterByRadius(lat, lng, radius) {
        const locations = await this.geolocationService.find({});

        return locations.filter(
            (l) => {
                const dist = this.euclDistance(lat, lng, l.lat, l.lng);
                return dist < radius;
            },
        );
    }

    async getPlacesInRadius(lat, lng, radius, places) {
        return places.filter(
            (place) => {
                const dist = this
                    .euclDistance(lat, lng, place.geolocation.lat, place.geolocation.lng);
                return dist < radius;
            },
        );
    }

    async getCoords(ip) {
        const geo = await geoip.lookup(ip);
        return { lat: geo.ll[0], lng: geo.ll[1] };
    }

    euclDistance(rawLat1, rawLon1, rawLat2, rawLon2) {
        // console.log(rawLat1, rawLon1, rawLat2, rawLon2);
        const lat1 = parseFloat(rawLat1);
        const lon1 = parseFloat(rawLon1);
        const lat2 = parseFloat(rawLat2);
        const lon2 = parseFloat(rawLon2);
        const R = 6378.137; // Radius of earth in KM
        const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
        const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180)
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d; // kilometers
    }
}

module.exports = GeoService;

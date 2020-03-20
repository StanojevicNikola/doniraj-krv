class Utils {
    static clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static getIP(request) {
        return '178.148.57.225';
        // return request.header('x-forwarded-for').split(',')[0]
        //         || request.connection.remoteAddress
        //         || request.socket.remoteAddress
        //         || (request.connection.socket ? request.connection.socket.remoteAddress : null);
    }

    // generally used geo measurement function
    static euclideanDistance(rawLat1, rawLon1, rawLat2, rawLon2) {
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

module.exports = Utils;

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

    static extract(arr, attr) {
        const result = arr.map((el) => el[attr]);
        return result;
    }
}

module.exports = Utils;

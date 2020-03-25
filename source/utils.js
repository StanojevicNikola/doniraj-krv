const sha3 = require('sha3');

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
        return arr.map((el) => el[attr]);
    }

    static hash(text, salt) {
        const instance = new sha3.SHA3(256);
        instance.update(text + salt);
        return instance.digest('hex');
    }
}

module.exports = Utils;

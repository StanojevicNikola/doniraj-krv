const sha3 = require('sha3');
const jwtDecode = require('jwt-decode');

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

    static extractMultiple(arr, attrs) {
        return arr.map((el) => {
            const tmp = {};
            attrs.forEach((attr) => {
                tmp[attr] = el[attr];
            });

            return tmp;
        });
    }

    static createHtmlList(arr) {
        let list = '<ul >';
        arr.forEach((el) => {
            let listItem = '<li style="padding-top: 5px">';
            listItem += '<ul style="list-style-type:none;">';
            listItem += `<li><b>Ime institucije:</b> ${el.name}</li>`;
            listItem += `<li><b>Adresa:</b> ${el.address}</li>`;
            listItem += `<li><b>Radno vreme:</b> ${el.workingHours}</li>`;
            if (!el.isStatic) listItem += `<li><b>Karavan je na lokaciji:</b> ${this.parseDate(el.date)}</li>`;
            listItem += '</ul>';
            listItem += '</li><br>';
            list += listItem;
        });
        list += '</ul>';

        return list;
    }

    static extractToken(req) {
        return req.headers.authorization.replace('Bearer ', '');
    }

    static parseDate(date) {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }

    static decodeToken(rawToken) {
        return jwtDecode(rawToken);
    }

    static hash(text, salt) {
        const instance = new sha3.SHA3(256);
        instance.update(text + salt);
        return instance.digest('hex');
    }
}

module.exports = Utils;

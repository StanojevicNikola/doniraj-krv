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
        let list = '<ul>';
        arr.forEach((el) => {
            let listItem = '<li style="padding-top: 5px">';
            listItem += '<ul>';
            listItem += `<li>Ime institucije: ${el.name}</li>`;
            listItem += `<li>Adresa: ${el.address}</li>`;
            listItem += `<li>Radno vreme: ${el.workingHours}</li>`;
            if (!el.isStatic) listItem += `<li>Karavan je na lokaciji: ${this.parseDate(el.date)}</li>`;
            listItem += '</ul>';
            listItem += '</li>';
            list += listItem;
        });
        list += '</ul>';

        return list;
    }

    static parseDate(date) {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }

    static hash(text, salt) {
        const instance = new sha3.SHA3(256);
        instance.update(text + salt);
        return instance.digest('hex');
    }
}

module.exports = Utils;

const utils = require('../../../../source/utils');
const config = require('../../../../config');

module.exports = [
    {
        username: 'adminko',
        email: 'admin@gmail.com',
        name: 'ADMIN',
        isAdmin: true,
        passwordHash: utils.hash('admin', config.salt),
    },
];

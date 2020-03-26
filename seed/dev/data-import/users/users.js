const ids = require('../../ids/ids');
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
    {
        _id: ids.user1_Id,
        donor: ids.donor1_Id,
        email: 'dimitrije.misa@foo.com',
        name: 'user1',
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user2_Id,
        donor: ids.donor2_Id,
        receiver: ids.receiver2_Id,
        email: 'dimitrije.sistem@foo.com',
        name: 'user2',
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user3_Id,
        donor: ids.donor3_Id,
        email: 'dimitrije.systempro@foo.com',
        name: 'user3',
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user4_Id,
        donor: ids.donor4_Id,
        receiver: ids.receiver4_Id,
        email: 'dimitrije.misa@foo.com',
        name: 'user4',
        passwordHash: utils.hash('user', config.salt),
    },
];

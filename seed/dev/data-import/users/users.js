const ids = require('../../ids/ids');
const utils = require('../../../../source/utils');
const config = require('../../../../config');

module.exports = [
    {
        username: 'adminko',
        email: 'admin@gmail.com',
        name: 'ADMIN',
        isAdmin: true,
        isActive: true,
        passwordHash: utils.hash('admin', config.salt),
    },
    {
        _id: ids.user1_Id,
        donor: ids.donor1_Id,
        email: 'dimitrije.misa@gmail.com',
        name: 'user1',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user2_Id,
        donor: ids.donor2_Id,
        recipient: ids.recipient2_Id,
        email: 'mail_2@foo.com',
        name: 'user2',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user3_Id,
        donor: ids.donor3_Id,
        email: 'mail_3@foo.com',
        name: 'user3',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user4_Id,
        donor: ids.donor4_Id,
        recipient: ids.recipient4_Id,
        email: 'mail_4@foo.com',
        name: 'user4',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user5_Id,
        donor: ids.donor5_Id,
        email: 'mail_5@foo.com',
        name: 'user5',
        isActive: false,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user6_Id,
        donor: ids.donor6_Id,
        email: 'mail_6@foo.com',
        name: 'user6',
        isActive: false,
        passwordHash: utils.hash('user', config.salt),
    },
];

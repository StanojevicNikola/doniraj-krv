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
        username: 'mica',
        roles: ['DONOR'],
        name: 'Dimitrije Antic',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user2_Id,
        recipient: ids.recipient2_Id,
        email: 'mail_2@foo.com',
        name: 'user2',
        username: 'user2',
        roles: ['RECIPIENT'],
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user3_Id,
        donor: ids.donor3_Id,
        username: 'akinovak',
        email: 'akinovak@gmail.com',
        name: 'Andrija Novakovic',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user4_Id,
        donor: ids.donor4_Id,
        recipient: ids.recipient4_Id,
        email: 'popdav@outlook.com',
        name: 'David Popov',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user5_Id,
        donor: ids.donor5_Id,
        email: 'nikola_stanojevic@gmail.com',
        name: 'Nikola Stanojevic',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
    {
        _id: ids.user6_Id,
        donor: ids.donor6_Id,
        email: 'dvaske86@gmail.com',
        name: 'Darko Vasiljevic',
        isActive: true,
        passwordHash: utils.hash('user', config.salt),
    },
];

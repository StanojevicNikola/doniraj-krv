const ids = require('../../ids/ids');
const getDate = require('../time-converter');

module.exports = [
    {
        _id: ids.donor1Id,
        user: ids.user1Id,
        bloodGroup: 'A+',
        geolocation: 'Beograd',
        lastDonation: getDate(30),
    },
    {
        _id: ids.donor2Id,
        user: ids.user2Id,
        bloodGroup: 'A-',
        geolocation: 'Cuprija',
        lastDonation: getDate(40),
    },
    {
        _id: ids.donor3Id,
        user: ids.user3Id,
        bloodGroup: 'AB+',
        geolocation: 'Nis',
        lastDonation: getDate(91),
    },
    {
        _id: ids.donor4Id,
        user: ids.user4Id,
        bloodGroup: 'O-',
        geolocation: 'Vranje',
        lastDonation: getDate(99),
    },
];

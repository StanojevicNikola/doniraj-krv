const ids = require('../../ids/ids');
const getDate = require('../time-converter');

const offset = '-';

module.exports = [
    {
        _id: ids.donor1_Id,
        user: ids.user1_Id,
        blood: ids.a_plus,
        geolocation: ids.beograd,
        lastDonation: getDate(30, offset),
    },
    {
        _id: ids.donor2_Id,
        user: ids.user2_Id,
        blood: ids.a_minus,
        geolocation: ids.cuprija,
        lastDonation: getDate(40, offset),
    },
    {
        _id: ids.donor3_Id,
        user: ids.user3_Id,
        blood: ids.ab_plus,
        geolocation: ids.nis,
        lastDonation: getDate(91, offset),
    },
    {
        _id: ids.donor4_Id,
        user: ids.user4_Id,
        blood: ids.o_minus,
        geolocation: ids.vranje,
        lastDonation: getDate(99, offset),
    },
];

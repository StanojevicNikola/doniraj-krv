const ids = require('../../ids/ids');

module.exports = 
[
    {
        _id: ids.donor1Id,
        user: ids.user1Id,
        bloodGroup: ids.bloodGroup1Id,
        geolocation: ids.geolocation1Id,
        lastDonation: new Date().getDate()-30,
    },
    {
        _id: ids.donor2Id,
        user: ids.user2Id,
        bloodGroup: ids.bloodGroup2Id,
        geolocation: ids.geolocation2Id,
        lastDonation: new Date().getDate()-60,
    },
    {
        _id: ids.donor3Id,
        user: ids.user3Id,
        bloodGroup: ids.bloodGroup3Id,
        geolocation: ids.geolocation3Id,
        lastDonation: new Date().getDate()-91,
    },
    {
        _id: ids.donor4Id,
        user: ids.user4Id,
        bloodGroup: ids.bloodGroup4Id,
        geolocation: ids.geolocation4Id,
        lastDonation: new Date().getDate()-91,
    },
];

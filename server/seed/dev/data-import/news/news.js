const ids = require('../../ids/ids');
const getDate = require('../time-converter');

const offset = '-';

module.exports = [
    {
        _id: ids.news1,
        title: 'Obaveštenje za korisnike usluga Instituta za transfuziju krvi Srbije',
        description: 'Institut pruža usluge zdravstvene zaštite (Info tel: 011/ 3812-839, 3812-752) iz svoje delatnosti osiguranim licima RFZO.',
        date: getDate(0, offset),
    },
    {
        _id: ids.news2,
        title: 'Najnovije otkriće',
        description: 'Najnovije otkrićeDanski istraživački tim je 1. aprila 2020. godine objavio otkriće dve vrste enzima',
        date: getDate(7, offset),
    },
    {
        _id: ids.news3,
        title: 'Donori u akciji',
        description: 'U periodu od 17. marta do 10. maja 2020. godine volonteri su realizovali 352.904 akcije pomoći ka pojedincima..',
        date: getDate(15, offset),
    },
    {
        _id: ids.news4,
        title: 'Pomoć',
        description: 'Crveni krst Srbije će  sutra  dostaviti dezinfekciona sredstva Crvenom krstu u Tutinu i Sjenici koji će je uručiti domovima zdravlja.',
        date: getDate(30, offset),
    },
];

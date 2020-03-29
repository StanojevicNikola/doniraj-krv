const ids = require('../../ids/ids');
const getTime = require('../time-converter');

const offset = '+';

module.exports = [
    {
        _id: ids.event1,
        geolocation: ids.beograd,
        title: 'Seminar u Beogradu!',
        description: 'Gostuje dr Ivan Ivanovic sa VMA Beograd.',
        date: getTime(7, offset),
        hour: '16.00 h',
    },
    {
        _id: ids.event2,
        geolocation: ids.cuprija,
        title: 'Seminar u Novom Sadu!',
        description: 'Gostuje dr Zarko Zarkovic iz DZ Cukarica.',
        date: getTime(14, offset),
        hour: '17.00 h',
    },
    {
        _id: ids.event3,
        geolocation: ids.nis,
        title: 'Akcija DDK u Cacku! Hitno!',
        description: 'Putujuci autobus za DDK u Vasem gradu bice narednih 5 dana.',
        date: getTime(21, offset),
        hour: '08.00 h',
    },
    {
        _id: ids.event4,
        geolocation: ids.vranje,
        title: 'Edukacija o vaznosti DDK u Smederevu!',
        description: 'Gostuju dr Marko Markovic i dr Petar Petrovic sa VMC Karaburma.',
        date: getTime(28, offset),
        hour: '15.00 h',
    },
];

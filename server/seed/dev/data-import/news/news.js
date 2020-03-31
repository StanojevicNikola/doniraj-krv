const ids = require('../../ids/ids');
const getDate = require('../time-converter');

const offset = '-';

module.exports = [
    {
        _id: ids.news1,
        title: 'Trazi se donor u Beogradu!',
        description: 'Potrebna A+ krvna grupa. Medicinski Centar Banjica. Broj jedinica: 2.',
        date: getDate(0, offset),
    },
    {
        _id: ids.news2,
        title: 'Trazi se donor u Novom Sadu!',
        description: 'Potrebna A- krvna grupa. Institut za pulmologiju. Broj jedinica: 1.',
        date: getDate(7, offset),
    },
    {
        _id: ids.news3,
        title: 'Trazi se donor u Cacku! Hitno!',
        description: 'Potrebna AB+ krvna grupa. Gradska bolnica. Broj jedinica: 5.',
        date: getDate(15, offset),
    },
    {
        _id: ids.news4,
        title: 'Trazi se donor u Smederevu!',
        description: 'Potrebna O+ krvna grupa. Gradski zavod za transfuziju. Broj jedinica: 3.',
        date: getDate(30, offset),
    },
];

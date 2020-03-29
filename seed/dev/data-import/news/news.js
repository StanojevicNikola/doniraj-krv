const ids = require('../../ids/ids');
const getTime = require('../time-converter');

const offset = '-';

module.exports = [
    {
        _id: ids.news1,
        title: 'Trazi se donor u Beogradu!',
        description: 'Potrebna A+ krvna grupa. Medicinski Centar Banjica. Broj jedinica: 2.',
        date: getTime(0, offset),
    },
    {
        _id: ids.news2,
        title: 'Trazi se donor u Novom Sadu!',
        description: 'Potrebna A- krvna grupa. Institut za pulmologiju. Broj jedinica: 1.',
        date: getTime(7, offset),
    },
    {
        _id: ids.news3,
        title: 'Trazi se donor u Cacku! Hitno!',
        description: 'Potrebna AB+ krvna grupa. Gradska bolnica. Broj jedinica: 5.',
        date: getTime(15, offset),
    },
    {
        _id: ids.news4,
        title: 'Trazi se donor u Smederevu!',
        description: 'Potrebna O+ krvna grupa. Gradski zavod za transfuziju. Broj jedinica: 3.',
        date: getTime(30, offset),
    },
];

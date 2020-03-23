const getDate = require('../time-converter');

module.exports = [
    {
        _id: 'news1',
        title: 'Trazi se donor1',
        description: 'Potrebna A+ krvna grupa. Grad Beograd. Broj jedinica: 2.',
        date: getDate(1),
    },
    {
        _id: 'news2',
        title: 'Trazi se donor2',
        description: 'Potrebna A- krvna grupa. Grad Novi Sad. Broj jedinica: 1.',
        date: getDate(10),
    },
    {
        _id: 'news3',
        title: 'Trazi se donor3',
        description: 'Potrebna AB+ krvna grupa. Grad Cacak. Broj jedinica: 5.',
        date: getDate(20),
    },
    {
        _id: 'news4',
        title: 'Trazi se donor4',
        description: 'Potrebna O+ krvna grupa. Grad Smederevo. Broj jedinica: 3.',
        date: getDate(40),
    },
];

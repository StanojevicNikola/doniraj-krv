const getDate = require('../time-converter');

module.exports = [
    {
        _id: 'news1',
        title: 'Trazi se donor u Beogradu!',
        description: 'Potrebna A+ krvna grupa. Medicinski Centar Banjica. Broj jedinica: 2.',
        date: getDate(1),
    },
    {
        _id: 'news2',
        title: 'Trazi se donor u Novom Sadu!',
        description: 'Potrebna A- krvna grupa. Institut za pulmologiju. Broj jedinica: 1.',
        date: getDate(10),
    },
    {
        _id: 'news3',
        title: 'Trazi se donor u Cacku! Hitno!',
        description: 'Potrebna AB+ krvna grupa. Gradska bolnica. Broj jedinica: 5.',
        date: getDate(20),
    },
    {
        _id: 'news4',
        title: 'Trazi se donor u Smederevu!',
        description: 'Potrebna O+ krvna grupa. Gradski zavod za transfuziju. Broj jedinica: 3.',
        date: getDate(40),
    },
];

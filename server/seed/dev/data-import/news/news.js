const ids = require('../../ids/ids');
const getDate = require('../time-converter');

const offset = '-';

module.exports = [
    {
        _id: ids.news1,
        title: 'Obaveštenje za korisnike usluga Instituta za transfuziju krvi Srbije',
        description: 'Institut pruža usluge zdravstvene zaštite (Info tel: 011/ 3812-839, 3812-752) iz svoje delatnosti osiguranim licima RFZO po uputu lekara primarne zdravstvene zaštite (odabranog lekara doma zdravlja), uz overu lekarske komisije Filijale RFZO samo za korisnike usluga van teritorije grada Beograda, a na osnovu overene zdrvstvene knjižice, odnosno druge isprave kojom se dokazuje svojstvo osiguranog lica.',
        date: getDate(0, offset),
    },
    {
        _id: ids.news2,
        title: 'Najnovije otkriće',
        description: 'Najnovije otkrićeDanski istraživački tim je 1. aprila 2007. godine objavio otkriće dve vrste enzima koji mogu da eritrocite krvnih grupa A i B pretvore u eritrocite krvne grupe O. Ovaj pronalazak je značajan jer se O krvna grupa može smatrati univerzalnom i kao takva koristiti u slučajevima disbalansa između postojećih rezervi krvi i potreba bolesnika. Inače, prva istraživanja u ovoj oblasti su počela još 1980. godine..',
        date: getDate(7, offset),
    },
    {
        _id: ids.news3,
        title: 'Donori u akciji',
        description: 'U periodu od 17. marta do 10. maja 2020. godine volonteri i osobe profesionalno zaposlene u Crvenom krstu u Republici Srbiji, povodom aktuelne pandemije COVID-19, realizovali su 352.904 akcije pomoći ka pojedincima..',
        date: getDate(15, offset),
    },
    {
        _id: ids.news4,
        title: 'Pomoć',
        description: 'Crveni krst Srbije će  sutra  dostaviti dezinfekciona sredstva Crvenom krstu u Tutinu i Sjenici koji će je uručiti domovima zdravlja u svojim sredinama.',
        date: getDate(30, offset),
    },
];

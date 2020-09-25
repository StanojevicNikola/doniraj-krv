
# Doniraj krv

__Doniraj krv__ je platforma koja povezuje ljude kojima je potrebna krv sa dobrovoljnim davaocima. <br>
Za cilj ima da se na lak i jednostavan nacin, (trenutno email porukom), obaveste svi kompatibilni davaoci na zahtevanom geografskom području.
___

## Kratak opis
### Korišćenje
Detaljniji opis koriršćenja platforme prikazan je u demo videu na [lokaciji](https://gitlab.com/matfpveb/projekti/2019-2020/06-doniraj-krv/-/blob/prerelease/demo/Doniraj-krv-demo.mp4).<br>
Platforma dozvoljava dva tipa korisnika: ___donatora___ i/ili ___koordinatora___.
Korisnik se prvobitno registruje bez uloge, koja se daljim izborom i popunjavanjem infomacija može zatražiti. <br>
Uloga donatora podrazumeva da ćete biti obaveštavani svaki put kada se kompatibilni donor u nečijoj okolini. Molimo donatore da redovno ažuriraju datum poslednje donacije krvi, kako bi izbegli obaveštenja na koja nisu u mogućnosti da reaguju. <br>
Uloga koordinatora dozvoljava traženje krvi, bilo za Vas bilo za neku drugu osobu kojoj je ona potrebna. <br>
Svakom korisniku je dozvoljeno da bude i koordinator i donator, dok će samo odobreni korisnici moći da dobiju ulogu administratora platforme.


### Pokretanje
Pre pokretanja servera je potrebno klonirati repozitorijum komandom:<br>
`git clone https://gitlab.com/matfpveb/projekti/2019-2020/06-doniraj-krv.git`

Moguće je pokretati klijentsku i serversku aplikaciju nezavisno.<br>
___Server:___<br>
`cd server`<br>
`npm install`<br>
`npm run seed`<br>
`npm start`<br>
Za naknadna podešavanja treba izmeniti fajl: `server/config.json` koji sadrži podrazumevane vrednosti.

___Klijent:___<br>
`cd client`<br>
`npm install`<br>
`npm start`<br>

___NAPOMENA:___
Za potpuno funkcionisanje platforme, dovoljno je pokrenuti ___samo___ server, gore navedenim komandama.

## Tim

- [Andrija Novakovic, 68/2016](https://gitlab.com/akinovak)
- [Nikola Stanojevic, 92/2016](https://gitlab.com/ov3rlord)
- [David Popov, 102/2016](https://gitlab.com/popdav)
- [Dimitrije Antic, 128/2016](https://gitlab.com/antic11d)
- [Darko Vasiljevic, 449/2016](https://gitlab.com/DarkoVasiljevic)

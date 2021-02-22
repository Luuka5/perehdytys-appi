# Perehdytys-appi

Tämän react-pohjaisen perehdytys-apin tein tet-viikon aikana Fraktiolla. Appi on suunniteltu mobiililaitteille.

Appi on suunniteltu helpottamaan tehtävien organisoimista, kun työhön tulee uusia työntekijöitä. Apin sisällä on tehtäviä, jotka on jaoteltu kategorioihin. Kaikki tekemättömät tehtävät löytyy TODO-listasta.

Asetuksista voi vaihtaa oman tilan perehdyttäjätilaan, joka on tarkoitettu uusien työntekijöiden perehdyttäjille. Perehdyttäjätilassa näkee perehdyttäjille suunnatut kategoriat, sekä pääsee toiseen TODO-listaan, jossa on pelkästään tehtäviä perehdyttäjäkategorioista.

Tehtävät luetaan `public` kansiossa sijaitsevasta tasks.json tiedostosta. Perehdyttäjätilassa sivuvalikosta voi avata editorin, jolla voi muokata tehtävälistaa. Jotta tehtävälistaa voi käyttää, pitää ladata tasks.json tiedosto ja korvata sillä edellinen tiedosto `public kansiossa.

Apilla on tumma ja vaalea teema. Oletuksena teema on määritelty käyttöjärjestelmän oletuksen mukaan.

## Testaa appia

Appia voi testata osoitteessa https://luuka5.github.io/, tai lataamalla repon ja suorittamalla komennon `npm start`. Tämä käynnistää paikallisen palvelimen ja avaa apin. Tämän jälkeen appia voi testata muilla samaan verkkoon liitetyillä laitteilla konsolissa näkyvästä osoitteesta.


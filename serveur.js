// serveur.js
// Point d'entrée qui démarre le serveur HTTP et charge l'application Express.
const app = require('./app');

const numeroPort = 3003;

app.listen(numeroPort, () => {
    console.log(`Le serveur de MayGourmet est à l'écoute sur http://localhost:${numeroPort}/fournisseur`);
});

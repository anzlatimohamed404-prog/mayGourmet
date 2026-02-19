// serveur.js
const app = require('./app');

const numeroPort = 3003;

app.listen(numeroPort, () => {
    console.log(`Le serveur de MayGourmet est à l'écoute sur http://localhost:${numeroPort}/fournisseur`);
});

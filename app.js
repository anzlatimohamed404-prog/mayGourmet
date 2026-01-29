const express = require('express');

const app = express();

// API Route pour la page racine : localhost:3004
app.get('/', (req, res) =>{

    // Message à afficher: Bienvenue chez MayGourmet
    res.write("<h1> Bienvenue chez MayGourmet </h1>");
    res.end();
});

// API Route pour la page d'accueil localhost/api/acceuil
app.get('/api/accueil', (req, res) => {
    console.log("je passe dans /api/accueil");

    // Le type d'rncordage de texte retourné en réponse
    res.setHeader('content-type','text/html; charset=utf-8');

     // Le contenu qui sera affiché coté navigateur web
    res.write("<p> je suis à l'accueil</p>");

    // Fin de la réponse
    res.end();
});

module.exports = app;
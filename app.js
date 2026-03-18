// j'importe le framewordk Expressjs.
const express = require('express');

// J'importe le pilote Mysql2 utilisé interroger la BDD Mysql
const mysql2 = require("mysql2");

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Je configure les éléments attendus pour me connecter à Mysql
const optionsConnexioBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Irwane240319",
    database: "mygourmet",
    port: 3306
};

// Middleware pour se connecter à la BDD Mysql pool est la stratégie de connexion à la BDD Mysql
app.use(myconnection(mysql2,optionsConnexioBaseDeDonnees,"pool"));

// Je précise que les vues sont dans le dossier views
app.set('views', './views');

// Je précise que nous utilisons le moteur EJS pour les vues
app.set('view engine', 'ejs');

// Je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static('public'));


//  API Route pour la racine de la page : localhost:3004/
app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1> Bienvenue chez May Gourmet </h1>");
    res.end();
});

// API route pour la page d'accueil
app.get("/api/accueil", (req, res) => {
    console.log(" Je passe dans /api/accueil");

    res.render('accueil');

    // Le type d'encodage du tex
    //res.writeHead(200,{ "content-type": "text/html;charset=utf-8"})

    // Le conten qui seraa affiché côté navigateur 
    //res.write("<p> Je suis à l'accueil </p>");

    // Fin de la réponse
    //res.end();
});

app.get("/api/equipe", (req, res) => {
    console.log(" Je passe dans /api/equipe");

    // 1. Je me connecte à la BDD grâce à la méthode getconnection
    req.getConnection((erreur, connection) => {
        // Je vérifie s'il y a une erreur lors de la connexion à la BDD
        if(erreur){
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM equipe", [], (err,resultatEquipe) => {
                if (erreur) {
                    console.log("Erreur dans la requête Sql SELECT");
                } else{
                    console.log("Mon équipe:", resultatEquipe);

                    // Je retourne au client le résultat de la requpete Sql 
                    res.render("equipe", {resultatEquipe});
                }
            });
                
            
        }
    });

   
});

// J'ajoute un membre dans la table equipe (modal form)
app.post('/api/equipe', (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const telephone = req.body.telephone;
    const post = req.body.post;
    const adresse_postale = req.body.adresse_postale;
    const presentation = req.body.presentation;

    const requeteSql = "INSERT INTO equipe (nom, prenom, mail, telephone, post, adresse_postale, presentation) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nom, prenom, mail, telephone, post, adresse_postale, presentation];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion à la base de données :", erreur);
            return res.status(500).send("Erreur serveur");
        }

        connection.query(requeteSql, ordreChamps, (erreur) => {
            if (erreur) {
                console.log("Erreur d'ajout membre :", erreur);
                return res.status(500).send("Erreur lors de l'ajout du membre");
            }

            res.redirect('/api/equipe');
        });
    });
});

// J'ajoute un fournisseur dans la table fournisseur pour cela j'utilise la méthode POST
app.post('/api/fournisseur', (req, res) => {
    console.log("corps de la requête : ", req.body);

    const nomFournisseur = req.body.nomFournisseur;
    const posteFournisseur = req.body.posteFournisseur;
    const emailFournisseur = req.body.emailFournisseur;
    const telephoneFournisseur = req.body.telephoneFournisseur;
    const adresseFournisseur = req.body.adressePostaleFournisseur;
    const PresentationFournisseur = req.body.presentationFournisseur;

    const requeteSql = "INSERT INTO fournisseur (nom, responsable, mail, telephone, adresse_postale, presentation_fournisseur) VALUES (?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nomFournisseur, posteFournisseur, emailFournisseur, telephoneFournisseur, adresseFournisseur, PresentationFournisseur];

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
        } else{ // Si j'ai réussi à me connecter à la base de données
            connection.query(requeteSql, ordreChamps, (erreur,nouveauFournisseur) => {
                if(erreur) {
                    console.log("Erreur d'ajout fournisseur :", erreur);
                } else{
                    console.log("Bravo! Nouveau fournisseur ajouté");
                    res.status(200).redirect("/api/fournisseur");
                }
            });
        }
    });
});


app.get('/api/fournisseur', (req, res) => {
    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM fournisseur", [], (err,resultatFournisseur) => {
                if (erreur) {
                    console.log("Erreur dans la requête Sql SELECT");
                } else{
                    console.log("Fournisseurs:", resultatFournisseur);
                    res.render("fournisseur", {resultatFournisseur});
                }
            });
        }
    });
});

// API route pour supprimer un membre de l'equipe 
// Methode : DELETE
// exemple : localhoste:3003/api/equipe/1
app.delete('/api/equipe/:id', (req, res) => {
    const idMenmbreEquipe = req.params.id;
    const queryDelete = "DELETE FROM equipe WHERE id = ?";
    
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur supression equipe :", erreur);
        } else {
            connection.query(queryDelete, [idMenmbreEquipe], (err, resultat) => {
                if(err){
                    console.log("Erreur Suppression equipe");
                } else {
                    console.log("Bravo! Le membre est supprimé dans la table equipe")
                    //res.status(200).redirect("/api/acceil");
                    res.status(200).json({routeAccueil: "/api/accueil"});            
                }

            })
        }
    });

});

app.get("/api/plats", (req, res) => {
    console.log("Je passe dans /api/plats");
    res.render("plats");
});

app.get("/api/contact", (req, res) => {
    console.log("Je passe dans /api/contact");
    res.render("contact");
});



//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;



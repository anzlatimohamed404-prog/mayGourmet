CREATE DATABASE maygourmet;

SHOW DATABASES;

USE maygourmet;

CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,
    telephone VARCHAR(100),
    post VARCHAR(80) NOT NULL,
    adresse_postale VARCHAR(255),
    presentation VARCHAR(255),
    date_recrutement DATE
);

SHOW TABLES;

INSERT INTO equipe (nom, prenom, mail, telephone, post, adresse_postale, presentation, date_recrutement)
VALUES 
('Anzilati', 'Mohamed', 'anzi@maygourmet.fr', '0123456789', 'Chef de cuisine', '123 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15'),
('said', 'Fatima', 'fati@maygourmet.fr', '0193456789', 'Chef de cuisine', '130 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15'),
('kama', 'hama', 'kama@maygourmet.fr', '0153456789', 'Chef de cuisine', '110 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15');

SELECT * FROM equipe;


-- je créer la table fournisseur.
CREATE TABLE fournisseur (
    id_fournisseur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,
    telephone VARCHAR(100),
    adresse_postale VARCHAR(255),
    presentation_fournisseur VARCHAR(255),
    -- j'associe la table fournisseur a la table produit en utilisant L'ID_produit
    --l'ID_PRODUIT provient de la table produit
    FOREIGN KEY (id_produit) REFERENCES produit(id_produit)
    
);

-- créer  la table 'produit'
CREATE TABLE produit(
    id_produit INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    presentation VARCHAR(155),
    prix INT NOT NULL,
    origin VARCHAR(30) NOT NULL,
    catégorie VARCHAR(30)
    disponibilé BOOLEAN DEFAULT false,
    type_culture VARCHAR(30),
    -- j'associe la table produit a la table fournisseur en utlisant les identifiants de chaque
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur
    (id_fournisseur)

);

SHOW TABLES;

INSERT INTO fournisseur (nom, responsable, mail, telephone, adresse_postale, presentation_fournisseur)
VALUES ('la zone', 'Alpha', 'alpha@exemple.com', '0600000001', '13 rue combani', 'un bon serveur');

INSERT INTO fournisseur (nom, responsable, mail, telephone, adresse_postale, presentation_fournisseur)
VALUES ('jijisnack', 'Anzilati', 'anzlatim@gmail.com', '0620000001', '30 rue mroale', 'une bonne serveur');

INSERT INTO fournisseur (nom, responsable, mail, telephone, adresse_postale, presentation_fournisseur)
VALUES ('nisswonandza', 'Mohamed', 'moha@gmail.com', '0621234561', '20 rue mamoudzou', 'un bon travailleur');




UPDATE fournisseur
SET nom = 'Fournisseur Alpha Plus'
WHERE id = 1;

DELETE FROM fournisseur
WHERE id = 4;


CREATE TABLE plat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prix DECIMAL(8,2),
    id_plat INT
);

SHOW TABLES;

INSERT INTO plat (nom, prix, id_plat) VALUES
('Pizza', 8.50, 1),
('Burger', 9.00, 2),
('Pâtes', 10.00, 1),
('Salade', 7.00, 3),
('Tacos', 6.50, 2);

SELECT * FROM plat;

UPDATE plat
SET nom = 'Pizza Royale'
WHERE id = 1;

DELETE FROM plat
WHERE id = 5;

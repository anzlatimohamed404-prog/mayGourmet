-- créer la base de données
CREATE DATABASE maygourmet;
-- afficher les bases de données
SHOW DATASES.

-- créer la btable equipe
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,
    telephone VARCHAR(100),-- ce champ est faculatif
    post VARCHAR(80) NOT NULL,
    adresse_postale VARCHAR(255),
    presentation VARCHAR(255),
    date_recrutement DATE
);

--afficher les tables existante
SHOW TABLES;
('Anzilati','Mohamed', 'anzi@maygourmet.fr', '0123456789', 'Chef de cuisine', '123 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15');

-- Ajouter un membre dans l'equipe
INSERT INTO equipe (nom,prenom, mail, telephone, post, adresse_postale, presentation, date_recrutement)

VALUES ('said','Fatima','fati@maygourmet.fr', '01'&é93456789', 'Chef de cuisine', '130 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15');

('kama', 'hama','kama@maygourmet.fr','0153456789', 'Chef de cuisine', '110 Rue de la Paix', 'Chef expérimenté avec 10 ans d’expérience dans la restauration.', '2023-05-15');


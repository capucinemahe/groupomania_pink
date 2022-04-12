//gère toutes les requetes du serveur

const express = require('express');
const app = express();
app.use(express.json()); //pour gérer les requêtes POST venant du front-end, on a besoin d'en extraire le corps JSON
require('dotenv').config();

const db = require('./models');
db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('Serveur OK');
    });
})

const path = require('path'); //donne accès au chemin de notre système de fichiers
app.use('/images', express.static(path.join(__dirname, 'images')));
//middleware pr dire à notre app express de servir le dossier images quand on fera une requete à /images - multer

const helmet = require("helmet");
app.use(helmet());

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //nombre de ms d’attente avant de pouvoir retenter de se reconnecter - 15 min
    max: 800 //nombre max de tentatives de connexion admises
});
app.use(limiter);

//middleware qui corrige l'erreur de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //permet d'envoyer des requêtes avec les méthodes mentionnées
    next();
});


app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour</h1>');
});

// routes
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');


app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;
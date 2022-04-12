//logique métier des users
const Model = require("../models/");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decodedToken = require("../utils/authToken");

const schemaPV = new passwordValidator();
schemaPV
  .is()
  .min(6)
  .is()
  .max(35)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

//créer un compte
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const name = req.body.name;

  Model.Users.findOne({ where: { email: email } }) //on cherche si l'email entré est déja présent dans la BD
    .then((user) => {
      if (user) {
        //si on a un email qui correspondant à l'email de la req
        return res.status(401).json({ message: "email déja utilisé" });
      }
      if (
        email == null ||
        name == null ||
        firstname == null ||
        password == null
      ) {
        return res.status(400).json({ message: "champ(s) manquant(s)" });
      }
      if (
        name.length <= 2 ||
        name.length >= 25 ||
        firstname.length <= 2 ||
        firstname.length >= 25
      ) {
        return res
          .status(400)
          .json({
            message:
              "votre nom & prénom doivent être compris entre 2 et 25 caractères",
          });
      }
      if (!schemaPV.validate(password)) {
        return res.status(400).json({ message: "mot de passe trop faible" });
      }

      bcrypt.hash(password, 10).then((hash) => {
        const userObject = {
          email: email,
          password: hash, //mot de passe hashé
          name: name,
          firstname: firstname,
          bio: req.body.bio,
        };

        Model.Users.create(userObject) //pour enregistrer l'user dans la base de données
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }));
      });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//login - se connecter à son compte
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Model.Users.findOne({ where: { email: email } }) //on cherche si l'email entré est déja présent dans la BD
    .then((user) => {
      if (!user) {
        //si on a pas trouvé l'utilisateur correspondant à l'email de la req
        return res
          .status(401)
          .json({ message: "Utilisateur ou mot de passe incorrects" });
      }
      //si l'email correspond :
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          //si on recoit false - l'user a rentré le mauvais mdp
          return res
            .status(401)
            .json({ message: "Utilisateur ou mot de passe incorrects" });
        }
        //on reçoit true - le mot de passe est bon
        res.status(200).json({
          //renvoi un objet json qui contient :
          userId: user.id,
          isAdmin: user.isAdmin,
          token: jwt.sign(
            //fonction sign qui prend en arguments :
            { userId: user.id, isAdmin: user.isAdmin }, //le payload
            `${process.env.TOKEN}`,
            { expiresIn: "10h" }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//RECUPERE - MODIFIE - SUPPRIME un profil d'utilisateur
exports.getUserProfile = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  Model.Users.findOne({
    where: { id: userId },
    attributes: ["name", "firstname", "imageuser", "bio"],
  })
    .then((user) => {
      res.status(200).json({ user: user.dataValues });
    })
    .catch((error) => res.status(500).json(error));
};

exports.getAllUsers = (req, res, next) => {
  Model.Users.findAll({
    attributes: { exclude: ["email", "password"] },
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json(error));
};

exports.updateUser = (req, res, next) => {
  const { userId } = decodedToken(req, res);
  //console.log(userId);
  //console.log(req.body);

  const userObject = {};
  if (req.body.bio) {
    userObject.bio = req.body.bio;
  }
  //n'est pas undefined
  if (req.file && req.body.imageuser !== "undefined") {
    userObject.imageuser = `${req.protocol}://${req.get("host")}/images/users/${
      req.file.filename
    }`;
  }
  Model.Users.update(userObject, { where: { id: userId } })
    .then((user) =>
      res.status(200).json({ message: "Profil de l'utilisateur modifié !" })
    )
    .catch((error) => res.status(500).json(error));
};

exports.deleteUserAccount = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  if (req.auth.userId != userId) {
    //si l'userid contenu dans l'auth est diff de celui de la requete
    return res.status(403).json({ message: "utilisateur non authorisé" });
  }
  Model.Users.destroy({ where: { id: userId } })
    .then(() => res.status(200).json({ message: "Ce compte a été supprimé" }))
    .catch((error) => res.status(500).json(error));
};

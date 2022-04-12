const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //on récupère le token du front
     //on décode le token via jwt verify
    return jwt.verify(token, `${process.env.TOKEN}`);
   // on vérifie que le token du front corresponde à celui du back
  } catch {
    res.status(401).json({ message: "Requête invalide !" });
  }
};
//principe solid - décode mon token 
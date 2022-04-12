//middleware d'authentification
const authToken = require('./authToken')

module.exports = (req, res, next) => {
    try {
        const decodedToken = authToken(req,res);
        const userId = decodedToken.userId; //on prend le userId du token décodé
        
        //si on a un userId mais qu'il est différent de celui stocké dans le token
        if (req.body.userId && req.body.userId != userId) {
            throw 'User Id non valable';
        } else {
            req.auth = decodedToken; //je stock le token décodé dans l'objet req.auth
            next();
        }
    } catch {
        res.status(401).json({ message: 'Requête invalide !'})};
    };

    //fait la vérif d'autorisation après avoir décodé le token 
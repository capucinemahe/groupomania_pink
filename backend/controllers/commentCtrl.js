//logique métier des commentaires des posts
const Model = require("../models");
const decodedToken = require("../utils/authToken");

//création d'un commentaire
exports.createComment = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  const commentObject = {
    Users_id: userId,
    Posts_id: req.body.postId,
    content: req.body.content,
  };
  if (req.body.content == "") {
    return res.status(400).json({ message: "Veuillez écrire quelque chose" })
  }
  Model.Comments.create(commentObject)
    .then((newComment) => {
      res
        .status(201)
        .json({ comment: newComment, message: "Commentaire publié !" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

//afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
  Model.Comments.findAll({
    where: { Posts_id: req.params.id }, //id de mon post
    order: [["createdAt", "DESC"]],
    attributes: ["id", "Users_id", "content"],
    include: [
      {
        model: Model.Users,
        attributes: ["id", "name", "firstname", "imageuser", "isAdmin"], //ce qui apparait pour l'user qui poste
      },
    ], //id du comment, id de l'user qui a posté
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => {
      res.status(500).json(error);
    });
};

//afficher un commentaire
exports.getOneComment = (req, res, next) => {
  Model.Comments.findOne({
    where: { Posts_id: req.params.id }, //id de mon post
    order: [["createdAt", "DESC"]],
    attributes: ["id", "Users_id", "content"],
    include: [
      {
        model: Model.Users,
        attributes: ["id", "name", "firstname", "imageuser", "isAdmin"], //ce qui apparait pour l'user qui poste
      },
    ], //id du comment, id de l'user qui a posté
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => {
      res.status(500).json(error);
    });
};

//modifier un commentaire
exports.modifyMyComment = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  Model.Comments.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.Users_id == userId) {
        //l'user est il autorisé ?

        const commentObject = {
          content: req.body.content,
        };
        comment
          .update(commentObject)
          .then((updatedComm) =>
            res
              .status(200)
              .json({ comment: updatedComm, message: "Commentaire modifié !" })
          )
          .catch((error) => res.status(400).json(error));
      } else {
        res.status(403).json({ message: "vous n'êtes pas autorisé" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

//supprimer un commentaire
exports.deleteMyComment = (req, res, next) => {
  const { userId, isAdmin } = decodedToken(req, res);

  Model.Comments.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      console.log(comment);
      if (comment.Users_id == userId || isAdmin) {
        //l'user est il autorisé ?
        comment
          .destroy()
          .then(() =>
            res.status(200).json({ message: "Commentaire supprimé !" })
          )
          .catch((error) => res.status(400).json(error));
      } else {
        res.status(403).json({ message: "vous n'êtes pas autorisé" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

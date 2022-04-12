//logique métier des posts
const Model = require("../models");
const fs = require("fs");
//file system = système de fichiers. donne accès aux fonctions qui nous permettent de modifier ou supprimer le système de fichiers
const decodedToken = require("../utils/authToken");

//création d'un post
exports.createPost = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  const postObject = {
    Users_id: userId,
    content: req.body.content,
  };
  if (req.file) {
    postObject.attachment = req.file.filename;
  }
  Model.Posts.create(postObject)
    .then((newPost) => {
      res.status(201).json({ post: newPost, message: "Post publié !" });
    }) //201 = creation reussie
    .catch((error) => {
      res.status(500).json(error);
    });
};

//afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  Model.Posts.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "Users_id", "content", "attachment"], //id du post, id de l'user qui a posté
    include: [
      {
        model: Model.Users,
        attributes: ["name", "firstname", "imageuser", "isAdmin"], //ce qui apparait pour l'user qui poste
      },
      {
        model: Model.Comments,
        attributes: ["id", "Users_id", "content"],
        include: [
          {
            model: Model.Users,
            attributes: ["name", "firstname", "imageuser", "isAdmin"],
          },
        ],
      },
    ],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      res.status(500).json(error);
    });
};

//pour avoir un post en particulier
exports.getOnePost = (req, res, next) => {
  Model.Posts.findOne({
    where: { id: req.params.id },
    attributes: ["id", "Users_id", "content", "attachment"],
    include: [
      {
        model: Model.Users,
        attributes: ["name", "firstname", "imageuser", "isAdmin"], //ce qui apparait pour l'user qui poste
      },
      {
        model: Model.Comments,
        include: [
          {
            model: Model.Users,
            attributes: ["name", "firstname", "imageuser", "isAdmin"],
          },
        ],
      },
    ],
  })

    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(500).json(error));
};

//modifier un post
exports.modifyMyPost = (req, res, next) => {
  const { userId } = decodedToken(req, res);

  Model.Posts.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.Users_id == userId) {
        //l'user est il autorisé ?

          const postObject = {
            id: post.id,
            Users_id: post.Users_id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            attachment: post.attachment,
            content: req.body.content,
          };
      
console.log(postObject);

        if (req.file) {
          //console.log(req.file.filename);
          if (post.attachment) {
            console.log(post.attachment);
            fs.unlink(`images/posts/${post.attachment}`, () => {
              console.log("image bien supprimée");
            }); //indicatif dans mon term du back
          }
          postObject.attachment = req.file.filename;
        }

        post.update(postObject)
          .then(() =>
            res
              .status(200)
              .json({ post: postObject, message: "Post modifié !" })
          )
          .catch((error) => res.status(400).json(error));
      } else {
        res.status(403).json({ message: "vous n'êtes pas autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//supprimer un post
exports.deleteMyPost = (req, res, next) => {
  const { userId, isAdmin } = decodedToken(req, res);

  Model.Posts.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.Users_id == userId || isAdmin) {
        //l'user est il autorisé ?
        if (req.file) {
          const filename = post.attachment.split("/images/posts/")[1]; //on extrait le nom du fichier à supprimer
          fs.unlink(`images/posts/${filename}`, (error) => {
            //unlink pour supprimer un fichier de mon dossier images
            error ? console.log(error) : console.log("image bien supprimée");
          });
        }
        post
          .destroy()
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json(error));
      } else {
        res.status(403).json({ message: "vous n'êtes pas autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

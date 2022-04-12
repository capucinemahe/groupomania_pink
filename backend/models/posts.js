"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(models.Comments, {
        //un post peut avoir plusieurs commentaires
        foreignKey: "Posts_id", //la clé etrangère est l'id du post de reférence du commentaire
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Comments.belongsTo(models.Posts, { foreignKey: "Posts_id" });
      //belongs to = appartient à 
    }
  }

  Posts.init(
    {
      Users_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      attachment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};

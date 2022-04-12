"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Users.hasMany(models.Posts, {
        //un user peut publier plusieurs posts
        foreignKey: "Users_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Posts.belongsTo(models.Users, { foreignKey: "Users_id" });

      models.Users.hasMany(models.Comments, {
        //un user peut commenter plusieurs posts et plusiers fois
        foreignKey: "Users_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Comments.belongsTo(models.Users, { foreignKey: "Users_id" });
    }
  }

  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Votre biographie",
      },
      imageuser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318008_960_720.png",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

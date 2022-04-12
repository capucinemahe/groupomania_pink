module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      imageuser: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:
          "https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318008_960_720.png",
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        set: function(value) {
          if (value == 'true') value = true;
          if (value == 'false') value = false;
          this.setDataValue('isAdmin',value)
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};

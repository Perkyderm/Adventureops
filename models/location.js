module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Location.associate = (models) => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Location.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Location;
};

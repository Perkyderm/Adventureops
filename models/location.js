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
      type: DataTypes.INT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INT,
      allowNull: false,
    },
  });

  return Location;
};

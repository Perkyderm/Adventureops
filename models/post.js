module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 500],
      },
    },
  });

  return Post;
};

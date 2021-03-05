module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
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

  Post.associate = (models) => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Post.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};

const db = require("../models");

module.exports = (app) => {
  // BOILER PLATE routes codes --- might change ???

  // FIND ALL
  app.get("/api/posts", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Post.findAll({
      where: query,
      include: [db.User],
    }).then((dbPost) => res.json(dbPost));
  });
  app.get("/api/posts/type/:type", (req, res) => {
    const query = { type: req.params.type };

    db.Post.findAll({
      where: query,
      include: [db.User],
    }).then((dbPost) => res.json(dbPost));
  });

  // FIND ONE
  app.get("/api/posts/:id", (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    }).then((dbPost) => res.json(dbPost));
  });

  // CREATE NEW POST
  app.post("/api/posts", (req, res) => {
    console.log(req.body);
    req.body.UserId = req.user.id;
    db.Post.create(req.body).then((dbPost) => res.json(dbPost));
  });

  // UPDATES POST
  app.put("/api/posts", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbPost) => res.json(dbPost));
  });

  // DELETE POST
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbPost) => res.json(dbPost));
  });
};

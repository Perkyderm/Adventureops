const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  // BOILER PLATE routes codes --- might change ???

  // FIND ALL
  app.get("/api/users", (req, res) => {
    res.json(db.User.findAll({ attributes: ["username", "id"] }));
  });

  // FIND ONE
  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      attributes: ["username", "id"],
      where: req.params.id,

      // should I include in Posts and Locations?
    }).then((dbUser) => res.json(dbUser));
  });

  // CREATE NEW USER
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });

  // DELETE USER
  app.delete("/api/users/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
      include: [db.Post],
      include: [db.Location],
    }).then((dbUser) => res.json(dbUser));
  });
};

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
      where: {
          id: req.params.id,
      }, 

      // should I include in Posts and Locations?
    }).then((dbUser) => res.json(dbUser));
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

  // CREATE NEW USER --- maybe change route name to "/api/signup" in future 
  app.post("/api/users", (req, res) => {
      db.User.create({
          email: req.body.email,
          password: req.body.password
      })
          .then(function () {
              res.redirect(307, "/api/login");
          })
          .catch(function (err) {
              res.status(401).json(err);
          });
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

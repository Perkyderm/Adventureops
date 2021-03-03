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
    res.json(
      db.User.findAll({
        attributes: ["username", "id"],
        where: { id: req.params.id },
      })
    );
  });

  //Authentication middleware for login route
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // CREATE NEW USER
  app.post("/api/users", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
      });
    }
  });
  // DELETE USER
  app.delete("/api/users/:id", (req, res) => {});
};

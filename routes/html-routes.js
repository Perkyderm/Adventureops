var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    //If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/user");
    }
    return res.redirect("/login");
  });
  app.get("/login", (req, res) => {
    if (req.user) {
      return res.redirect("/user");
    }
    return res.render("login");
  });
  app.get("/signup", (req, res) => {
    if (req.user) {
      return res.redirect("/user");
    }
    return res.render("signup");
  });

  app.get("/user", isAuthenticated, function (req, res) {
    return res.render("home", req.user);
  });

  app.get("/posts", (req, res) => {
    if (req.user) {
      return res.redirect("/user-posts");
    }
    return res.redirect("/view-posts");
  });

  app.get("/view-posts", (req, res) => {
    return res.render("view-posts");
  });

  app.get("/user-posts", isAuthenticated, function (req, res) {
    return res.render("create-post", req.user);
  });
};

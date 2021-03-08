var path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const e = require("express");

module.exports = function (app) {
  app.get("/", (req, res) => {
    //If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/home");
    }
    return res.redirect("/login");
  });
  app.get("/login", (req, res) => {
    if (req.user) {
      return res.redirect("/home");
    }
    return res.render("login");
  });
  app.get("/signup", (req, res) => {
    if (req.user) {
      return res.redirect("/home");
    }
    return res.render("signup");
  });

  app.get("/home/:type?", isAuthenticated, function (req, res) {
    let query = {};
    console.log("Were in", req.params);
    if (req.params.type) {
      query.type = req.params.type;
    }
    db.Post.findAll({
      where: query,
      include: [db.User, db.Location],
    })
      .then((data) => {
        //console.log("Success in getting posts:", data);
        let posts = data.map((post) => {
          let ret = {
            id: post.id,
            content: post.content,
            date: new Date(post.createdAt).toLocaleDateString(),
            type: post.type,
            user: post.User.username,
          };
          return ret;
        });
        console.log(posts);
        let cont, type;
        if (req.params.type) {
          type = true;
        } else {
          type = false;
        }
        if (!data.length) {
          cont = false;
        } else {
          cont = true;
        }
        let obj = { cont: cont, type: type, posts: posts };

        return res.render("home", obj);
      })
      .catch((error) => console.error("Error:", error));
    //return res.redirect("/login");
  });

  app.get("/user/:type?", isAuthenticated, (req, res) => {
    let query = {};
    console.log("Were in", req.params);
    if (req.params.type) {
      query.type = req.params.type;
    }
    //query["User.username"] = req.user.username;
    db.Post.findAll({
      where: query,
      include: [
        { model: db.User, where: { username: req.user.username } },
        db.Location,
      ],
    })
      .then((data) => {
        //console.log("Success in getting posts:", data);
        let posts = data.map((post) => {
          let ret = {
            id: post.id,
            content: post.content,
            date: new Date(post.createdAt).toLocaleDateString(),
            type: post.type,
            user: post.User.username,
          };
          return ret;
        });
        console.log(posts);
        let cont, type;
        if (req.params.type) {
          type = true;
        } else {
          type = false;
        }
        if (!data.length) {
          cont = false;
        } else {
          cont = true;
        }
        let obj = { cont: cont, type: type, posts: posts };

        return res.render("user", obj);
      })
      .catch((error) => console.error("Error:", error));
  });
};

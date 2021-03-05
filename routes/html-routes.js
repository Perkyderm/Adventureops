var path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const e = require("express");

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

  app.get("/view-posts/:type?", (req, res) => {
    let query = {};
    console.log("Were in", req.params);
    if (req.params.type) {
      query.type = req.params.type;
    }
    db.Post.findAll({
      where: query,
      include: [db.User],
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

        return res.render("view-posts", obj);
      })
      .catch((error) => console.error("Error:", error));
  });

  app.get("/user-posts", isAuthenticated, function (req, res) {
    return res.render("create-post", req.user);
  });
};

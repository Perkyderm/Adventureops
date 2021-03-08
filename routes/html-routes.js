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

  app.get("/home/:type?/:location?", isAuthenticated, function (req, res) {
    let query = {};
    console.log("Were in", req.params);

    if (req.params.type) {
      query.type = req.params.type.replace("-", "/");
      if (req.params.location) {
        query["$Location.name$"] = req.params.location;
      }
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
            location: post.Location.name,
          };
          return ret;
        });
        console.log(posts);
        let obj = { posts: posts };
        if (req.params.type) {
          obj.type = true;
          obj.title = req.params.type;
        } else {
          obj.type = false;
        }
        if (req.params.location) {
          obj.loc = true;
        } else {
          obj.loc = false;
        }
        if (!data.length) {
          obj.cont = false;
        } else {
          obj.cont = true;
        }

        db.Location.findAll({
          attributes: ["type"],
          include: [{ model: db.Post, attributes: [] }],
          group: ["type"],
        }).then((types) => {
          //console.log(types);
          let opts = types.map((post) => post.dataValues);
          console.log(opts);
          obj.types = opts;
          if (obj.type) {
            db.Location.findAll({
              where: { type: req.params.type },
            }).then((locs) => {
              let locations = locs.map((loc) => {
                return { location: loc.dataValues.name };
              });
              console.log(locations);
              obj.locations = locations;
              return res.render("home", obj);
            });
          } else {
            return res.render("home", obj);
          }
        });
      })
      .catch((error) => console.error("Error:", error));
    //return res.redirect("/login");
  });

  app.get("/user/:type?", isAuthenticated, (req, res) => {
    let query = {};
    console.log("Were in", req.params);
    if (req.params.type) {
      query.type = req.params.type.replace("-", "/");
    }
    //query["User.username"] = req.user.username;
    db.Post.findAll({
      where: query,
      include: [{ model: db.User, where: { id: req.user.id } }, db.Location],
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
            location: post.Location.name,
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
        db.Post.findAll({
          attributes: ["type"],
          where: { "$User.id$": req.user.id },
          include: [{ model: db.User, attributes: [] }],
          group: ["type"],
        }).then((types) => {
          //console.log(types);
          let opts = types.map((post) => post.dataValues);
          console.log(opts);
          obj.types = opts;

          return res.render("user", obj);
        });
      })
      .catch((error) => console.error("Error:", error));
  });
};

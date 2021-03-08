const db = require("../models");

module.exports = (app) => {
  // BOILER PLATE routes codes --- might change ???

  // FIND ALL
  app.get("/api/locations/:type?", (req, res) => {
    const query = {};

    let inc = req.params.type;
    inc = inc.replace("-", "/");
    if (req.params.type) {
      query.type = inc;
    }

    db.Location.findAll({
      where: query,
    }).then((dbLocation) => {
      return res.json(dbLocation);
    });
  });

  // FIND ONE
  app.get("/api/locations/:id", (req, res) => {
    db.Location.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    }).then((dbLocation) => res.json(dbLocation));
  });

  // CREATE NEW LOCATION
  app.post("/api/locations", (req, res) => {
    db.Location.create(req.body).then((dbLocation) => res.json(dbLocation));
  });

  // UPDATES LOCATION
  app.put("/api/locations", (req, res) => {
    db.Location.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbLocation) => res.json(dbLocation));
  });

  // DELETE LOCATION
  app.delete("/api/locations/:id", (req, res) => {
    db.Location.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbLocation) => res.json(dbLocation));
  });
};

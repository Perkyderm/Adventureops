const db = require('../models');

module.exports = (app) => {

    // BOILER PLATE routes codes --- might change ???

    // FIND ALL
    app.get('/api/locations', (req, res) => { });

    // FIND ONE 
    app.get('/api/locations/:id', (req, res) => { });

    // CREATE NEW LOCATION
    app.post('/api/locations', (req, res) => { 
        db.Location.create(req.body).then((dbLocation) => res.json(dbLocation))
    });

    // UPDATES LOCATION
    app.put('/api/locations', (req, res) => { });

    // DELETE LOCATION
    app.delete('/api/locations/:id', (req, res) => { 
        db.Location.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbLocation) => res.json(dbLocation))
    });

};
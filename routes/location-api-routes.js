const db = require('../models');

module.exports = (app) => {

    // BOILER PLATE routes codes --- might change ???

    // FIND ALL
    app.get('/api/locations', (req, res) => { });

    // FIND ONE 
    app.get('/api/locations/:id', (req, res) => { });

    // CREATE NEW LOCATION
    app.post('/api/locations', (req, res) => { });

    // UPDATES LOCATION
    app.put('/api/locations', (req, res) => { });

    // DELETE LOCATION
    app.delete('/api/locations/:id', (req, res) => { });

};
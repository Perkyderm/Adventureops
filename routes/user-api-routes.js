const db = require('../models');

module.exports = (app) => {

    // BOILER PLATE routes codes --- might change ???

    // FIND ALL
    app.get('/api/users', (req, res) => {});

    // FIND ONE 
    app.get('/api/users/:id', (req, res) => {});

    // CREATE NEW USER
    app.post('/api/users', (req, res) => {});

    // DELETE USER
    app.delete('/api/users/:id', (req, res) => {});

};
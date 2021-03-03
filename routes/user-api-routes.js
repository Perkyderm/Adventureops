const db = require('../models');

module.exports = (app) => {

    // BOILER PLATE routes codes --- might change ???

    // FIND ALL
    app.get('/api/users', (req, res) => {});

    // FIND ONE 
    app.get('/api/users/:id', (req, res) => {});

    // CREATE NEW USER
    app.post('/api/users', (req, res) => {
        db.User.create(req.body).then((dbUser) => res.json(dbUser));
    });

    // DELETE USER
    app.delete('/api/users/:id', (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id,
            },
            include: [db.Post],
            include: [db.Location]
        }).then((dbUser) => res.json(dbUser))
    });

};
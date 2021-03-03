const db = require('../models');

module.exports = (app) => {

    // BOILER PLATE routes codes --- might change ???

    // FIND ALL
    app.get('/api/posts', (req, res) => { });

    // FIND ONE 
    app.get('/api/posts/:id', (req, res) => { });

    // CREATE NEW POST
    app.post('/api/posts', (req, res) => { 
        db.Post.create(req.body).then((dbPost) => res.json(dbPost))
    });

    // UPDATES POST
    app.put('/api/posts', (req, res) => {});

    // DELETE POST
    app.delete('/api/posts/:id', (req, res) => { 
        db.Post.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbPost) => res.json(dbPost));
    });

};
var Recept = require('../models/recept.js');

exports.postRecepts = function (req, res) {
    var recept = new Recept();

    console.log(req.body);

    //set recept properties from body here
    recept.receptUrl = req.body.receptUrl;
    recept.titel     = req.body.Titel;
    recept.imageUrl = req.body.imageUrl;
    recept.receptTekst = req.body.receptTekst;

    //save recept
    recept.save(function (err) {
        if (err)
            res.send(err);

        res.json('Recept added')
    })
};

exports.getRecepts = function (req, res) {
    Recept.find(function (err, recepten) {
        if (err)
            res.send(err);

        res.json({ data: recepten });
    })
}

exports.getRecept = function (req, res) {
    Recept.findById(req.params.recept_id, function (err, recept) {
        if (err)
            res.send(err);

        res.json({ data: recept });
    })
}

exports.putRecept = function (req, res) {
    Recept.findById(req.params.recept_id, function (err, recept) {
        if (err)
            res.send(err);

        // Update the recept attr
        recept.name = req.body.name;

        recept.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Recept saved', recept });
        });
    });
};

exports.deleteRecept = function (req, res) {
    Recept.findByIdAndRemove(req.params.recept_id, function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Recept removed!' });
    });
};
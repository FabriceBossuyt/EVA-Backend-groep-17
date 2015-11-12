var Challenge = require('../models/challenge.js');

exports.postChallenges = function (req, res) {
    var challenge = new Challenge();
    //set challenge properties from body here

    //save challenge
    challenge.save(function (err) {
        if (err)
            res.send(err);

        res.json( 'Challenge added' )
    })
};

exports.getChallenges = function (req, res) {
    Challenge.find(function (err, challenges) {
        if (err)
            res.send(err);
        res.json({ data: challenges });
    })
}

exports.getChallenge = function (req, res) {
    Challenge.findById(req.params.challenge_id, function (err, challenge) {
        if (err)
            res.send(err);

        res.json({ data: challenge });
    })
}

exports.putChallenge = function (req, res) {
    Challenge.findById(req.params.challenge_id, function (err, challenge) {
        if (err)
            res.send(err);

        // Update the challenge attr
        challenge.name = req.body.name;

        challenge.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Challenge saved', challenge });
        });
    });
};

exports.deleteChallenge = function (req, res) {
    Challenge.findByIdAndRemove(req.params.challenge_id, function (err) {
        if (err)
            res.send(err);

        res.json('Challenge removed!');
    });
};






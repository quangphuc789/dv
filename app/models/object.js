// Import modules
const ObjectId = require('mongodb').ObjectID;
const extract = require('../helpers/extract');

// Export module
module.exports = {
    get: function(req, res, next) {
        var id = req.param('id');
        if (req.query.timestamp !== undefined && req.query.timestamp !== null) {
            var max_timestamp = parseInt(req.query.timestamp);
            db.collection('object').find({key: id, timestamp: {$lte: max_timestamp}})
                                    .sort({timestamp: -1})
                                    // .limit(1)
                                    .toArray(function(err, results) {
                res.send(extract(results));
            });  
        } else {
            db.collection('object').find({key: id})
                                    .sort({timestamp: -1})
                                    // .limit(1)
                                    .toArray(function(err, results) {
                res.send(extract(results));
            });  
        }
    },
    post: function (req, res) {
        // Prepare payload
        var payload = {};

        // Generate unix timestamp
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                payload.key = key;
                payload.value = req.body[key];
                payload.timestamp = Math.round(new Date().getTime()/1000);
                break;
            }
        }

        // Add new object
        db.collection('object').save(payload, function (err, result) {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                res.send(true);
            }
        })
    }
}
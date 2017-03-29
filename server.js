const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://quangphuc789:quangphuc789@ds145370.mlab.com:45370/night-mare-hooray', function (err, database) {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000');
    })
})

app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, function() {
//     console.log('listening on 3000')
// })

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.post('/quotes', function (req, res) {
    // console.log(req.body);
    // res.send(req.body);
    db.collection('quotes').save(req.body, function (err, result) {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    })
})
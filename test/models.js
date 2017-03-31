var should = require('should'); 
var request = require('supertest');  
var MongoClient = require('mongodb').MongoClient;
var dbConfig = require('../app/config/database');

describe('Routing', function() {
    var url = 'http://54.169.173.133:3000/';
    before(function(done) {
        // In our tests we use the test db
        MongoClient.connect(dbConfig, function (err, database) {
            if (err) {
                return console.log(err);
            }

            // Assign database connection
            db = database;
        })                         
        done();
    });

    describe('Object', function() {
        it('should return status 200 trying to ping the server', function(done) {
            request(url)
                .get('')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.equal(200);
                    done();
                });
        });

        it('should correctly create new object', function(done){
            var body = 'aaa=999';
            request(url)
                .post('object')
                .send(body)
                .expect('Content-Type', /json/)
                // .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res);
                    res.status.should.equal(200);
                    done();
                });
        });

        it('should correctly create new object', function(done){
            var body = 'aaa=1000';
            request(url)
                .post('object')
                .send(body)
                .expect('Content-Type', /json/)
                // .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res);
                    res.status.should.equal(200);
                    done();
                });
        });
    });
});
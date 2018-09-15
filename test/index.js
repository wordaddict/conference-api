const config = require('../config/config');
const { Test } = require('../models/talks');


// Require dependencies
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should  = chai.should();

chai.use(chaiHttp);

// Our main block
describe('Test', () => {
  beforeEach((done) => {
    Test.remove({}, () => {
      done();
    });
  });
});

// Testing post talks
describe('/Post new Talks', () => {
  it('should respond with data on post', (done) => {
    chai.request(app)
      .post('/talk')
      .send({
            "title":"python",
            "abstract":"amazing language",
            "room": 765,
            "speaker": {
                "name": "Micheal",
                "company": "Terra",
                "email": "madeyinka6@gmail.com",
                "bio": "Result driven software engineer"
            }
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });
});

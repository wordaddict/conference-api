const config = require('../config/config');
const Test = require('../models/talks');
const Attendee = require('../models/attendees');


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

describe('Attendee', () => {
  beforeEach((done) => {
    Attendee.remove({}, () => {
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
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("Talk has been registered successfully");
        done();
      });
  });
});

// Test post attendee

describe('/Post new Attendee', () => {
  it('should respond with data on post Attendee', (done) => {
    chai.request(app)
      .post('/attendee')
      .send({
            "name":"micbb",
            "company":"chatit",
            "email": "yespeople@example.com"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("Attendee has been registered successfully");
        done();
      });
  });
});

// Add attendees to talk

describe('/Add new attendee to talk', () => {
  it('should respond with data on talk', (done) => {
    chai.request(app)
      .post('/conf')
      .send({
          "name": "tosin",
          "title": "java"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("Attendee has been added to talk successfully");
        done();
      });
  });
});

// Remove a talk

describe('/Remove a talk', () => {
  it('should respond with data on delete', (done) => {
    chai.request(app)
      .del('/talk/python')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("Talk has been removed successfully");
        done();
      });
  });
});

// Empty payload

describe('/Post empty body', () => {
  it('should respond with an error message', (done) => {
    chai.request(app)
    .post('/conf')
    .send({
    })
    .end((err, res) => {
      if (err) done(err);
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.should.have.property('code');
      res.body.should.have.property('message').eql("The payload body is empty");
      done();
      });
  });
});

// Not pass title for talk

describe('/Post data without title', () => {
  it('should respond with incomplete data', (done) => {
    chai.request(app)
    .post('/talk')
    .send({
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
      res.body.should.have.property('code');
      res.body.should.have.property('message').eql("Kindly provide all title for the talk");
      done();
      });
  });
});
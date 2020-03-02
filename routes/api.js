var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Mechanic = require("../models/mechanic");

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 300000 // 5 minutes
          });
          // return the information including token as JSON
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

router.get('/signout', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.logout();
  res.json({ success: true, msg: 'Sign out successfully.' });
});

router.post('/mechanic', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newMechanic = new Mechanic({
      name: req.body.name,
      title: req.body.title,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state
    });

    newMechanic.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Save mechanic failed.' });
      }
      res.json({ success: true, msg: 'Successful created new mechanic.' });
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.get('/mechanic', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    Mechanic.find(function (err, Mechanics) {
      if (err) return next(err);
      res.json(Mechanics);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.get('/mechanic/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Mechanic.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.put('/mechanic/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token){
    Mechanic.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
  } else{
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.delete('/mechanic/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token){
    Mechanic.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
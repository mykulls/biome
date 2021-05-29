const express = require('express');

const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user');

router.get('/listings', (req, res) => {
  Listing.find({})
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.post('/listings', (req, res) => {
  const { body } = req;
  if (body.address && body.city && body.zip) {
    Listing.create(body)
      .then((data) => res.json(data))
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    Object.keys(Listing.schema.obj).forEach((key) => {
      if (!(key in body)) {
        res.json({
          error: `The ${key} field is empty`,
        });
      }
    });
  }
});

router.delete('/listings/:id', (req, res) => {
  Listing.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.get('/listings/:id', (req, res) => {
  Listing.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.get('/users', (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.post('/users', (req, res) => {
  const { body } = req;
  if (body._id && body.email && body.firstName && body.lastName) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    Object.keys(User.schema.obj).forEach((key) => {
      if (!(key in body)) {
        res.json({
          error: `The ${key} field is empty`,
        });
      }
    });
  }
});

router.delete('/users/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});
module.exports = router;

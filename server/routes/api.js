const express = require('express');

const router = express.Router();
const Listing = require('../models/listing');

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
    Listing.create(req.body)
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

router.get('/listing/:id', (req, res) => {
  Listing.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

module.exports = router;

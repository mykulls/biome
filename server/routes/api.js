const express = require('express');

const router = express.Router();
const Listing = require('../models/listing');

router.get('/listings', (req, res, next) => {
  Listing.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/listings', (req, res, next) => {
  const { body } = req;
  if (body.name && body.address && body.city && body.zip) {
    Listing.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
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

router.delete('/listings/:id', (req, res, next) => {
  Listing.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;

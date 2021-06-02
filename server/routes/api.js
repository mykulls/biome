const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');

const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user');
require('dotenv').config();

const url = process.env.DB;

// create storage engine
const storage = new GridFsStorage({
  url,
  file: (req, file) => new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'uploads',
      };
      return resolve(fileInfo);
    });
  }),
});

const upload = multer({ storage });

const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

// eslint-disable-next-line no-unused-vars
let gfs;

connect.once('open', () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'uploads',
  });
});

const patchOptions = { new: true, upsert: true };

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

router.patch('/listingPhoto/:id', upload.array('files'), (req, res) => {
  const imagesObj = { $push: { images: req.files } };
  Listing.findByIdAndUpdate(req.params.id, imagesObj, patchOptions)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
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

router.patch('/updateListing/:id', (req, res) => {
  Listing.findByIdAndUpdate(req.params.id, req.body, patchOptions)
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

router.patch('/updateUser/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, patchOptions)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

module.exports = router;

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
  if (body._id && body.email && body.firstName && body.lastName && body.phoneNumber) {
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
/*
router.get('/image/:filename', (req, res, next) => {
    console.log('fetching image');
    // res.send("https://i.imgur.com/dVXUsOg.jpg");
    gfs.find({ filename: req.params.filename })
    .toArray((err, images) => {
      if (!images[0] || images.length === 0){
        console.log('no files available');
        return res.status(200).json({
          success: false,
          message: 'No files available',
        });
      }
      if (images[0].contentType === 'image/jpeg' || images[0].contentType === 'image/png') {
        // render image to browser
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        console.log('not an image');
        res.status(404).json({
          err: 'Not an image',
        });
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
  });
  */
  router.route('/images/:filename')
  .get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No files available',
        });
      }

      if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
        // render image to browser
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        res.status(404).json({
            err: 'Not an image',
        });
      }
    });
  });

module.exports = router;
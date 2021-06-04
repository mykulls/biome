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

const patchOptions = { new: true };

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
    const missing = [];
    Object.keys(Listing.schema.obj).forEach((key) => {
      if (!(key in body) && Listing.schema.obj[key].required) {
        missing.push(key);
      }
    });
    res.status(400).json({
      error: `The following field(s) are missing: ${missing.join(', ')}`,
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
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: 'Listing not found.',
        });
      }

      return res.json(data);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(404).json({
        error: 'Listing not found.',
      });
    });
});

router.get('/listings/:id', (req, res) => {
  Listing.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: 'Listing not found.',
        });
      }

      return res.json(data);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(404).json({
        error: 'Listing not found.',
      });
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
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: 'User not found.',
        });
      }

      return res.json(data);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(404).json({
        error: 'User not found.',
      });
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
    const missing = [];
    Object.keys(User.schema.obj).forEach((key) => {
      if (!(key in body) && User.schema.obj[key].required) {
        missing.push(key);
      }
    });
    res.status(400).json({
      error: `The following field(s) are missing: ${missing.join(', ')}`,
    });
  }
});

router.delete('/users/:id', (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: 'User not found.',
        });
      }

      return res.json(data);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(404).json({
        error: 'User not found.',
      });
    });
});

router.patch('/updateUser/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, patchOptions)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.patch('/updateUsers', (req, res) => {
  User.updateMany({}, req.body)
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e.message);
    });
});

router.get('/images/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No files available',
      });
      return;
    }

    if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png') {
      // render image to browser
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        error: 'Not an image',
      });
    }
  });
});

router.delete('/images/:id', (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (error) => {
    if (error) {
      return res.status(404).json({ error });
    }

    return res.json({
      success: true,
      message: `Image with ID ${req.params.id} deleted`,
    });
  });
});

module.exports = router;

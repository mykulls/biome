/* eslint-disable */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');
const database = require('./models');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// connect to the database
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err));
// Will put function here to intialize new users of different types
function initialize() {
  database.role.estimatedDocumentCount((error, count) => {
    if (!error && count === 0) // if it's a new user with no error
    {
      // eslint-disable-next-line new-cap
      new database.role({
        type: 'regUser',
      }).save((error2) => {
        if (error2) {
          console.log('error', error2);
        }
        console.log('added regUser');
      });
      // new database.role({
      //   type:"admin"
      // }).save(error=>{
      //   if(error)
      //   {
      //     console.log("error",error)
      //   }
      //   console.log("added admin");
      // });
    }
  });
}
// since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

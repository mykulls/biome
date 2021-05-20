/* eslint-disable */
//How users will signUp and signIn
const db = require("./models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.SignUp = (username, password, result)=>
{
    const user = new User({
        username:username,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((error, user) => {
        if (error) {
          result.status(500).send({ message: error });
          return;
        }
        result.send({message: "User registered"});
    });
}
exports.SignIn = (username,password,result) =>
{
    User.findOne({
        username: username
    })
    if(!user)
    {
        return result.status(404).send({message: "No matching username"});
    }
    var validPassword= bcrypt.compareSync(
        password,
        user.password
      );
      if(!validPassword)
      {
        return res.status(401).send({
            accessToken: null,
            message: "Incorrect password"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400});
        result.status(200).send({
            id: user._id,
            username: user.username,
            roles: regUser,
            accessToken: token
          });
}
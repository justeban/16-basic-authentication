'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/** 
 * Create a `mongoose.Schema` instance.
 * @param {string} username
 * @param {string} email
 * @param {string} password
*/
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'petrobots' }],
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(err => {
      throw err;
    });
});

userSchema.pre('findOne', function (next) {
  this.populate('pets');
  next();
});
/** finds the user and verifies that the password given matches the password in the database.
 * @method authenticate
 * @param {Object} auth
 * @param {string} auth.username - the username
 * @param {string} auth.password - the password of user
*/
userSchema.statics.authenticate = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(err => err);
};

/** verifies that the token given matches a particular user
 * @method authorize
 * @param {string} token - a jwt token that contains user._id
*/
userSchema.statics.authorize = function (token) {
  let parsedToken = jwt.verify(token, process.env.SECRET || 'changethis');
  let query = { _id: parsedToken.id };
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(err => err);
};

/** Compares the password given with the password in the database attached to the user.
 * @method comparePassword
 * @param {string} - the password to compare
 */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};
/** Genereates a jwt token that contains the user._id.
 * @method generateToken 
 */
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET || 'changethis');
};

export default mongoose.model('users', userSchema);
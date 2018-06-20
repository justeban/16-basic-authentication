'use strict';

import User from './model.js';

/**
 * A module that checks the authorization headers and authenticates or authorizes the user.
 * @module auth/middleware
 */

export default (req, res, next) => {
/** This authorize() function uses the member function authorize() on the user model
 * @param {string} token - The Token that is sent as a cookie and then set as the bearer token
 */
  let authorize = (token) => {
    User.authorize(token)
      .then(user => {
        if (!user) {
          getAuth();
        } else {
          req.user = user;
          next();
        }
      })
      .catch(next);
  };
  /** This authenticate() function uses the member function authenticate on the user model
   * @param {Object} auth - contains the username and password input
   * @param {string} auth.username - the username
   * @param {string} auth.password - the password of user
   */
  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if (!user) {
          getAuth();
        }
        else {
          req.token = user.generateToken();
          next();
        }
      });
  };

  let getAuth = () => {

    // res.set({
    //   'WWW-Authenticate': 'Basic realm="protected secret stuff"',
    // }).send(401);
    next('bummer');
  };

  try {
    let auth = {};
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      return getAuth();
    }

    if (authHeader.match(/basic/i)) {
      let base64Header = authHeader.replace(/Basic\s+/i, '');
      let base64Buf = Buffer.from(base64Header, 'base64');
      let [username, password] = base64Buf.toString().split(':');
      auth = { username, password };
      authenticate(auth, next);
    }
    else if (authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/Bearer\s+/i, '');
      authorize(token);
    }
    else {
      next();
    }
  } catch (e) {
    next(e);
  }
};
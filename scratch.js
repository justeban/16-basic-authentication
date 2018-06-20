
// Middleware.js





/** This authenticate() function uses the member function authenticate on the user model
   * @param {Object} auth - contains the username and password input
   * @param {string} auth.username - the username
   * @param {string} auth.password - the password of user
   */


// app.js

/**
 * This exports a start and stop function for the server
 * @module app
 */

/**server start */

/** server stop */

// model.js

/** 
 * Create a `mongoose.Schema` instance.
 * @param {string} username
 * @param {string} email
 * @param {password} password
*/

/** finds the user and verifies that the password given matches the password in the database.
 * @method authenticate
 * @param {Object} auth
 * @param {string} auth.username - the username
 * @param {string} auth.password - the password of user
*/

/** verifies that the token given matches a particular user
 * @method authorize
 * @param {string} token - a jwt token that contains user._id
*/

/** Compares the password given with the password in the database attached to the user.
 * @method comparePassword
 * @param {string} - the password to compare
 */

/** Genereates a jwt token that contains the user._id.
 * @method generateToken 
 */
![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

[![Build Status](https://travis-ci.com/justeban/16-basic-authentication.svg?branch=lab-justin)](https://travis-ci.com/justeban/16-basic-authentication)

* **Git Hub Repo:** [https://github.com/justeban/16-basic-authentication/tree/lab-justin](https://github.com/justeban/16-basic-authentication/tree/lab-justin)
* **Heroku App:** [https://basic-auth-16.herokuapp.com/](https://basic-auth-16.herokuapp.com/)
* **Travis Build:** [https://travis-ci.com/justeban/16-basic-authentication](https://travis-ci.com/justeban/16-basic-authentication)

# Overview
This is an app created to simulate authentication and verification for a user. This app is created by Node.js using Express. This app also uses Bcrypt to hash the users password, and JSON Web Token to send an Authentication token to the user. 

# Configuration

Make sure that your MONGODB_URI config var is set in Heroku. 

Necessary dependencies are downloaded. (*located in package.json*)

## Data Models 

This api supports a mongoose 'user' model that is represented by the following: 
```
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});
```
*The User Model also has `authenticate()`, `comparePassword()` and `generateToken()` methods*

## Server Endpoints

**POST** `/api/signup`

* Htting this route with a username

**GET** `api/signin`

### `/api/signin`

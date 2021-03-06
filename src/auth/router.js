'use strict';

import express from 'express';
const authRouter = express.Router();

import Petrobot from '../models/petrobots.js';
import User from './model.js';
import auth from '../auth/middleware.js';

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => { //eslint-disable-line 
  res.cookie('Token', req.token);
  res.send(req.token);
});

authRouter.get('/api/v1/users', (req, res, next) => {
  User.find({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

authRouter.get('/api/v1/users/:id', auth, (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(data => sendJSON(res, data))
    .catch(next);
});

authRouter.post('/api/v1/petrobots', auth, (req, res, next) => { //eslint-disable-line
  let pet = new Petrobot(req.body);
  pet.save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

authRouter.get('/api/v1/petrobots', auth, (req, res, next) => {
  Petrobot.find({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

authRouter.get('/api/v1/petrobots/:id', auth, (req, res, next) => {
  Petrobot.findOne({ _id: req.params.id })
    .then(data => sendJSON(res, data))
    .catch(next);
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default authRouter;
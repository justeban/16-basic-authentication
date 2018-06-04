'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';

authRouter.get('signin', auth, () => {
  
});

export default authRouter;
'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './auth/router.js';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(authRouter);

app.use(notFound);
app.use(errorHandler);

let server = false; 

/**
 * This exports a start and stop function for the server
 * @module app
 */
module.exports = {
  /** server start */
  start: (port) => {
    if (!server) {
      server = app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server Up And Running On Port ${port}`);
      });
    } else {
      console.log('Server Is Already Running');
    }
  },
  /** server stop */
  stop: () => {
    server.close( () => {
      console.log('Server Has Been Stopped');
    });
  },
};



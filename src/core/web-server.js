const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.routes');
const sqliteRoutes = require('../controllers/sqlite.routes');
const cors = require('cors')
const {sequelize} = require("../models/db-sqlite");
class WebServer {
  app = undefined;
  port = 3000;
  server = undefined;

  constructor() {
    this.app = express();
    this._syncDb();
    this.app.use(cors());
    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  stop() {
    this.server.close();
  }

  _syncDb() {
    sequelize.sync();
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
    this.app.use('/', express.static(process.cwd() + '/public'));
    this.app.use('/test-sqlite',sqliteRoutes.initializeRoutes());
  }
}

module.exports = WebServer;
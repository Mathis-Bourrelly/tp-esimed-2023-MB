const express = require('express');
const { DateTime } = require('luxon');
const { expressjwt: jwt } = require("express-jwt");

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initLoggerMiddlware = (app) => {
  app.use((req, res, next) => {
    const begin = new DateTime(new Date());

    res.on('finish', () => {
      const requestDate = begin.toString();
      const remoteIP = `IP: ${req.connection.remoteAddress}`;
      const httpInfo = `${req.method} ${req.baseUrl || req.path}`;

      const end = new DateTime(new Date());
      const requestDurationMs = end.diff(begin).toMillis();
      const requestDuration = `Duration: ${requestDurationMs}ms`;

      console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
    })
    next();
  });
  app.use(
      jwt({
        secret: "motdepasseApp",
        algorithms: ["HS256"],
      }).unless({ path: [{ url: "/auth/login"},{ url: "/users", methods: ["POST"] } ] })
  );
};



exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initLoggerMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });
}

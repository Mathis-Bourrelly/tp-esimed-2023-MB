const express = require('express');
const db = require('../models/db-sqlite');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(db.dbGetUsers());
});
router.post('/', async (req, res) => {
  db.dbCreateUsers(req.body.firstName,req.body.lastName);
  res.status(201).end();
});
exports.initializeRoutes = () => router;

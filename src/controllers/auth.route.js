const userRepository = require("../models/user-repository");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
require('dotenv').config()


router.post('/login',
    body('firstName').not().isEmpty(),
    body('password').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const existingUser = await userRepository.getUserByFirstName(req.body.firstName);
        if (!existingUser) {
            res.sendStatus(401)

        } else {
            if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                const token = jwt.sign({firstName: req.body.firstName}, process.env.MOTDEPASSEAPP);
                res.send(token)
            }
        }
    }
)
;

exports.initializeRoutes = () => router;
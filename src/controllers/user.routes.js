const userRepository = require("../models/user-repository");
const express = require("express");
const {body} = require("express-validator");


const router = express.Router();


router.get('/',async (req, res) => {
  res.send(await userRepository.getUsers());
});

router.get('/:firstName',async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/',
    body('firstName').not().isEmpty().isLength({ min: 5 }),
    body('lastName').not().isEmpty().isLength({ min: 5 }),
    body('password').not().isEmpty().isLength({ min: 5 }),

    async (req, res) => {
  const existingUser = await userRepository.getUserByFirstName(req.body.firstName);

  if (existingUser) {
    throw new Error('Unable to create the user');
  }

  await userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id',async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id',async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});



exports.initializeRoutes = () => router;

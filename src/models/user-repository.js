const { users } = require('./db');
const uuid = require('uuid');
const md5 = require('md5');
const {User} = require("./user.model");

exports.getUsers = () => User.findAll();

exports.getUserByFirstName = (firstName) => {
  return users.find((user) => user.firstName == firstName);
};

exports.createUser = (body) => {
  const hashedPassword = md5(body.password);
  const user = body;
  user.id = uuid.v4();
  user.password = hashedPassword;

  users.push(user);
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? md5(data.password) : foundUser.password;
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users.splice(userIndex, 1);
}

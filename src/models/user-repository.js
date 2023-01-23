const uuid = require('uuid');
const User = require('./user.model')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

exports.getUsers = async () => await User.findAll();

exports.getUserByFirstName = async (firstName) => {
    return await User.findOne({ where : {firstName} });
};
exports.createUser = async (body) => {
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    const user = body;
    user.id = uuid.v4();
    user.password = hashedPassword;
    await User.create(user);
};

exports.updateUser = async (id, data) => {
    const foundUser = await User.findOne({ where : { id } });

    if (!foundUser) {
        throw new Error('User not found');
    }

    await User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    foundUser.firstName = data.firstName || foundUser.firstName;
    foundUser.lastName = data.lastName || foundUser.lastName;
    if (bcrypt.compareSync(body.password, hash)) {
        foundUser.password = bcrypt.hashSync(body.password, salt);
    }

    exports.deleteUser = async (id) => {
        await User.destroy({ where : { id }});
    }
}

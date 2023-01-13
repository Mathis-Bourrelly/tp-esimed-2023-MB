const {Sequelize} = require("sequelize");
exports.sequelize = new Sequelize('sqlite::memory:');
const {User} = require("./user.model");

    exports.dbCreateUsers = async function createUser(firstName, lastName) {
        let i = 1;
        await User.create({
            id: i,
            firstName: firstName,
            lastName: lastName
        })
        i++
    };

    exports.dbGetUsers = async function getUsers() {
        let allUsers;
        allUsers = await User.findAll();
        return allUsers;
    }

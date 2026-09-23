const bcrypt = require("bcrypt");

const SALT_ROUND = 10;

const hashPassword = async (password) => {
   return await bcrypt.hash(password, SALT_ROUND);
};

const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};

module.exports = { 
    hashPassword,
    comparePassword
};
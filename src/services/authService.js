const userModel = require("../models/userModels");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

const signup = async (name, email, password) => {
    email = email.trim().toLowerCase();

    const existUser = await userModel.findUserByEmail(email);

    if (existUser) {
       throw new Error("User Already Exists");
    }

    const hashpassword = await hashPassword(password);

    const createdUser = await userModel.createUser(name, email, hashpassword);

    const token = generateToken(createdUser);

    return {
        user: createdUser,
        token,
    }

};

const login = async(email, password) => {
   email = email.trim().toLowerCase();

   const user = await userModel.findUserByEmail(email);

   if(!user) {
      throw new Error ("Invaild email or password");
   };

   const isPasswordValid = await comparePassword(password, user.password);

   if(!isPasswordValid) {
      throw new Error("Invaild email or password");
   };

     // Generate JWT
  const token = generateToken(user);

  // Never return password
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return {
    user: safeUser,
    token,
  };

};


module.exports = {signup, login};
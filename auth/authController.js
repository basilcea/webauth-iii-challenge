const encrypt = require("../middleware/myCrypt");
const bcrypt = require("bcryptjs");
const checkLogin =  require('../middleware/auth');
const Users = require("./authModel");
const status = (res, code, data) => {
  return res.status(code).json(data);
};
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getAllUsers = await Users.getByUsername(username);
    if(!!getAllUsers){
      status(res , 400 ,'Username already exists')
    }
    const hashPassword = encrypt.crypted.hashPassword(encrypt.customCrypt, password, 12);
    const AddUser = await Users.addUser(username, hashPassword);
    status(res, 201, AddUser);
  } catch (err) {
    status(res, 500,err.toString());
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await Users.getByUsername(username);
    if (!getUser) {
      status(res, 404, "Username does not exist");
    }
    if (!encrypt.crypted.comparePassword(encrypt.customCrypt, password, getUser.password)) {
      status(res, 404, "Wrong Password");
    }
    const token = checkLogin.generateToken(getUser)

    status(res, 200, `Welcome ${getUser.username}, token:${token}`);
  } catch (err) {
    status(res, 500, err.toString());
  }
};
const getUsers = async (req,res) => {
  try{
    const getAllUsers = await Users.getUsers()
    status(res ,200 , getAllUsers)
  }
  catch(err){
    status(res, 500 , "Cannot fetch users" )
  }
};
module.exports = {
  register,
  login,
  getUsers
};

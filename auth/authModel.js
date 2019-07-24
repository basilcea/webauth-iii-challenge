const db = require("../data/dbConfig");

const addUser = async (username, password) => {
   await db("users").insert({ username, password });
  return getByUsername(username);
};
const getUsers = () => {
;
  const getAllUsers = await db("users");
  return getAllUsers;
};
const getByUsername = async username => {
  getUser = await db("users").where("username", username).first();
  return getUser;
};
module.exports = {
  addUser,
  getUsers,
  getByUsername
};

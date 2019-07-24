const express = require("express");
const Auth = require("./authController");
const checkLogin = require("../middleware/auth");
const validateDetails = require("../data/validations");
const router = express.Router();
router.post("/auth/register", validateDetails, Auth.register);
router.post("/auth/login", validateDetails, Auth.login);
router.get("/restricted/users", checkLogin.Auth, Auth.getUsers);
router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } else {
          res.send('good bye');
        }
      });
    }
  })
module.exports = router;

const  dotenv = require('dotenv')
const  Users = require('../auth/authModel')
const jwt = require('jsonwebtoken');
dotenv.config()
// const Auth =(req, res, next)=> {``
//     if (req.session && req.session.user) {
//         next();
//       } else {
//         res.status(401).json({ message: 'you shall not pass!!' });
//       }
// };
  // eslint-disable-next-line consistent-return
  const auth = async (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1] || req.params.token;
    // check if token exists
 
    try {
      if (!token) {
        return res.status(401).send({
          status: 401,
          error: 'You need to Login',
        });
      }
      const decrypt = await jwt.verify(token, process.env.SECRET);
      const rows  = await Users.getByUsername(decrypt.username);
      // check if token has expired
      if (!rows) {
        return res.status(403).json({
          status: 403,
          error: ' Token Not accessible',
        });
      }
      req.user = {
        id: decrypt.id,
        usernname: decrypt.firstname,
      };
      next();
    } catch (error) {
      return res.status(501).json({
        status: 501,
        error: error.toString(),
      });
    }
  }


const generateToken =(user) => {
  const payload = {
    subject: user.id, 
    username: user.username,
  };

  const options = {
    expiresIn: '1d', 
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, process.env.SECRET, options); // this method is synchronous
}
module.exports = { auth , generateToken};
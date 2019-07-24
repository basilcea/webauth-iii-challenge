const status = (res, code, data) => {
  return res.status(code).json(data);
};
const validateDetails = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      status(res, 400, "Missing Username Feild");
    }
    if (!password) {
      status(res, 400, "Missing Password Field");
    }
    next();
  } catch (err) {
    status(res, 500, "Something Failed");
  }
};
module.exports = validateDetails;

const jwt = require("jsonwebtoken");
const ensureAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ msg: "Unauthorized Jwt Tokken" });
  } else
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify;

      next();
    } catch (error) {
      console.log(error);
    }
};

module.exports = ensureAuthenticated;

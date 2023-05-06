const jwt = require("jsonwebtoken");
const validator = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    const decoded = jwt.verify(token, "private_key");
    console.log(decoded.isAdmin);
    if (!decoded.isAdmin) {
        res.status(200).send({ msg: "You are not a Admin,So you can not add book" });
    }else{
        next()
    }
}else{
    res.status(200).send({"msg":"Please Login first"})
}

}

module.exports = { validator };

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.header("authorization");
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      //Add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      res.status(403).json({ info: "Access Denied" });
    }
  } else {
    //If header is undefined return Forbidden (403)
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};

export default auth;

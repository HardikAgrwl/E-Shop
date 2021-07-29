import bcrypt from "bcryptjs";
import User from "../models/user.js";

//@route POST api/users/register
//@desc Register User and return jwt
//@access Public

export const register = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ info: "Email already exists" });
    const { name, email, password } = req.body;
    let d = new Date();
    const newuser = new User({
      name: name,
      email: email.toLowerCase(),
      password: password,
      date_added: `${d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()}`,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newuser.password, salt, (err, hash) => {
        if (err) throw err;
        newuser.password = hash;
        newuser
          .save()
          .then((user) => {
            const payload = {
              id: user._id,
            };
            //sign token
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              {
                expiresIn: 3600, // 1hr in seconds
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    });
  });
};

//@route POST api/users/login
//@desc login user and return jwt
//@access Public

export const login = (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (!user) return res.status(400).json({ info: "Email not found" });
    const { password } = req.body;
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        //Create JWT payload
        const payload = {
          id: user._id,
        };

        //sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 3600, // 1hr in seconds
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      } else return res.status(400).json({ info: "password incorrect" });
    });
  });
};

//@route POST api/users/user
//@desc get user details
//@access private
export const get_user = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};

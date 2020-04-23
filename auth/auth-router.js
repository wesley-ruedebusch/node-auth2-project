const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/user-model.js");
const secrets = require("../api/secrets.js");

router.post("/register", (req, res) => {
    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
        .then(reg => {
            res.status(201).json(reg);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
        })
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            console.log(user);
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: "Welcome back!", token });
            } else {
                res.status(401).json({ message: "Username or password incorrect" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "You shall not pass!" })
        })
});

function generateToken(user) {
  // the data
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
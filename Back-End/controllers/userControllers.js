let users = [];

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Post สมัครสมาชิค
const registerUser = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await users.find((user) => user.username === username);
  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    users.push({ username, hashedPassword, name });
    res.status(201).send("User created");
  }
};

//Post Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await users.find((user) => user.username === username);
  if (!targetUser) {
    res.status(400).send({ message: "username or password is wrong" });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.hashedPassword
    );
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.name,
        id: targetUser.username,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY , { expiresIn: 3600 });

      res.status(200).send({
        token: token,
        message: "Login successful",
      });
    } else {
      res.status(400).send({ message: "username or password is wrong" });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  users
};

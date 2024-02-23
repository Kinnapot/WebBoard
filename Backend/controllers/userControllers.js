// data base for id password
const { dataUsers } = require("../model/dataUsers")

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Function Post for register
const registerUser = async (req, res) => {
  const { username, password, name } = req.body;

  const targetUser = await dataUsers.find((user) => user.username === username);

  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    // bycypt system for hashpassword 
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    dataUsers.push({ username, hashedPassword, name });
    res.status(201).send("User created");
  }
};

//Function Post for Login
const loginUser = async (req, res) => {

  const { username, password } = req.body;


  const targetUser = await dataUsers.find((user) => user.username === username);

  if (!targetUser) {
    res.status(400).send({ message: "username or password is wrong" });
  } else {

    //bcrypt and JWT system
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.hashedPassword
    );
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.name,
        id: targetUser.username,
      };

      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 3600,
      });
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
};

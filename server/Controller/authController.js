const { pool, hashedPassword, correctPassword } = require("../db");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  //! CHECK IF USER EXISTS
  const { username, email, password, profilePic } = req.body;

  const query = `SELECT * FROM users WHERE email=? OR username=?`;

  pool.query(query, [email, username], async (err, result) => {
    if (err) return console.log(err.message);

    if (result.length === 1)
      return res.status(200).json({
        status: 401,
        message: "User already exists",
      });

    //! HASH PASSWORD AND CREATE USER
    const hashPassword = await hashedPassword(password);

    const query = `INSERT INTO users (username,email,password,profilePic) VALUES (?,?,?,?)`;

    pool.query(
      query,
      [username, email, hashPassword, profilePic],
      (err, result) => {
        if (err) return console.log(err);

        res.status(200).json({ message: "user created successfully", result });
      }
    );
  });
};

exports.login = (req, res) => {
  //! CHECK USER
  const { username } = req.body;

  const query = `SELECT * FROM users WHERE username=?`;

  pool.query(query, [username], async (err, result) => {
    if (err) return console.log(err.message);

    if (result.length === 0)
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
      });

    //! CHECK PASSWORD
    if (!(await correctPassword(req.body.password, result[0].password))) {
      return res.status(404).json({
        status: "Fail",
        message: "Wrong username or password",
      });
    }

    const token = jwt.sign({ id: result[0].id }, "jwtkey", { expiresIn: "5d" });

    const { password, ...other } = result[0];

    res.status(200).json({
      other,
      token,
    });
  });
};

exports.logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({
      message: "You have been logged out",
    });
};

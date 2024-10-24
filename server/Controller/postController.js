const { pool } = require("../db");
const jwt = require("jsonwebtoken");

exports.getPosts = (req, res) => {
  const query = req.query.cat
    ? `SELECT * FROM posts WHERE cat=?`
    : `SELECT * FROM posts`;

  pool.query(query, [req.query.cat], (err, result) => {
    if (err) return console.log(err.message);
    else {
      res.status(200).json({
        message: "success",
        result,
      });
    }
  });
};

exports.getPost = (req, res) => {
  const query = `SELECT p.id,
                        username, 
                        title,
                        details,
                        p.img,
                        u.profilePic AS userImg,
                        cat,
                        date
                        FROM users u
                        JOIN posts p
                        ON u.id = p.uid WHERE p.id=?`;

  pool.query(query, [req.params.id], (err, result) => {
    if (err) return console.log(err.message);
    else {
      res.status(200).json({ message: "success", result });
    }
  });
};

exports.addPosts = (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("token not found");
    return res.status(404).json({ message: "Not authenticated" });
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(404).json({ message: "Token is not valid" });

    const values = [
      req.body.title,
      req.body.details,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    const query = `INSERT INTO posts (title,details,img,cat,date,uid) VALUES (?)`;
    pool.query(query, [values], (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.status(200).json({ message: "Post has been created" });
      }
    });
  });
};

exports.deletePosts = (req, res) => {
  const { postID, token } = JSON.parse(req.params.id);

  if (!token) {
    console.log("token not found");
    return res.status(404).json({ message: "Not authenticated" });
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(404).json({ message: "Token is not valid" });

    const query = `DELETE FROM posts WHERE id=? AND uid=? `;

    pool.query(query, [postID, userInfo.id], (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(404).json({ message: "You can delete only your post!" });
      } else {
        res.status(200).json({ message: "Post deleted successfully" });
      }
    });
  });
};

exports.updatePosts = (req, res) => {
  const { token } = req.body;
  console.log(req.params.id);
  if (!token) {
    console.log("token not found");
    return res.status(404).json({ message: "Not authenticated" });
  }
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(404).json({ message: "Token is not valid" });

    const values = [
      req.body.title,
      req.body.details,
      req.body.img,
      req.body.cat,
    ];
    const query = `UPDATE posts SET title=?, details=?, img=?, cat=? WHERE id=? AND uid=?`;

    pool.query(
      query,
      [...values, req.params.id, userInfo.id],

      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.status(200).json({ message: "Post has been updated" });
        }
      }
    );
  });
};

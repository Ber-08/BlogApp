const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postsRoute");
// const userRoutes = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.status(500).json({
    message: "route not found",
  });
});

module.exports = app;

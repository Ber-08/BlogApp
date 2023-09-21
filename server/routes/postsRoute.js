const express = require("express");
const userPosts = require("./../Controller/postController");
const router = express.Router();

router.get("/", userPosts.getPosts);
router.get("/:id", userPosts.getPost);
router.post("/", userPosts.addPosts);
router.delete("/:id", userPosts.deletePosts);
router.put("/:id", userPosts.updatePosts);

module.exports = router;

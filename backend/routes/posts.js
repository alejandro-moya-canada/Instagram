const express = require("express");

const extractFile = require("../middleware/file");


const PostController = require("../controllers/posts");

const router = express.Router();

router.post("", extractFile, PostController.createPost);

module.exports = router;
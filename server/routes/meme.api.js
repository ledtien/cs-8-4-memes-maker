const express = require("express");
const router = express.Router();
const { createMeme, getAllMemes } = require("../controllers/meme.controller");
const upload = require("../middleware/upload.helper").upload;

const photoHelper = require("../middleware/photos.helper");

router.get("/", getAllMemes);

router.post("/", upload.single("image"), photoHelper.resize, createMeme);

module.exports = router;

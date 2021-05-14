const express = require("express");
const router = express.Router();
const { createMeme, getAllMemes } = require("../controllers/meme.controller");
const upload = require("../middleware/upload.helper").upload;

const photoHelper = require("../middleware/photos.helper");

router.get("/", getAllMemes);

router.post(
  "/",
  upload.single("image"),
  photoHelper.resize,
  createMeme,
  (req, res, next) => {
    console.log(req.file);
    res.json({ status: "ok" });
  }
);

module.exports = router;

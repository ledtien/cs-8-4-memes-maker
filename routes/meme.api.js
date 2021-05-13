const express = require("express");
const router = express.Router();
const memeController = require("../controllers/meme.controller");

const upload = require("../middleware/upload.helper").upload;

const photoHelper = require("../middleware/photos.helper");

router.get("/", function (req, res, next) {
  res.json({ status: "ok", data: "Get all memes" });
});

router.post(
  "/",
  upload.single("image"),
  photoHelper.resize,
  memeController.createMeme,
  (req, res, next) => {
    console.log(req.file);
    res.json({ status: "ok" });
  }
);

module.exports = router;

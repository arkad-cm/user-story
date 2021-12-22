const express = require("express");
const multer = require("multer");
const SevenSegmentParser = require("./parser");
const router = express.Router();
const upload = multer();

/* GET home page. */
router.get("/", function (req, res) {
  return res.status(200).json({ status: "OK", message: "API is running..." });
});

/* POST Parse and Get Invoice Numbers. */
router.post("/", upload.single("file"), function (req, res) {
  try {
    const data = req.file.buffer.toString().split("\n");
    const parser = new SevenSegmentParser();
    const text = parser.parse(data);
    return res.status(200).send(Buffer.from(text));
  } catch (e) {
    return res
      .status(400)
      .json({ status: "FAILURE", message: "Unable to parse file" });
  }
});

module.exports = router;

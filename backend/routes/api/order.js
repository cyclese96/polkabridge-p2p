const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");

// middleware

// models

router.get("/__test", async (req, res) => {
  try {
    res.status(200).json("orders route working");
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error });
  }
});

module.exports = router;

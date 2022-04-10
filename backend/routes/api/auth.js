const express = require("express");
const router = express.Router();

// middleware

//models

// @route GET /api/auth/v1/__test
// @desc Test route
// @access PUBLIC
router.get("/__test", (req, res) => res.send("auth routes working :)"));

module.exports = router;

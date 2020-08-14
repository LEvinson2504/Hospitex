const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
// const isAuth = require("../middlewares/isAuth");

router.get("/me", authController.me);
router.get("/logout", authController.logout);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

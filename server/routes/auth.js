const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");
// const isAuth = require("../middlewares/isAuth");

router.get("/hospital/me", authController.meHospital);
router.get("/hospital/logout", authController.logoutHospital);
router.post("/hospital/register", authController.registerHospital);
router.post("/hospital/login", authController.loginHospital);

router.get("/user/me", authController.me);
router.get("/user/logout", authController.logout);
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);

router.get("/user/:userId", authController.findUserById);

module.exports = router;

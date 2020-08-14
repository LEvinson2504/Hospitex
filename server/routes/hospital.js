const express = require("express");

const router = express.Router();

const hospitalController = require("../controllers/hospital");
// const isAuth = require("../middlewares/isAuth");

router.post("/add-doctor", hospitalController.addDoctor);
router.put("/update-doctor", hospitalController.addDoctor);
router.delete("/delete-doctor", hospitalController.addDoctor);
router.get("/get-doctor", hospitalController.getDoctor);
router.get("/get-doctors", hospitalController.getDoctors);

module.exports = router;

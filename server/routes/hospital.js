const express = require("express");

const router = express.Router();

const hospitalController = require("../controllers/hospital");
// const isAuth = require("../middlewares/isAuth");

// router.post("/add-doctor", hospitalController.addDoctor);
// router.put("/update-doctor", hospitalController.addDoctor);
// router.delete("/delete-doctor", hospitalController.addDoctor);
router.get("/get-hospital/:hospitalId", hospitalController.getHospital);
router.get("/get-doctors/:hospitalId", hospitalController.getDoctors);

router.get("/get-hospitals", hospitalController.getHospitals);
router.get("/get-doctors", hospitalController.getAllDoctors);
router.get("/get-doctor", hospitalController.getDoctor);
router.post("/push-doctor", hospitalController.pushDoctor);
router.post("/pop-doctor", hospitalController.popDoctor);

module.exports = router;

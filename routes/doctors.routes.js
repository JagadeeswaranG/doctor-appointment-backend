var express = require('express');
const { register, allDoctors, deleteDoctor } = require('../controller/doctors.controller');
var router = express.Router();
const mongodb = require("mongodb");

/* Doctors Route */
router.post('/register', register);

router.get('/', allDoctors);

router.delete("/:doctorId", deleteDoctor);

module.exports = router;

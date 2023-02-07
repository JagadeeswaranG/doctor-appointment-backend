var express = require('express');
const { applyAppointment, confirmSendmail } = require('../controller/patientAppointment.controller');
const { authenticate } = require('../lib/authentication');
var router = express.Router();

/* Applying for Patient Appointment. */
router.post('/apply/:uId', authenticate, applyAppointment);

router.get("/:pId/:uId", authenticate, confirmSendmail);

module.exports = router;

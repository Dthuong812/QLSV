const express = require('express');
const { createStudent, loginStudentController } = require('../controllers/studentController'); 
const studentRouter = express.Router();

studentRouter.post('/register', createStudent);
studentRouter.post('/login', loginStudentController);
module.exports = studentRouter;
const express = require('express');
const { createStudent } = require('../controllers/studentController'); 
const studentRouter = express.Router();

studentRouter.post('/register', createStudent);

module.exports = studentRouter;
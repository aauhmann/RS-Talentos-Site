const express = require('express');
const CourseController = require('../controllers/courseController');
const Course = require('../models/courseModel');

const router = express.Router();
const controller = new CourseController();

router.get("/", (req, res) => {
  res.json(controller.getAllCourses());
});

router.get('/course/:id', (req, res) => {
    const course = controller.getCourse(req.params.id);
    if (course) {
        res.json(course);
    }
});

router.get('/term/:termNum', (req, res) => {
    controller.showTerm(req.params.termNum);
});

router.post('/chosen', (req, res) => {
    const { id } = req.body;
    const result = controller.addCourse(id);
    res.json(result);
});

router.delete('/chosen/:id', (req, res) => {
    const result = controller.removeCourse(req.params.id);
    res.json(result);
});

router.get("/chosen", (req, res) => {
    const result = controller.getChosen();
    console.log('GET /chosen - resultado:', result);
    res.json(result);
});

module.exports = router;
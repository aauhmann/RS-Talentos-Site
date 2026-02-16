const express = require('express');
const CourseController = require('../controllers/courseController');
const Course = require('../models/courseModel');

const router = express.Router();
const controller = new CourseController();

router.get('/course/:id', (req, res) => {
    const course = controller.getCourse(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: "Cadeira não encontrada" });
    }
});

router.get('/term/:termNum', (req, res) => {
    controller.showTerm(req.params.termNum);
    const num = req.params.termNum;
    if (num < 1 || num > 10) {
        res.status(404).json({ message: "Etapa inválida (1 a 10)" });
    }
    else {
        res.json({ message: `Cursos da etapa ${num}` });
    }
});

router.post('/add', (req, res) => {
    const data = req.body;
    const course = new Course(data.id, data.name, data.credits, data.term, data.institute, data.prerequisite); // Reconstructs object
    controller.addCourse(course);
    res.json({ message: "Cadeira adicionada" });
});

router.delete('/remove/:id', (req, res) => {
    const course = controller.getCourse(req.params.id);
    if (course) {
        controller.removeCourse(course);
        res.json({ message: "Cadeira removida" });
    } else {
        res.status(404).json({ message: "Cadeira não encontrada" });
    }
});

module.exports = router;
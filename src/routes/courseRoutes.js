const express = require('express');
const CourseController = require('../controllers/courseController');

const router = express.Router();
const controller = new CourseController();
const chosenByUser = {};
const CHOSEN_EXPIRATION_MS = 2 * 60 * 60 * 1000; // 2 hours

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

function cleanupExpiredChosen() {
  const now = Date.now();
  for (const [userId, data] of Object.entries(chosenByUser)) {
    if (now - data.lastActive > CHOSEN_EXPIRATION_MS) {
      delete chosenByUser[userId];
    }
  }
}

router.use((req, res, next) => {
  cleanupExpiredChosen();
  next();
});

router.post('/chosen', (req, res) => {
    const { id, userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });
    chosenByUser[userId] = chosenByUser[userId] || { chosen: [], lastActive: Date.now() };
    chosenByUser[userId].lastActive = Date.now();
    // Searches for course
    const course = controller.getCourse(id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    // Avoids adding the same course twice
    if (!chosenByUser[userId].chosen.some(c => c.id === id)) {
        chosenByUser[userId].chosen.push(course);
    }
    res.json({ success: true, chosen: chosenByUser[userId] });
});

router.delete('/chosen/:id', (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "userId required" });
    chosenByUser[userId] = chosenByUser[userId] || { chosen: [], lastActive: Date.now() };
    chosenByUser[userId].lastActive = Date.now();
    chosenByUser[userId].chosen = chosenByUser[userId].chosen.filter(course => course.id !== req.params.id);
    res.json({ success: true, chosen: chosenByUser[userId].chosen });
});

router.get("/chosen", (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "userId required" });
    chosenByUser[userId] = chosenByUser[userId] || { chosen: [], lastActive: Date.now() };
    chosenByUser[userId].lastActive = Date.now();
    res.json(chosenByUser[userId].chosen);
});

module.exports = router;
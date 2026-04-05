const CourseService = require('../services/courseService');

class CourseController {
    constructor() {
        this.courseService = new CourseService();
    }

    getCourse(id) {
        return this.courseService.getCourse(id);
    }

    showTerm(term) {
        this.courseService.showTerm(term);
    }

    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    addChosenCourse(req, res) {
        const { courseId, userId } = req.body;
        if (!userId) {
            return { error: "userId required", status: 400 };
        }

        const result = this.courseService.addChosenCourse(courseId, userId);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        return res.json(result);
    }

    getChosenCourses(req, res) {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "userId required" });
        }

        const chosenCourses = this.courseService.getChosenCourses(userId);
        
        return res.json(chosenCourses);
    }
}

module.exports = CourseController;
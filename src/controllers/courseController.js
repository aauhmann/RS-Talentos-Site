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
            return res.status(400).json({ error: "userId required" });
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

    updateChosenCourse(req, res) {
        const courseId = req.params.id;
        const { userId, semesterPlanner } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId required" });
        }

        const result = this.courseService.updateChosenCourse(courseId,
            userId,
            semesterPlanner
        );

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        return res.json(result);
    }

    deleteChosenCourse(req, res) {
        const courseId = req.params.id;
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: "userId required" });
        }

        const result = this.courseService.deleteChosenCourse(courseId, userId);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        return res.json(result);
    }
}

module.exports = CourseController;
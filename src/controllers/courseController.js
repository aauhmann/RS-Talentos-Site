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
}

module.exports = CourseController;
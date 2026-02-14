const CourseService = require('../services/courseService');

class CourseController {
    constructor() {
        this.courseService = new CourseService();
        this.courseService.create(); // Initializes all courses
    }

    getCourse(id) {
        return this.courseService.getCourse(id);
    }

    showTerm(term) {
        this.courseService.showTerm(term);
    }

    addCourse(course) {
        this.courseService.add(course);
    }

    removeCourse(course) {
        this.courseService.remove(course);
    }

    showChosen() {
        this.courseService.showChosen();
    }
}

module.exports = CourseController;
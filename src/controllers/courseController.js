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

    addCourse(course) {
        this.courseService.addToChosen(course);
    }

    removeCourse(course) {
        this.courseService.removeFromChosen(course);
    }

    showChosen() {
        this.courseService.showChosen();
    }
}

module.exports = CourseController;
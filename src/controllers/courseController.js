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

    addCourse(id) {
        const course = this.courseService.getCourse(id);
        if (!course) {
            return { success: false, message: 'Curso não encontrado' };
        }
        const added = this.courseService.addToChosen(course);
        return { success: added, chosen: this.courseService.getChosen() };
    }

    removeCourse(id) {
        const course = this.courseService.getCourse(id);
        if (!course) {
            return { success: false, message: 'Curso não encontrado' };
        }
        this.courseService.removeFromChosen(course);
        return { success: true, chosen: this.courseService.getChosen() };
    }

    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    getChosen() {
        const result = this.courseService.getChosen();
        return result;
    }
}

module.exports = CourseController;
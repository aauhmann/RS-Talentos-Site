const Course = require('../models/courseModel');

class CourseService {
    #courses

    constructor() {
        this.#courses = [];
        this.chosen = [];
    }
    
    create() { // Creates all courses
        const course = new Course("INF01808", "Algoritmos e Programacao", 6, 1, "Instituto de Informatica", null);
        this.#courses.push(course);

        // Include all courses here
    }

    getCourse(id) {
        return this.#courses.find(c => c.id === id); // Returns the selected course if found
    }

    showTerm(termNum) { // Shows all courses of a chosen term
        const filtered = this.#courses.filter(course => course.term === termNum);

        filtered.forEach(course => course.show()); // Shows the courses
    }

    add(course) {
        if (this.chosen.some(c => c.id === course.id)) { // Checks if it's already in the list
            return;
        }

        this.chosen.push(course); // Adds to the chosen if not in the list
    }

    remove(course) {
        this.chosen = this.chosen.filter(c => c !== course);
    }

    requirements() { // Shows all requirements remaining

    }

    showChosen() { // Shows all current selected courses

    }
}

module.exports = CourseService;
const Course = require('../models/courseModel');

class CourseService {
    #courses

    constructor() {
        this.#courses = [];
        this.chosen = [];
    }
    
    create() { // Creates all courses
        let requisites = [];
        let c = new Course("INF01202", "Algoritmos e Programação - CIC", 6, 1, 0, null);
        this.#courses.push(c);

        c = new Course("MAT01353", "Cálculo e Geometria Analítica 1", 6, 1, 0, null);
        this.#courses.push(c);

        c = new Course("ECP99002", "Introdução à Engenharia de Computação", 2, 1, 0, null);
        this.#courses.push(c);

        c = new Course("FIS01181", "Física 1 - C", 6, 1, 0, null);
        this.#courses.push(c);

        c = new Course("INF05508", "Lógica para Computação", 4, 1, 0, null);
        this.#courses.push(c);

        // Include all courses here
    }

    getCourse(id) {
        return this.#courses.find(c => c.id === id); // Returns the selected course if found
    }

    showTerm(termNum) { // Shows all courses of a chosen term
        return filtered = this.#courses.filter(course => course.term === termNum); // Returns all courses of a chosen term
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
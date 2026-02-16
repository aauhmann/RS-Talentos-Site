const Course = require('../models/courseModel');
const Sheet = require('../models/sheetModel');
const path = require("path");

class CourseService {
    #courses

    constructor() {
        this.#courses = [];
        this.chosen = [];

        let course;
        let index = 1;
        const sheetPath = path.resolve(__dirname, '../assets/Sheet.csv');
        let row = Sheet.readSheetRow(sheetPath, index++);

        while (Array.isArray(row) && row.length !== 0) {
            course = new Course(row);
            this.#courses.push(course);
        
            row = Sheet.readSheetRow(sheetPath, index++);
        }
    }

    getCourse(id) {
        return this.#courses.find(c => c.id === id); // Returns the selected course if found
    }

    showTerm(termNum) { // Shows all courses of a chosen term
        return this.#courses.filter(course => course.term === termNum); // Returns all courses of a chosen term
    }

    addToChosen(course) {
        if (this.chosen.some(c => c.id === course.id)) { // Checks if it's already in the list
            return;
        }

        this.chosen.push(course); // Adds to the chosen list if not in the list
    }

    removeFromChosen(course) {
        this.chosen = this.chosen.filter(c => c !== course);
    }

    getAllCourses() {
        return this.#courses;
    }

    requirements() { // Shows all requirements remaining

    }

    showChosen() { // Shows all current selected courses

    }
}

module.exports = CourseService;
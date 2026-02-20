const Course = require('../models/courseModel');
const Sheet = require('../models/sheetModel');
const path = require("path");

class CourseService {
    #courses

    // Creates all courses available and the current chosen list
    constructor() {
        this.#courses = [];

        let course;
        let index = 1;
        const sheetPath = path.resolve(__dirname, '../assets/Sheet.csv');

        let row = Sheet.readSheetRow(sheetPath, index++);

        // Copies all courses in a Excel sheet to the courses array
        while (Array.isArray(row) && row.length !== 0) {
            if (Number(row[0]) || row[0] == "" || row[0] == "0") {
                course = new Course(row);
                this.#courses.push(course);
            }
        
            row = Sheet.readSheetRow(sheetPath, index++);
        }
    }

    // Returns a chosen course by it's ID
    getCourse(id) {
        return this.#courses.find(c => c.id === id);
    }

    // Shows all courses of a chosen term
    showTerm(termNum) {
        return this.#courses.filter(course => course.term === termNum); // Returns all courses of a chosen term
    }

    getAllCourses() {
        return this.#courses;
    }
}

module.exports = CourseService;
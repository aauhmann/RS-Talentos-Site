const Course = require('../models/courseModel');
const Sheet = require('../models/sheetModel');
const path = require("path");

class CourseService {
    #courses

    // Creates all courses available and the current chosen list
    constructor() {
        this.#courses = [];
        this.chosen = [];
        // this.selected = [];
        // this.creditsSum = [0, 0];

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

    // // Adds a course to the chosen courses array
    // addToChosen(course) {
    //     if (this.chosen.some(c => c.id === course.id)) { // Checks if it's already in the list
    //         return false;
    //     }

    //     this.chosen.push(course); // Adds to the chosen list if not in the list
    //     return true;
    // }

    // // Adds a course from the chosen courses array
    // removeFromChosen(course) {
    //     // if (this.chosen.find(c => c.id === course.id)) {
    //     //     // If chosen was in the array
    //     //     if (course.label == "Obrigatoria" || course.label == "Alternativa") {
    //     //         this.creditsSum[0]--;
    //     //     }
    //     //     else if (course.label == "Eletiva") {
    //     //         this.creditsSum[1]--;
    //     //     }
    //     // }
    //     this.chosen = this.chosen.filter(c => c.id !== course.id);
    //     return true;
    // }

    getAllCourses() {
        return this.#courses;
    }

    // getChosen() { // Shows all current selected courses
    //     return this.chosen || [];
    // }
}

module.exports = CourseService;
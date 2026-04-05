const Course = require('../models/courseModel');
const Sheet = require('../models/sheetModel');
const path = require("path");

const chosenByUser = {};
const CHOSEN_EXPIRATION_MS = 2 * 60 * 60 * 1000; // 2 hours

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

    cleanupExpiredChosen() {
        const now = Date.now();
        for (const [userId, data] of Object.entries(chosenByUser)) {
            if (now - data.lastActive > CHOSEN_EXPIRATION_MS) {
            delete chosenByUser[userId];
            }
        }
    }

    getOrCreateUser(userId) {
        this.cleanupExpiredChosen();

        if (!chosenByUser[userId]) {
            chosenByUser[userId] = {
            chosen: [],
            lastActive: Date.now()
            };
        }

        chosenByUser[userId].lastActive = Date.now();

        return chosenByUser[userId];
    }

    addChosenCourse(courseId, userId) {
        const user = this.getOrCreateUser(userId);
        const course = this.getCourse(courseId);

        if (!course) {
            return { error: "Course not found", status: 404 }; 
        }

        const exists = user.chosen.some(c => c.id === courseId); // Avoids adding the same course twice

        if (!exists) {
            user.chosen.push({ 
                ...course,
                semesterPlanner: 1
             });
        }

        return { success: true, 
            chosen: user.chosen };
    }

    getChosenCourses(userId) {
        const user = this.getOrCreateUser(userId);

        return { success: true, 
            chosen: user.chosen };
    }

    updateChosenCourse(courseId, userId, semesterPlanner) {
        const user = this.getOrCreateUser(userId);
        const course = user.chosen.find(c => c.id === courseId);

        if (!course) {
            return { error: "Course not found", status: 404 }; 
        }

        course.semesterPlanner = semesterPlanner;

        return { success: true, 
            chosen: user.chosen };
    }

    deleteChosenCourse(courseId, userId) {
        const user = this.getOrCreateUser(userId);
        const exists = user.chosen.some(c => c.id === courseId);

        if (!exists) {
            return { error: "Course not found", status: 404 }; 
        }

        user.chosen = user.chosen.filter(c => c.id !== courseId);

        return { success: true, 
            chosen: user.chosen };
    }
}

module.exports = CourseService;
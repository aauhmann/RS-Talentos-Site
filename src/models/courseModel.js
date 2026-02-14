class Course {
    constructor(id, name, credits, term, label, department, requisitesID) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.term = term;
        this.label = label;
        this.department = department;
        this.requisites = requisitesID;
    }

    show() { // Show all info about a chosen course

    }
}

module.exports = Course;
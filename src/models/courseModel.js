class Course {
    constructor(row) {
        this.term = row[0];
        this.label = row[1];
        this.id = row[2];
        this.name = row[3];
        this.hours = row[4];
        this.requisites = row[6];
        this.summary = row[8];
        this.department;
    
        this.credits = this.hours/15;

        let str = this.id.slice(0, 3); // String gets the first 3 letters of the id
        str = str.toUpperCase(); // All letters to uppercase
        switch(str) {
            case "INF":
                this.department = "Instituto de Informática";
                break;
            case "MAT":
                this.department = "Instituto de Matemática e Estatística";
                break;
            case "FIS":
                this.department = "Instituto de Física";
                break;
            case "ENG":
                this.department = "Escola de Engenharia";
                break;
            case "ECO":
                this.department = "Instituto de Economia";
                break;
            case "ECP":
                this.department = "COMGRAD - ECP";
                break;
        }
    }
}

module.exports = Course;
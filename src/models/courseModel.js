class Course {
    constructor(row) {
        // Creates a Course based on a row of an Excel sheet
        this.term = row[0];
        this.label = row[1];
        this.id = row[2];
        this.name = row[3];
        this.hours = row[4];
        this.department = row[5];
        this.requisites = this.parseString(row[6]);
        this.summary = row[8];
    
        this.credits = this.hours/15;

        // Department selection based on it's ID
        // let str = this.id.slice(0, 3); // String gets the first 3 letters of the id
        // str = str.toUpperCase(); // All letters to uppercase
        // switch(str) {
        //     case "INF":
        //         this.department = "Instituto de Informática";
        //         break;
        //     case "MAT":
        //         this.department = "Instituto de Matemática e Estatística";
        //         break;
        //     case "FIS":
        //         this.department = "Instituto de Física";
        //         break;
        //     case "ENG":
        //         this.department = "Escola de Engenharia";
        //         break;
        //     case "ECO":
        //         this.department = "Instituto de Economia";
        //         break;
        //     case "ECP":
        //         this.department = "COMGRAD - ECP";
        //         break;
        // }
    }

    // Parses the string and returns an array of strings
    parseString(str) {
        // Checks if string is empty or filled with ' '
        if (!str || str.trim() === '') {
            return [];
        }

        // Replaces double double quotes with a single double quotes
        let jsonString = str.replace(/"/g, '"');

        // Case where there's a '+' between two pre-requisites
        jsonString = jsonString.replace(/"([^"]+)"\s*\+\s*"([^"]+)"/g, '"$1 + $2"');

        return JSON.parse(jsonString) || [];
    }
}

module.exports = Course;
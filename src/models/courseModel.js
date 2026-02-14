class Course {
    constructor(id, name, credits, term, label, requisitesID) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.term = term;
        this.requisites = requisitesID;

        switch(label) {
            case 0:
                this.label = "Obrigatória";
                break;
            case 1:
                this.label = "Eletiva";
                break;
            case 2:
                this.label = "Alternativa";
                break;
            case 3:
                this.label = "Complementar";
                break;
        }

        string = id.slice(0, 3); // String gets the first 3 letters of the id
        string = string.toUpperCase(); // All letters to uppercase
        switch(string) {
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
        }
    }
}

module.exports = Course;
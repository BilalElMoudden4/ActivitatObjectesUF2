export class Cicle {

    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.dataEdit = 0;
        this.moduls = [];
    }

    setNumEdicions() {
        this.numEdicions++;
        let date = new Date();
        this.dataEdit = date;
    }

    añadirModul(modul) {
        this.moduls.push(modul);
    }

    get ToString() {
        let modulsString = "";
        if (this.moduls.length > 0) {
            this.moduls.forEach(modul => {
                modulsString += modul.toString() + " ";
            });
        } else {
            modulsString = "No tiene ningún módulo";
        }
        return `Datos del ciclo: ${this.nom}, ${this.categoria}, ${this.numAlumnes}, ${this.abreviatura},
                                ${this.numEdicions}, ${this.dataEdit}, Módulos: ${modulsString}`;
    }


}
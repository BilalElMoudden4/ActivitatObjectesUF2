export class Modul {

    constructor(cicle, nom, num, hores) {
        this.cicle = cicle;
        this.nom = nom;
        this.num = num;
        this.hores = hores;
    }

    toString() {
        return `Num: ${this.num}, Nom: ${this.nom}, Hores: ${this.hores}h ` + '\n';
    }

}

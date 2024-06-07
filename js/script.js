import { Cicle } from './Cicle.js';
import { Modul } from './Modul.js';

function calculHores(i) {
    const cicle = llistatCicles[i];
    let calcul = 0;

    if (cicle.moduls.length > 0) {
        calcul = cicle.moduls.reduce((total, mod) => total + parseInt(mod.hores, 10), 0);
    }
    
    alert(`El total de horas es: ${calcul}h`);
}

function editarCicle(i) {
    let cicle = llistatCicles[i];
    cicle.nom = document.getElementById("cicle_nom").value;
    cicle.categoria = document.getElementById("cicle_categoria").value;
    cicle.numAlumnes = document.getElementById("cicle_alumnes").value;
    cicle.abreviatura = document.getElementById("cicle_abr").value;

    cicle.setNumEdicions();
    console.log(`Numero de vegades editat: ${cicle.numEdicions}`)
    console.log(`Hora de l'edició: ${cicle.dataEdit}`)
}

let llistatCicles = [];

function afegirCicle() {
    // Obtener los valores de los campos de entrada
    const nom = document.getElementById("cicle_nom").value;
    const categoria = document.getElementById("cicle_categoria").value;
    const numAlumnes = document.getElementById("cicle_alumnes").value;
    const abreviatura = document.getElementById("cicle_abr").value;
    const idx = document.getElementById("editCicle").value;

    // Crear un nuevo ciclo
    const cicleCreat = new Cicle(nom, categoria, numAlumnes, abreviatura);
    console.log(cicleCreat);

    // Verificar si se está añadiendo un nuevo ciclo o editando uno existente
    if (idx === "-1") {
        afegirCicleAlLlistat(cicleCreat);
    } else {
        editarCicle(idx);
    }

    actualitzarSelector();

    printLlistat(llistatCicles);

    netejarFormularis();

    document.getElementById("editCicle").value = -1;
}

function afegirCicleAlLlistat(nouCicle) {
    llistatCicles.push(nouCicle);
}

document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);



function afegirModul() {

    const cicle = document.getElementById("modul_cicle").value;
    const modul_nom = document.getElementById("modul_nom").value;
    const modul_num = document.getElementById("modul_num").value;
    const modul_hores = document.getElementById("modul_hores").value;

    const modul = new Modul(cicle, modul_nom, modul_num, modul_hores);

    afegirModulACicle(modul);

    printLlistat(llistatCicles);

    netejarFormularis();
}

function afegirModulACicle(modul) {
    if (llistatCicles.hasOwnProperty(modul.cicle)) {
        llistatCicles[modul.cicle].añadirModul(modul);
    } else {
        const nouCicle = new Cicle(modul.cicle);
        nouCicle.añadirModul(modul);
        llistatCicles[modul.cicle] = nouCicle;
    }
}

document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);


//Funció per llistar els cicles
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>
                    <p class="font-normal text-gray-700">Moduls: ${element.moduls}</p>
                    
            
                    <button type="button"  id="${index}_removeCicle" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button"  id="${index}_editCicle"   class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button"  id="${index}_calculHores" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;

    });

    document.getElementById("llistat").innerHTML = str;

    llistat.forEach(function (element, index) {
        document.getElementById(`${index}_removeCicle`).addEventListener("click", function () {
            removeCicle(index);
        });
        document.getElementById(`${index}_editCicle`).addEventListener("click", function () {
            editCicle(index);
        });
        document.getElementById(`${index}_calculHores`).addEventListener("click", function () {
            calculHores(index);
        });
    });
}

function actualitzarSelector() {
    const select = document.getElementById('modul_cicle');
    select.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (const [index, cicle] of llistatCicles.entries()) {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = cicle.nom;
        fragment.appendChild(opt);
    }

    select.appendChild(fragment);
}


//Funció per eliminar un cicle
function removeCicle(i) {
    llistatCicles.splice(i, 1);
    printLlistat(llistatCicles);
}

//Funció per editar un cicle
function editCicle(i) {
    console.log(llistatCicles[i])
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;
    document.getElementById("editCicle").value = i;
}

//Funció per netejar els formularis
function netejarFormularis() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("editCicle").value = "-1";

    let selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}
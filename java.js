// CLASES

class Clientes {
    constructor(nombre, apellido, dni, monto, plazo, veraz) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.dni = dni
            this.monto = monto,
            this.plazo = plazo,
            this.veraz = veraz
    }
}

// ARRAY

let registroClientes = []



const cliente1 = new Clientes("Daniel", "Astrada", 12864871, 40000, 12, 3)
const cliente2 = new Clientes("Jose", "Cortez", 32321542, 250000, 24, 1)
const cliente3 = new Clientes("David", "Hernandez", 22456123, 78000, 36, 1)
const cliente4 = new Clientes("Miguel", "Luna", 34568815, 50000, 6, 2)
const cliente5 = new Clientes("Enrique", "Sosa", 41654789, 150000, 12, 2)

// DOM

let nameP = document.getElementById("nameP")
let surP = document.getElementById("surP")
let dniP = document.getElementById("dniP")
let verazP = document.getElementById("verazP")
let montoP = document.getElementById("montoP")
let plazoP = document.getElementById("plazoP")
let clienteLog = document.getElementById("cliente")

// BOTONES

let btnSoli = document.getElementById("guardarP")
btnSoli.addEventListener("click", solicitarP)

let btnLog = document.getElementById("registroP")
btnLog.addEventListener("click", registroC)

// FUNCIONES

function solicitarP() {
    nombre = nameP.value;
    apellido = surP.value;
    dni = parseInt(dniP.value);
    veraz = parseInt(verazP.value);
    monto = parseInt(montoP.value);
    plazo = parseInt(plazoP.value);

    aDevolverV = ""
    aDevolverP = ""

    analizarV(veraz);
    analizarP(plazo);

    let interesTotal = aDevolverV + aDevolverP
    let aDevolver = monto + interesTotal

    console.log(`Interés por plazo: ${aDevolverP}`)
    console.log(`Interés por veraz: ${aDevolverV}`)
    console.log(`Interés total: ${interesTotal}`)

    let nuevoCl = new Clientes(nombre, apellido, dni, monto, plazo, veraz)

    registroClientes.push(nuevoCl)
    localStorage.setItem("registroClientes", JSON.stringify(registroClientes))
    console.log(registroClientes)

    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Estamos procesando tu solicitud',
        text: `Sr/a ${nuevoCl.nombre} su préstamo de ${nuevoCl.monto} está siendo procesado. Su préstamo a devolver es de ${aDevolver}(${interesTotal} de interés) en ${nuevoCl.plazo} cuotas`,
        showConfirmButton: false,
        timer: 5500
      })
}

function analizarV(veraz) {
    if (veraz = 1) {
        aDevolverV = this.monto * 0.05
    } else if (veraz = 2) {
        aDevolverV = this.monto * 0.12
    } else if (veraz = 3) {
        aDevolverV = this.monto * 0.18
    } else if (veraz = 4) {
        aDevolverV = this.monto * 0.20
    } else if (veraz = 5) {
        aDevolverV = this.monto * 0.22
    } else if (veraz > 5) { // este no funciona y no entiendo porqué
        Swal.fire({
            icon: 'error',
            title: 'Su veraz no es válido',
            text: 'Ingresé su veraz (sit. 1 a 5)',
            footer: '<a href="">Consultar mi veraz</a>'
          })
    }
}

function analizarP(plazo) {
    if (plazo <= 6) {
        aDevolverP = this.monto * 0.06
    } else if (plazo <= 12 && plazo > 6) {
        aDevolverP = this.monto * 0.12
    } else if (plazo <= 18 && plazo > 12) {
        aDevolverP = this.monto * 0.16
    } else if (plazo <= 24 && plazo > 18) {
        aDevolverP = this.monto * 0.20
    } else if (plazo <= 32 && plazo > 24) {
        aDevolverP = this.monto * 0.22
    } else if (plazo > 32){
        Swal.fire({ // este tampoco funciona y no entiendo porqué
            icon: 'error',
            title: 'Plazo inválido',
            text: 'Su plazo de pago excede los TyC',
            footer: '<a href="">Consultar TyC</a>'
          })
    }
}

function registroC() {
    for (e of registroClientes) {

        clienteLog.innerHTML += `<p> Nombre: ${e.nombre} </p>
        <p> Apellido: ${e.apellido} </p>
        <p> DNI: ${e.dni} </p>
        <p> Monto: ${e.monto} </p>
        <p> Veraz: ${e.veraz} </p>
        <p> Plazo: ${e.plazo} </p>`
    }
}

// LOCAL STORAGE

if(localStorage.getItem("registroClientes")){
    registroClientes = JSON.parse(localStorage.getItem("registroClientes"))
    console.log(registroClientes)
}else{
    console.log("Primer seteo de storage")
    registroClientes.push(cliente1, cliente2, cliente3, cliente4, cliente5)
    localStorage.setItem("registroClientes", JSON.stringify(registroClientes))
}
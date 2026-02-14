document.getElementById("script-01").addEventListener("click", () => {
    const entrada = prompt("Ingresa un número")
    const num = parseInt (entrada)

    if (isNaN(num) | num < 0){
        alert("Número no valido")
        console.alert("Numero no valido")
        return
    }

    document.write("<table border='1'>")
    document.write("<tr><th>Numeros</th><th>Cuadrados</th><th>Cubos</th></tr>")

    for(let i = 1; i <= num; i++){
        let cuadrado = i*i
        let cubo = i*i*i
        document.write("<tr><td>"+i+"</td><td>"+cuadrado+"</td><td>"+cubo+"</td></tr>")
    }

    document.write('<br><button onclick="window.location.reload()">Volver al inicio</button>')
})

document.getElementById("script-02").addEventListener("click", ()=> {
    const suma = (Math.floor(Math.random() * 100)) + (Math.floor(Math.random() * 100))
    const inicio = Date.now()
    const entrada = prompt("Ingresa tu resultado")
    const fin = Date.now()
    const tiempo = (fin - inicio) / 1000
    const respuesta = parseInt (entrada)

    if (isNaN(respuesta) | respuesta < 0){
        alert("Resultado no valido")
        console.alert("Resultado no valido")
        return
    }

    if (respuesta === suma){
        alert("Le atinaste y te tardaste: " + tiempo + "segundos")
    } else {
        alert("No le atinaste y eso que te tardaste: " + tiempo + "segundos")
    }

})

function contador(arreglo){
    let negativos = 0, ceros = 0, positivos = 0
    arreglo.forEach(element => {
        if (element < 0) negativos++
        else if ( element === 0) ceros++
        else positivos++
    });

    return {"negativos":negativos, "ceros":ceros, "positivos":positivos}
}

console.assert(contador([-1, 0, 1]).negativos === 1, "Error en negativos");
console.assert(contador([-1, 0, 1]).ceros === 1, "Error en ceros");
console.assert(contador([-1, 0, 1]).positivos === 1, "Error en positivos");

document.getElementById("script-03").addEventListener("click", () =>{
    const datosPrueba = [0, 5, 8, 11, -1, -4, 0, 0, 6, -4, -2, 1, 0, 4, -7, -9, 0, 3]
    const res = contador(datosPrueba)

    document.write(`<h3>Ejercicio 3: Contador</h3>`)
    document.write(`<p>Arreglo: [${datosPrueba}]</p>`)
    document.write(`<p>Negativos: ${res.negativos}, Ceros: ${res.ceros}, Positivos: ${res.positivos}</p>`)
    document.write('<br><button onclick="window.location.reload()">Volver al inicio</button>')
})

function promedios(matriz) {
    return matriz.map((reglon) => { 
        let suma = 0
        reglon.forEach((num) => {
            suma += num
        })
        return suma / reglon.length;
    })
}

const prueba1 = promedios([[10, 10, 10], [5, 5]]); 
console.assert(prueba1[0] === 10, "Error: El promedio de la primera fila debe ser 10");
console.assert(prueba1[1] === 5, "Error: El promedio de la segunda fila debe ser 5");
const prueba2 = promedios([[1, -1], [10, 20]]);
console.assert(prueba2[0] === 0, "Error: El promedio de 1 y -1 debe ser 0");

document.getElementById("script-04").addEventListener("click", () => {
    const matrizPrueba = [
        [1,2,3],
        [4,5,6,7],
        [8,9,10,11,12],
        [13,14,15,16,17,18,19,20]
    ]

    const resultados = promedios(matrizPrueba)
    const contenedor = document.getElementById("resultado-04")
    let html = "<h3>Promedios</h3><ul>";
    resultados.forEach((prom, index) => {
        html += `<li>Promedio del renglón ${index + 1}: <strong>${prom}</strong></li>`;
    });
    html += "</ul>";

    contenedor.innerHTML = html;
})

function inverso(numero){
    const nuevoNumero = numero.toString().split("").reverse().join("") 
    return parseInt(nuevoNumero) * Math.sign(numero)
}

console.assert(inverso(12345) === 54321, "Error");
console.assert(inverso(-195) === -591, "Error");
console.assert(inverso(9876) === 6789, "Error");

document.getElementById("script-05").addEventListener("click", () => {
    const num = prompt("Ingresa un numero")
    const resultado = inverso(num)
    document.getElementById("resultado-05").innerHTML = `Original: ${num} | Invertido: ${resultado}`
})


class CajitaNu {
    constructor(capital, tasaAnual) {
        this.capital = parseFloat(capital)
        this.tasaAnual = parseFloat(tasaAnual) / 100
    }

    obtenerRendimientoDiario() {
        return (this.capital * this.tasaAnual) / 365
    }

    proyectarInversion(dias) {
        const tasaDiaria = this.tasaAnual / 365
        const total = this.capital * Math.pow((1 + tasaDiaria), dias)
        return total
    }
}

document.getElementById("rendimiento-nu").addEventListener("click", () => {
    const cap = document.getElementById("capital-nu").value
    const tasa = document.getElementById("tasa-nu").value
    const dias = document.getElementById("dias-nu").value
    const miAhorro = new CajitaNu(cap, tasa)

    const diario = miAhorro.obtenerRendimientoDiario().toFixed(2);
    const proyectado = miAhorro.proyectarInversion(dias).toFixed(2);
    const gananciaTotal = (proyectado - cap).toFixed(2);

    document.getElementById("resultado-nu").innerHTML = `
        <div>
            <p>Tu dinero genera aprox. <strong>$${diario}</strong> al día.</p>
            <p>En <strong>${dias} días</strong>, tendrás un total de: <strong>$${proyectado}</strong></p>
            <p>Ganancia neta: <strong>$${gananciaTotal}</strong></p>
        </div>
    `
});
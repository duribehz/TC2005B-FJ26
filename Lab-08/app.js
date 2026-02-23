const fs = require('fs');

const calcularPromedio = (numeros) => {
  if (numeros.length === 0){return 0;}
  const suma = numeros.reduce((acum, valor) => acum + valor, 0);
  const promedio = suma / numeros.length;
  console.log(promedio);
};

const escribirArchivo = (texto) => {
  fs.writeFileSync('Lab8.txt',texto,'utf-8');
}

const romanToInteger = (roman) => {
  const valores = { 
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };

  let resultado = 0;

  for (let i = 0; i < roman.length; i++) {
    let actual = valores[roman[i]];
    let siguiente = valores[roman[i + 1]];

    if (siguiente && actual < siguiente) {
      resultado -= actual;
    } else {
      resultado += actual;
    }
  }
  
  return console.log(resultado);
};

const numeros = [7,6,9,10,10,9,8];
const texto = "Holaaaa!!! Se esta escribiendo este texto en archivo.";

calcularPromedio(numeros);
escribirArchivo(texto);
romanToInteger("XV")
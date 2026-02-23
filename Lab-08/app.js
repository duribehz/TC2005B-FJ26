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

const numeros = [7,6,9,10,10,9,8];
const texto = "Holaaaa!!! Se esta escribiendo este texto en archivo.";

calcularPromedio(numeros);
escribirArchivo(texto);

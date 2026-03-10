/* 
El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado. 
*/

SELECT nombre, SUM(sueldo) AS ingreso_total
FROM elenco
GROUP BY name

/*
 El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's. 
*/ 

SELECT nomestudio, SUM(presupuesto) as total_destinado
FROM Pelicula
WHERE año BETWEEN 1980 AND 1989
GROUP BY nomestudio
ORDER BY SUM(presupuesto) DESC


/*
 Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película. 
*/

SELECT A.nombre, AVG(E.sueldo) AS sueldo_promedio
FROM Actor A
JOIN Elenco E ON A.nombre = E.nombre
WHERE A.sexo = 'H'
GROUP BY A.nombre
HAVING AVG(E.sueldo) > 5000000;

/*
 Título y año de producción de las películas con menor presupuesto
*/
SELECT titulo as titulo_pelicula, año AS año_produccion, MIN (presupuesto) as presupuesto
FROM Pelicula GROUP BY titulo;

/*
Mostrar el sueldo de la actriz mejor pagada. 
*/

SELECT nombre, MAX(sueldo) as sueldo_mayor
FROM elenco
JOIN actor on elenco.nombre = actor.nombre
WHERE actor.sexo = 'f';
/*
Película(título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco(título, año, nombre, sueldo)
Actor(nombre, dirección, telefono, fechanacimiento, sexo)
Productor(idproductor, nombre, dirección, teléfono)
Estudio(nomestudio, dirección)

1.- Actrices de “Las brujas de Salem”.
2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.
3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).
4.- Productores que han hecho más películas que George Lucas.
5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.
6.- Título de las películas que han sido filmadas más de una vez 
*/

/*1.- Actrices de “Las brujas de Salem.*/
SELECT nombre
FROM elenco E, Actor A
WHERE A.nombre = E.nombre
AND A.sexo = 'F' AND titulo = 'Las brujas de Salem'


SELECT nombre 
FROM elenco
where titulo = 'Las brujas de Salem'
AND nombre IN (SELECT nombre FROM actor where sexo = 'F')


/*2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.*/
SELECT Nombre
FROM Elenco E, Pelicula P
WHERE E.titulo = P.titulo
AND E.anio = P.anio
AND Nomestudio = 'MGM'
AND anio = 1995

SELECT nombre
FROM elenco E
WHERE (E.titulo) IN
(SELECT titulo FROM pelicula WHERE nomestudio = 'MGM' and anio 1995)


/*3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).*/
SELECT titulo
FROM Pelicula P
WHERE P.duracion > (SELECT duracion FROM Pelicula P WHERE P.titulo = “Lo que el viento se llevó” AND P.anio = 1939)


/*4.- Productores que han hecho más películas que George Lucas.*/
SELECT P.nombre
FROM Productor P
JOIN Pelicula Pe ON P.idproductor = Pe.idproductor
GROUP BY P.nombre
HAVING COUNT(*) >
(
    SELECT COUNT(*)
    FROM Pelicula Pe2
    JOIN Productor P2 ON Pe2.idproductor = P2.idproductor
    WHERE P2.nombre = 'George Lucas'
);

/*5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.*/
SELECT name
FROM productor pr, pelicula p, elenco e
WHERE pr.idproductor = p.idproductor
AND pr.anio = p.anio
AND p.titulo = e.titulo
AND e.nombre = 'Sharon Stone'


SELECT name
FROM poductor pr, pelicula p
WHERE pr.idproductor = p.idproductor
AND p.titulo IN
(SELECT titulo FROM elenco e WHERE e.nombre = 'Sharon Stones')



/*6.- Título de las películas que han sido filmadas más de una vez */
SELECT titulo
FROM Pelicula
GROUP BY titulo
HAVING COUNT(*) > 1;
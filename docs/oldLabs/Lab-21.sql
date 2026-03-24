/*
Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
Proveedores(RFC, RazonSocial)
Proyectos(Numero, Denominacion)
Entregan(Clave, RFC, Numero, Fecha, Cantidad) 
*/


-- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.  --
SELECT 
    SUM(cantidad) AS 'Cantidad',
    SUM(cantidad * (precio + impuesto)) AS 'Importe total'
FROM materiales AS M
INNER JOIN entregan AS E
    ON M.clave = E.clave
WHERE E.fecha BETWEEN '01/01/1997' AND '31/12/1997';

-- Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas. --
SELECT 
    P.razonsocial AS 'Razon Social',
    SUM(E.cantidad) AS 'Cantidad',
    SUM(E.cantidad * (M.precio + M.impuesto)) AS 'Importe total'
FROM proveedores AS P
INNER JOIN entregan AS E
    ON P.rfc = E.rfc
INNER JOIN materiales AS M
    ON E.clave = M.clave
GROUP BY 
    P.razonsocial;

-- Por cada material obtener la clave y descripción del material, la cantidad total entregada, --
-- la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en --
-- los que la cantidad promedio entregada sea mayor a 400.  --
SELECT 
    M.clave,
    M.descripcion,
    SUM(E.cantidad) AS 'Cantidad Total',
    MIN(E.cantidad) AS 'Cantidad Minima',
    MAX(E.cantidad) AS 'Cantidad Maxima',
    SUM(E.cantidad * (M.precio + M.impuesto)) AS 'Importe total'
FROM materiales AS M
INNER JOIN entregan AS E
    ON M.clave = E.clave
GROUP BY 
    M.clave,
    M.descripcion
HAVING 
    AVG(E.cantidad) > 400;

-- Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la --
-- clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500. --
SELECT 
    P.razonsocial,
    M.descripcion,
    E.clave,
    AVG(E.cantidad) AS 'Promedio'
FROM proveedores AS P
INNER JOIN entregan AS E
    ON P.rfc = E.rfc
INNER JOIN materiales AS M
    ON E.clave = M.clave
GROUP BY 
    P.razonsocial,
    M.descripcion,
    E.clave
HAVING 
    AVG(E.cantidad) > 500;

-- Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos --
-- para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450. --
SELECT 
    P.razonsocial,
    M.descripcion,
    E.clave,
    AVG(E.cantidad) AS 'Promedio'
FROM proveedores AS P
INNER JOIN entregan AS E
    ON P.rfc = E.rfc
INNER JOIN materiales AS M
    ON E.clave = M.clave
GROUP BY 
    P.razonsocial,
    M.descripcion,
    E.clave
HAVING 
    AVG(E.cantidad) < 370 
    OR AVG(E.cantidad) > 450; 

/*
Utilizando la sentencia

INSERT INTO tabla VALUES (valorcolumna1, valorcolumna2, [...] , valorcolumnan) ;

Considerando que los valores de tipos CHAR y VARCHAR deben ir encerrados entre apóstrofes, los valores numéricos se 
escriben directamente y los de fecha, como '1-JAN-00' para 1o. de enero del 2000, inserta cinco nuevos materiales. 
*/

INSERT INTO materiales 
VALUES (101, 'Cemento gris', 120.50, 19.28, 16.00);

INSERT INTO materiales 
VALUES (102, 'Arena fina', 80.00, 12.80, 16.00);

INSERT INTO materiales 
VALUES (103, 'Grava', 95.75, 15.32, 16.00);

INSERT INTO materiales 
VALUES (104, 'Varilla 3/8', 210.30, 33.65, 16.00);

INSERT INTO materiales 
VALUES (105, 'Ladrillo rojo', 6.50, 1.04, 16.00);

-- Clave y descripción de los materiales que nunca han sido entregados.  -- 
SELECT 
 clave AS 'Clave',
 descripcion as 'Descripción'
FROM
 materiales AS M
WHERE NOT EXISTS
 (
 SELECT clave FROM entregan AS E WHERE E.clave = M.clave 
 );

-- Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto --
-- 'Querétaro Limpio'. --

SELECT 
 razonsocial AS 'Razón Social'
FROM
 proveedores as P
INNER JOIN 
 entregan as E
ON
 P.rfc = E.rfc
WHERE 
 E.clave
IN
 (SELECT clave FROM proyectos WHERE denominacion = 'Vamos México')
AND
 E.clave
IN 
 (SELECT clave FROM proyectos WHERE denominacion = 'Querétaro Limpio')
GROUP BY
P.razonsocial;


-- Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'. --
SELECT 
 descripcion as 'Descripción'
FROM 
 materiales AS M
INNER JOIN
 entregan AS E
ON
 M.clave = E.clave
WHERE
 E.numero
IN
 (SELECT numero FROM proyectos AS P WHERE P.denominacion <> 'CIT Yucatán')
GROUP BY
 M.descripcion;

-- Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor --
-- al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'.  --

SELECT 
  P.razonsocial AS 'Razón Social',
  AVG(E.cantidad) AS 'Promedio de cantidad entregada'
FROM
  proveedores AS P
INNER JOIN
  entregan AS E
ON
  P.rfc = E.rfc
GROUP BY
  P.razonsocial
HAVING
  AVG(E.cantidad) > (SELECT AVG(cantidad) FROM entregan WHERE rfc = 'VAGO780901');

-- RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales --
-- entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001. --
SELECT 
  P.rfc AS 'RFC',
  P.razonsocial AS 'Razón social'
FROM proveedores AS P
WHERE EXISTS (
  SELECT *
  FROM entregan E
  INNER JOIN proyectos PR
    ON E.numero = PR.numero
  WHERE E.rfc = P.rfc
    AND PR.denominacion = 'Infonavit Durango'
)
AND (
  (SELECT SUM(E1.cantidad)
   FROM entregan E1
   WHERE E1.rfc = P.rfc
     AND YEAR(E1.fecha) = 2000)
  >
  (SELECT SUM(E2.cantidad)
   FROM entregan E2
   WHERE E2.rfc = P.rfc
     AND YEAR(E2.fecha) = 2001)
);
 
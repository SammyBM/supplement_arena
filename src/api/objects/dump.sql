SELECT 
a.titulo, a.etiquetas, a.imagen, a.categoriaID, a.tamanoPorcion, a.calorias, a.proteina, a.lipidos, a.carbohidratos, perfil.amino 
FROM " . $this->table_nombre . " AS a 
INNER JOIN 
(SELECT ac.nombre AS "amino", pa.cantidad AS "cantidad"
FROM perfil_aminoacidos AS pa
INNER JOIN aminoacidos AS ac ON ac.aminoID = pa.aminoID
INNER JOIN articulos AS a ON a.articuloID = pa.articuloID
WHERE a.articuloID = 1
LIMIT 20) AS perfilAminos
WHERE usuarioID = ? LIMIT 0,1

SELECT (SELECT ac.nombre AS "amino", pa.cantidad AS "cantidad"
FROM perfil_aminoacidos AS pa
INNER JOIN aminoacidos AS ac ON ac.aminoID = pa.aminoID
INNER JOIN articulos AS a ON a.articuloID = pa.articuloID
WHERE a.articuloID = 1
LIMIT 20) AS perfilAminos
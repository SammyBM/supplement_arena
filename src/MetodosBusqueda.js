import Service from './Service';
import Preguntas from './Preguntas';

/**
 * Una instancia de la tabla articulos
 * @typedef {Object} Articulo
 * @property {Number} articuloID
 * @property {string} titulo
 */

/**
 * @name filterArrays
 * @description Filter 2 arrays leaving only elements with the same IDs.
 * @param {Array<Articulo>} arr1 First array must be of "articulo" objects.
 * @param {Array<Object>} arr2 Second array must be of "perfil" objects.
 * @param {Number} type Defines case in order to determine which IDs to filter.  1) for "aminoacidos"  2) for "omegas"  3) for "acidos grasos"
 *  
 * 
 * @returns {Array<Articulo>} An array of "articulo" objects with the provided characteristics.
 */
function filterArrays(arr1, arr2, type) {

    let output = [];

    if (type === 1 || type === 3) {
        for (let x = 0; x < arr1.length; x++) {
            arr2.forEach((item) => {
                (arr1.articuloID === item.articuloID && arr1.cantidad === item.cantidad) && output.push(arr1[x]);
            })
        }
    }
    if (type === 2 || type >= 4)
        for (let x = 0; x < arr1.length; x++) {
            arr2.forEach((item) => {
                (arr1.articuloID === item.articuloID) && output.push(arr1[x]);
            })
        }

    return output;
}


/**
 * @description Consulta los resultados de perfiles según los objetos en los parametros y regresa solo los articulos en común.
 * @param {Array<Articulo>} arr1 First array must be of "articulo" objects.
 * @param {Object} arr2 Second array must be of "perfil" objects.
 * @param {Number} type Defines case in order to determine which IDs to filter.  1) for "aminoacidos"  2) for "omegas"  3) for "acidos grasos"
 * 
 * @returns {Array<Articulo>} An array of "articulo" objects with the provided characteristics.
 */
export function busquedaPerfiles(articulo, omegas = null, aminos = null, acidosGrasos = null, ingredientes = null, alergenos = null) {
    let resultados, om, am, ac, ing, alg;

    Service.getDataQuery("/articulos/read_by_props", "articulo", articulo).then((res) => {
        resultados = res.records;
        if (aminos != null) {
            Service.getDataQuery("/perfiles_aminos/read_by_props", "perfil_busqueda", aminos).then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comun
                am = res.records;
            }).catch((err) => console.error(err)).finally(() => {
                resultados = filterArrays(resultados, am, 1);
            });
        }
        if (omegas != null) {
            Service.getDataQuery("/perfiles_omegas/read_by_props", "perfil_busqueda", omegas).then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comun
                om = res.records;
            }).catch((err) => console.error(err)).finally(() => {
                resultados = filterArrays(resultados, om, 2);
            });
        }
        if (acidosGrasos != null) {
            Service.getDataQuery("/perfiles_acidos_grasos/read_by_props", "perfil_busqueda", acidosGrasos).then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comunun
                ac = res.records;
            }).catch((err) => console.error(err)).finally(() => {
                resultados = filterArrays(resultados, ac, 3);
            });
        }
        if (ingredientes != null) {
            Service.getDataQuery("/perfiles_ingredientes/read_by_props", "perfil_busqueda", ingredientes).then((res) => {
                ing = res.records;
            }).catch((err) => console.error(err)).finally(() => {
                resultados = filterArrays(resultados, ing, 4);
            });
        }
        if (alergenos != null) {
            Service.getDataQuery("/perfiles_ingredientes/avoid_alergenos", "perfil_busuqeda", alergenos).then((res) => {
                alg = res.records;
            }).catch((err) => console.error(err)).finally(() => {
                resultados = filterArrays(resultados, alg, 5);
            });
        }
    }).catch((error) => {
        console.error(error);
        resultados = null;
    }).finally(() => {
        return resultados
    });
}

/**
 * @description Retorna una pregunta según la ultima respuesta o el ID especificado.
 * @param {Array<Object>} respuestas Conjunto de objetos JSON que contienen un preguntaID y un respuestaID.
 * @param {Number} ID Si se especifica, que busca en el cuestionario la pregunta especificada.
 * @returns Obejto pregunta o null. 
*/
export function preguntasDinamicas(respuestas, ID = null) {
    const Cuestionario = getPreguntas(respuestas);

    if (respuestas === null) {
        return Cuestionario[0];
    }

    if (ID !== null)
        Cuestionario.forEach((preg) => {
            if (preg.preguntaID === ID)
                return preg;
        })

    respuestas.forEach((resp) => {
        return Cuestionario[respuestas.length - 1]
    })
}

/**
 * @description Llena el arreglo de respuestas.
 * @param {number} preguntaID preguntaID para identificar con cuestionario
 * @param {number} respuestaID indice de respuesta segun objeto Preguntas.json
 * @param {Object} respuestas Objeto con arreglo de preguntas anteriores.
 * @returns Objeto JSON que representa un arreglo de respuestas con su respectivo preguntaID
 */
export function setRespuestasSimple(preguntaID, respuestaID, respuestas = null) {
    if (respuestas === null)
        return Array({ preguntaID: preguntaID, respuesta: respuestaID })
    else {
        let i = respuestas.length - 1;
        while (respuestas[i].preguntaID >= preguntaID) {
            i--;
            respuestas.pop();
        }
        return respuestas.push({ preguntaID: preguntaID, respuesta: respuestaID })
    }
}

/**
 * @description determina los perfiles de busqueda segun las respuestas dadas
 * @param {Array<Object>} respuestas arreglo de objetos de tipo respuesta
 * @returns arreglo de perfiles de busqueda para usar con busquedaPerfiles
*/
export function perfilesSimple(respuestas) {
    const resps = JSON.parse(respuestas);
    let perf_alergias;
    let perf_art = {
        categoriaID: null,
        calorias: null,
        proteina: null,
        lipidos: null,
        carbohidratos: null,
        precios: null
    }
    resps.forEach((resp) => {
        switch (resp.preguntaID) {
            case 1:
                break;
            case 2:
                if (resp.respuesta !== 1)
                    perf_alergias = null;
                break;
            case 3:
                perf_alergias = resp.respuesta;
                break;
            case 4:
                break;
            case 5:// enfermedades cronicas
                if (resp.respuesta === 2) {
                    perf_art.categoriaID = 3;
                    perf_art.proteina = 0;
                    perf_art.carbohidratos = 0;
                    perf_art.lipidos = 0;
                    perf_art.calorias = 0;
                }
                break;
            case 6:
                if (resp.respuesta === 1)
                    perf_art.precios = [0, 1000]
                if (resp.respuesta === 2)
                    perf_art.precios = [0, 2000]
                if (resp.respuesta === 3)
                    perf_art.precios = [0, 100000]
                break;
            case 7: {
                switch (resp.respuesta) {
                    case 1: // ganar musculo
                        perf_art.categoriaID = 1;
                        perf_art.proteina = 20;
                        perf_art.carbohidratos = 2;
                        perf_art.lipidos = 1;
                        perf_art.calorias = 120;
                        break;
                    case 2: // ganar peso
                        perf_art.categoriaID = 1;
                        perf_art.proteina = 25;
                        perf_art.carbohidratos = 126;
                        perf_art.lipidos = 2;
                        perf_art.calorias = 624;
                        break;
                    case 6: // Salud cardiaca
                        perf_art.categoriaID = 2;
                        perf_art.proteina = 0;
                        perf_art.carbohidratos = 0;
                        perf_art.lipidos = 2;
                        perf_art.calorias = 18;
                        break;
                    default:
                        perf_art.categoriaID = 3;
                        perf_art.proteina = 0;
                        perf_art.carbohidratos = 0;
                        perf_art.lipidos = 0;
                        perf_art.calorias = 0;
                        break;
                    //caso 9 y 2 cafeina
                    //caso 2 creatina
                }
            }
            default:
                break;
        }
    })
    const perfiles = Array(perf_art, perf_alergias);
    return perfiles;
}

/**
 * 
 * @param {Array<*>} respuestas  arreglo de objetos de tipo respuesta
 * @returns cuestionario con preguntas adaptadas segun las respuestas proporcionadas
 */
function getPreguntas(respuestas) {
    const preguntas = JSON.parse(Preguntas).preguntas;
    let cuestionario = [];
    let ob_general;
    let skip_alergias = false, skip_enfermedades = false;

    if (respuestas !== null) {
        respuestas.forEach((resp) => {
            if (resp.preguntaID === 1)
                // Marcar filtros para futuras preguntas
                ob_general = resp.respuesta
            // Sacar valores y representar como perfiles
            if (resp.preguntaID === 2) {
                if (resp.respuestaID !== 1)
                    skip_alergias = true;
            }
            if (resp.preguntaID === 4) {
                if (resp.respuestaID !== 1)
                    skip_enfermedades = true;
            }
        });
    }

    for (let p of preguntas) {
        if (p.preguntaID === 3 && skip_alergias)
            continue;
        if (p.preguntaID === 5 && skip_enfermedades)
            continue;
        if (p.preguntaID === 7 && ob_general !== undefined)
            cuestionario.push({ preguntaID: p.preguntaID, pregunta: p.pregunta, respuestas: p.respuestas.versiones[ob_general - 1] });
        else
            cuestionario.push({ preguntaID: p.preguntaID, pregunta: p.pregunta, respuestas: p.respuestas.versiones[0] })

    }

    return cuestionario;
}
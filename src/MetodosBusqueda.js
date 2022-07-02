import Service from './Service';

function filterOmegas(reg1, reg2) {
    if (reg1.omegaID == reg2.omegaID)
        return true;
    else
        return false;
}

function filterAminos(reg1, reg2) {
    if (reg1.aminoID == reg2.aminoID)
        return true;
    else
        return false;
}

export function busquedaAvanzada(articulo, omegas = null, aminos = null, acidosGrasos = null) {
    let resultados, om, am, ac;

    Service.getData("/articulos/read_by_props").then((res) => {
        resultados = res.records;
        if (aminos != null) {
            Service.getData("/perfiles_aminos/read_by_props").then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comunun
                am = res.records;
            }).catch((err) => { })
        }
        if (omegas != null) {
            Service.getData("/perfiles_omegas/read_by_props").then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comunun
                am = res.records;
            }).catch((err) => { })
        }
        if (acidosGrasos != null) {
            Service.getData("/perfiles_acidos_grasos/read_by_props").then((res) => {
                // Sacar registros con caracteristicas y filtrar por IDs en comunun
                ac = res.records;
            }).catch((err) => { })
        }
    }).catch((error) => {
        console.error(error);
        resultados = null;
    }).finally(() => {
        return resultados
    });
}
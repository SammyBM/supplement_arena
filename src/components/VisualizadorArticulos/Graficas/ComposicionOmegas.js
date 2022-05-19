import * as React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import * as PlaceholderValues from "../../PlaceholderValues";

export default function ComposisionOmegas(props) {
    const etiquetas = getAGLabels();
    const valores = getAGData(props.articulo.perfilAG);

    const data = {
        labels: [
            ...etiquetas
        ],
        datasets: [{
            label: props.articulo.titulo,
            data: valores,
            backgroundColor: [
                'rgb(247, 94, 37)',
                'rgb(255, 153, 102)'
            ],
            hoverOffset: 4
        }]
    };

    return (<Doughnut data={data} />);
}

function getAGLabels() {
    let output = [];
    PlaceholderValues.getAcidosGrasos().map((item) => {
        output.push(PlaceholderValues.getAcidoGrasoById(item.id).nombre)
    });
    return output;
}

function getAGData(id_perfil) {
    let output = [];
    PlaceholderValues.getPerfilAGById(id_perfil).map((item) => {
        output.push(item.cantidad);
    });
    return output;
}
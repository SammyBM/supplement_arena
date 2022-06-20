import * as React from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function Vitaminas(props) {
    const vitaminas = getLabels(props.articulo.vitaminas);
    const valores = getVitaminData(props.articulo.vitaminas);

    const data = {
        labels: [
            ...vitaminas,
        ],
        datasets: [
            {
                label: props.articulo.titulo,
                data: valores,
                fill: true,
                backgroundColor: "rgba(247, 94, 37, 0.3)",
                borderColor: "rgb(247, 94, 37)",
                pointBackgroundColor: 'rgb(247, 94, 37)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(247, 94, 37)'
            }
        ]
    };

    return <Bar data={data} />;

}

function getLabels(perfVitaminas) {
    let output = [];
    perfVitaminas.forEach((item) => {
        output.push(item.nombre);
    });
    return output;
}

function getVitaminData(perfVitaminas) {
    let output = [];
    perfVitaminas.forEach((item) => {
        output.push(item.cantidad);
    });
    return output;
}
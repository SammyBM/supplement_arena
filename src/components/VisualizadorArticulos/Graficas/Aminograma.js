import * as React from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

export default function Aminograma(props) {
    const aminos = getLabels(props.articulo.perfilAminos);
    const valores = getAminoData(props.articulo.perfilAminos);

    const data = {
        labels: [
            ...aminos,
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


    return (
        <Radar data={data} />
    );
}

function getLabels(perfilAminos) {
    let output = [];
    perfilAminos.forEach((item) => {
        output.push(item.nombre);
    });
    console.log("nombres aminos", output);
    return output;
}

function getAminoData(perfilAminos) {
    let output = [];
    perfilAminos.forEach((item) => {
        output.push(item.cantidad);
    });
    console.log("valores aminos", output);
    return output;
}
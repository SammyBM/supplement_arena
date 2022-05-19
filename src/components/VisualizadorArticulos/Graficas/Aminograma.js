import * as React from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

import * as PlaceholderValues from "../../PlaceholderValues";

export default function Aminograma(props) {
    const aminos = getLabels();
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

function getLabels() {
    let output = [];
    PlaceholderValues.getAminos().map((item) => {
        output.push(PlaceholderValues.getAminoById(item.id).nombre);
    });
    console.log("nombres aminos", output);
    return output;
}

function getAminoData(id_perfil) {
    let output = [];
    PlaceholderValues.getPerfilAminosById(id_perfil).aminos.map((item) => {
        output.push(item.cantidad);
    });
    console.log("valores aminos", output);
    return output;
}
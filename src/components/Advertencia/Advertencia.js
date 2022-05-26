import * as React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';


import "./Advertencias.css";

export default function Advertencia(props) {

    const advertencias = [
        { id: 1, advertencia: "Este suplemento no cuenta con evidencia cientifica relevante", resumen: "Evidencia" },
        { id: 2, advertencia: "Este suplemento poseé una dosis insuficiente", resumen: "Dosis" },
        { id: 3, advertencia: "Este suplemento ha mostrado contaminacion en analisis de terceros", resumen: "Contaminación" }
    ];


    function getAdvertenciaById(id) {
        return advertencias.find(item => item.id === id).advertencia;
    }

    function getResumenById(id) {
        return advertencias.find(item => item.id === id).resumen;
    }


    return (
        <Tooltip title={getAdvertenciaById(props.advertencia)}>
            <Box sx={{ width: 100, height: 100 }}>
                <div className="sello">
                    <div className="octagono">
                        <div className="caratula">
                            <div className="texto">
                                <Typography variant="p" color="white">{getResumenById(props.advertencia)}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Tooltip>
    )
}
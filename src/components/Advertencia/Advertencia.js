import * as React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';


import "./Advertencias.css";

export default function Advertencia(props) {

    const { advertencia, resumen } = props;

    return (
        <Tooltip title={advertencia}>
            <Box sx={{ width: 100, height: 100 }}>
                <div className="sello">
                    <div className="octagono">
                        <div className="caratula">
                            <div className="texto">
                                <Typography variant="p" color="white">{resumen}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Tooltip>
    )
}
import * as React from 'react';
import { getReportesFake } from '../PlaceholderValues';
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

import Reporte from './Reporte';

const descripcionActividad = "En esta sección encontrarás los reportes hechos por la comunidad sobre nuestros articulos." + '\n' + "Con las herramientas proveidas aquí será capaz de atender y descartar dichos reportes.";

const reportes = getReportesFake();

export default function CentroReportes() {

    const tarjetasReportes = reportes.map((item) => <Grid item xs={12} md={8}><Reporte reporte={item} /></Grid>);

    return (
        <Card>
            <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                <CardContent>
                    <Typography variant="h3" noWrap component="div" fontFamily="Lexend Deca">
                        Reportes
                    </Typography>
                    <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                </CardContent>
                <Grid container direction="column" alignItems="center" spacing={1} >
                    {tarjetasReportes}
                </Grid>
            </Paper>
        </Card>
    );
}
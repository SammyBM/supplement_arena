import * as React from 'react';
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import axios from 'axios';

import Reporte from './Reporte';
import ApiContext from '../../contexts/ApiContext';

const descripcionActividad = "En esta sección encontrarás los reportes hechos por la comunidad sobre nuestros articulos." + '\n' + "Con las herramientas proveidas aquí será capaz de atender y descartar dichos reportes.";

export default function CentroReportes() {
    const api = React.useContext(ApiContext);

    const [reportes, setReportes] = React.useState([]);

    const tarjetasReportes = reportes.map((item) => <Grid item xs={12} md={8}><Reporte reporte={item} /></Grid>);

    React.useEffect(() => {
        axios.get(api.concat("reportes/read.php"))
            .then((res) => {
                setReportes(res.data.records);
        })
    }, []);

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
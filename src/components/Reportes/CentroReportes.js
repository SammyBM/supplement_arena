import * as React from 'react';
import { Card, CardContent, Grid, Paper, Skeleton, Typography } from "@mui/material";
import axios from 'axios';

import Reporte from './Reporte';
import ApiContext from '../../contexts/ApiContext';

const descripcionActividad = "En esta sección encontrarás los reportes hechos por la comunidad sobre nuestros articulos." + '\n' + "Con las herramientas proveidas aquí será capaz de atender y descartar dichos reportes.";

export default function CentroReportes() {
    const api = React.useContext(ApiContext);

    const [reportes, setReportes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const skeletons = [1, 2, 3, 4, 5].map((n) => <Grid item xs={12} md={8} key={n}><Skeleton variant="rectangular" width={210} height={118} /></Grid>);

    React.useEffect(() => {
        setTimeout(async () => {
            await axios.get(api.concat("reportes/read.php"))
                .then((res) => {
                    setReportes(res.data.records);
                }).catch((err) => console.error(err)).finally(() => setLoading(false));
        }, []);
    }, 1000)

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
                    {loading ?
                        skeletons :
                        reportes.map((item) => <Grid item xs={12} md={8} key={item.reporteID}><Reporte reporte={item} /></Grid>)
                    }
                </Grid>
            </Paper>
        </Card>
    );
}
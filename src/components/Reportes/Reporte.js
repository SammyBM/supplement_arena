import * as React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check"

export default function Reporte(props) {
    const [reporte, setReporte] = React.useState(
        {
            Usuario: props.reporte.Usuario,
            Fecha: props.reporte.Fecha,
            Articulo: props.reporte.Articulo,
            Resumen: props.reporte.Resumen,
            Contenido: props.reporte.Contenido,
            Resuelto: false
        }
    );


    const setResuelto = () => {
        setReporte({ ...reporte, Resuelto: true });
    }

    const abrirArticulo = () => {
        console.log("abrir articulo");
    };

    return (
        <Card>
            <CardHeader title={reporte.Resumen} subheader={reporte.Fecha} />
            <CardContent>
                <Typography variant="body1" color="secondary">{reporte.Contenido}</Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" alignItems="center" justifyContent="flex-start">
                    <IconButton aria-label="" onClick={setResuelto}>
                        <CheckIcon />
                    </IconButton>
                    <Button variant='filled' color='primary' onClick={abrirArticulo}>Abrir en editor</Button>
                </Stack>
            </CardActions>
        </Card>
    );
}
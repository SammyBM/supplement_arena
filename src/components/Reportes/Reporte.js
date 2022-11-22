import * as React from 'react';
import { Button, Card, CardMedia, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check"
import { ROUTES } from "../../constantes";
import axios from 'axios';


export default function Reporte(props) {
    const [reporte, setReporte] = React.useState(
        {
            Usuario: props.reporte.usuarioID,
            Fecha: props.reporte.fechaCreacion,
            Articulo: props.reporte.articuloID,
            Resumen: props.reporte.resumen,
            Contenido: props.reporte.texto,
            Resuelto: false
        }
    );
    const [loading, setLoading] = React.useState(true);

    const setResuelto = () => {
        setReporte({ ...reporte, Resuelto: true });
    }

    const abrirArticulo = () => {
        console.log("abrir articulo");
    };

    React.useEffect(() => {
        setTimeout(async () => {
            await axios.get(ROUTES.API_ROUTE + "/articulos/read_row.php?id=", props.reporte.articuloID).then((resp) => {
                setReporte({
                    ...reporte,
                    Articulo: resp
                });
            }).catch((err) => {
                console.error(err);
            });
        }, 1300)
    }, []);


    return (
        <Card>
            <CardHeader title={reporte.Resumen} subheader={reporte.Fecha} />
            {/* <CardMedia component="img" height="140" alt={reporte.Articulo.titulo} src={ROUTES.API_ROUTE + "/imagenes/imagenes_articulos/" + reporte.Articulo.imagen} /> */}
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
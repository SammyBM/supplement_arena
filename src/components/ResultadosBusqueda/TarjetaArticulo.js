import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

export default function TarjetaArticulo(props) {
    const abrirArticulo = (articulo) => {
        console.log(articulo);
        props.funcionMenu("visualizador", articulo);
    }

    return (
        <Card>
            <CardActionArea onClick={() => abrirArticulo(props.articulo)}>
                <CardMedia
                    component="img"
                    height="inherit"
                    image={props.articulo.imagen}
                />
                <CardContent><Typography variant="body1" color="secondary">{props.articulo.titulo}</Typography></CardContent>
            </CardActionArea>
        </Card>
    );
}
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

import UserContext from '../../contexts/UserContext';

export default function TarjetaArticulo(props) {
    const usuario = React.useContext(UserContext);

    const abrirArticulo = (articulo) => {
        sessionStorage.removeItem("props");
        console.log(articulo);
        sessionStorage.setItem("props",JSON.stringify(articulo) )
        props.funcionMenu("visualizador", articulo);
    }
    const enviar = () => {
        
        props.funcionMenu("editor", props.articulo);
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
            {
                usuario.tipoUsuarioID > 1 &&
                <CardActions>

                    <Button filled color=" primary" onClick={enviar()}>Editar</Button>
                </CardActions>
            }
        </Card>
    );
}
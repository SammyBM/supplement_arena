import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import UserContext from '../../contexts/UserContext';
import Service from '../../Service';

export default function TarjetaArticulo(props) {
    const usuario = React.useContext(UserContext);

    const abrirArticulo = (articulo) => {
        sessionStorage.removeItem("props");
        sessionStorage.setItem("props", JSON.stringify(articulo))
        Service.changePage("visualizador");
    }
    const enviar = () => {

        Service.changePage("editor");
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

                    <Button filled color=" primary" onClick={enviar}>Editar</Button>
                </CardActions>
            }
        </Card>
    );
}
import * as React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Card, CardMedia, Stack, CardContent, Typography, Grid, colors, CircularProgress } from '@mui/material'

import Service from "../../Service";
import { ROUTES } from "../../constantes"
import CarrouselEditor from "./CarrouselEditor"
import TarjetaTYC from '../TerminosYCondiciones/TarjetaTYC';


const path = require("path-browserify");
const imageResource = path.join(__dirname, "..", "..", "uploads", "carrousel");

export default function LandingPage() {
    let consent = sessionStorage.getItem("consent");
    const API_ROUTE = ROUTES.API_ROUTE;

    const [imagenes, setImagenes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    var imgs = new Array();
    function imageArray(item) {
        item.nombre_foto = path.join(imageResource, item.nombre_foto);
    }

    React.useEffect((() => {
        let resp;
        setTimeout(async () => {
            await Service.postData("imagenes/imagenes_carrousel/read", null).then((result) => {
                resp = result.records;
                console.log(resp)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setImagenes(resp);
            });
        }, 5000);
        setLoading(false);
    }), []);

    return (
        <>
            <TarjetaTYC accepted={consent !== null ? JSON.parse(consent) : false} />
            <Grid container direction="row">
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    {
                        loading ?
                            <CircularProgress />
                            :
                            <Carousel>
                                {imagenes.map((imagen, i) => <img src={API_ROUTE + "imagenes/imagenes_carrousel/" + imagen.nombre_foto} />
                                )}
                            </Carousel>
                    }
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            <Stack direction="row" alignItems="center" justifyContent="end">
                <CarrouselEditor key="editor-carrusel" />
            </Stack>
        </>
    );
}

{//<img src={"http://localhost:80/supplement_api/imagenes/imagenes_carrousel/" + imagen.nombre_foto} />
}

function Item(props) {
    let item;

    React.useEffect(() => {
        item = props.item;
        console.log(item);
    }, [props.loading]);

    if (props.loading)
        return <CircularProgress />;
    else

        return (
            <Card sx={{ maxWidth: 500, maxHeight: 400 }}>
                <CardMedia
                    component="img"
                    src={"http://localhost:80/supplement_api/imagenes/imagenes_carrousel/" + item.nombre_foto}
                />
                <img src={item.bitmap} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.item.name}</Typography>
                </CardContent>
            </Card>
        )
}
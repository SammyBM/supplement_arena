import * as React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Card, CardMedia, Stack, CardContent, Typography, Grid, colors } from '@mui/material'
import Service from "../../Service";
import axios from 'axios';
import { Buffer } from 'buffer'
import CarrouselEditor from "./CarrouselEditor"
import ApiContext from '../../contexts/ApiContext';
import TarjetaTYC from '../TerminosYCondiciones/TarjetaTYC';


const path = require("path-browserify");
const imageResource = path.join(__dirname, "..", "..", "uploads", "carrousel");

export default function LandingPage() {
    let consent = sessionStorage.getItem("consent");

    const api = React.useContext(ApiContext);

    const [imagenes, setImagenes] = React.useState([]);
    var imgs = new Array();
    function imageArray(item) {
        item.nombre_foto = path.join(imageResource, item.nombre_foto);
    }

    React.useEffect((() => {
        Service.postData("imagenes/imagenes_carrousel/read", null).then((result) => {
            for (let i = 0; i < 10; i++) {
                imgs.push("data:image/png;base64," + result.records[i].bitmap);

            }
            setImagenes(imgs);
            console.log(imgs)
        }).catch((err) => {
            console.log(err)
        });

        console.log(consent);
    }), []);

    return (
        <>
            <TarjetaTYC accepted={consent !== null ? JSON.parse(consent) : false} />
            <Grid container direction="row">
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Carousel>
                        {
                            imagenes.map((item, i) => <Item key={i} item={item} />)
                        }
                    </Carousel>
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
            <Stack direction="row" alignItems="center" justifyContent="end">
                <CarrouselEditor key="editor-carrusel" />
            </Stack>
        </>
    );
}

function Item(props) {
    return (
        <Card sx={{ maxWidth: 500, maxHeight: 400 }}>
            <CardMedia
                component="img"
                src={props.item}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.item.name}</Typography>
            </CardContent>
        </Card>
    )
}
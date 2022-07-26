import * as React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Card, CardMedia, Stack, CardContent, Typography, Grid } from '@mui/material'
import Service from "../../Service";
import axios from 'axios';
import { Buffer } from 'buffer'
import CarrouselEditor from "./CarrouselEditor"
import ApiContext from '../../contexts/ApiContext';
import TarjetaTYC from '../TerminosYCondiciones/TarjetaTYC';


const path = require("path-browserify");
const imageResource = path.join(__dirname, "..", "..", "uploads", "carrousel");

export default function LandingPage() {
    const api = React.useContext(ApiContext);
    var items = [
        {
            id: 1,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            picture: <img src="https://parade.com/wp-content/uploads/2018/09/colorful-vegetables-in-bowl-FTR.jpg" />
        },
        {
            id: 2,
            name: "Random Name #2",
            description: "Hello World!",
            picture: <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/03/pills-vitamins-pill-1296x728-header.jpg?w=1155&h=1528" />
        },
        {
            id: 3,
            name: "Proteina",
            description: "Proteina en polvo mamalona",
            picture: <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chocolate-whey-protein-powder-with-a-filled-scoop-royalty-free-image-1626898564.jpg?crop=1.00xw:0.753xh;0,0.110xh&resize=1200:*" />
        }
    ]

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
        /* axios.get(api.concat('imagenes_carrousel/read.php')).then(
            (response) => {
                imgs = response.data;
                imgs.forEach(imageArray);
                setImagenes(imgs);
            }
        ).catch((error) => { console.error(error) }) */
    }
    ), []);

    return (
        <>
            <TarjetaTYC />
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
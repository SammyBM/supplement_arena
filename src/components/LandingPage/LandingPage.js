import * as React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Stack, CardContent, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import axios from 'axios';

import CarrouselEditor from "./CarrouselEditor"

const api = "http://localhost/api/";

const path = require("path-browserify");
const imageResource = path.join(__dirname, "..", "..", "uploads", "carrousel");

export default function LandingPage() {
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
        axios.get(api.concat('imagenes_carrousel/read.php')).then(
            (response) => {
                imgs = response.data;
                imgs.forEach(imageArray);
                setImagenes(imgs);
            }
        ).catch((error) => { console.error(error) })
    }
    ), []);

    return (
        <>
            <Carousel>
                {
                    imagenes.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
            <Stack direction="row" alignItems="center" justifyContent="end">
                <CarrouselEditor key="editor-carrusel" />
            </Stack>
        </>
    );
}

function Item(props) {
    return (
        <Card>
            <CardMedia
                component="img"
                width="500"
                height="400"
                src={props.item.nombre_foto}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.item.name}</Typography>
            </CardContent>
        </Card>
    )
}
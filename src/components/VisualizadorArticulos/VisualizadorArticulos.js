import * as React from 'react';
import { Box, Card, CardMedia, Chip, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import axios from 'axios';

import * as PlaceholderValues from "../PlaceholderValues";
import Aminograma from './Graficas/Aminograma';
import ComposicionOmegas from './Graficas/ComposicionOmegas';
import FormatoReportes from '../Reportes/FormatoReportes';
import Advertencia from '../Advertencia/Advertencia';

const api = "http://localhost/xampp/api_rest/";

export default function VisualizadorArticulos(props) {
    const [articulo, setArticulo] = React.useState(
        {
            titulo: "",
            etiquetas: [],
            tipoSuplemento: "",
            ingredientes: [],
            ingActivo: "",
            imagen: "",
            tamano: "",
            calorias: "",
            proteina: "",
            lipidos: "",
            carbos: "",
            perfilAminos: [],
            perfilAG: [],
            tiposOmegas: []
        }
    );

    const [abrirReporte, setAbrirReporte] = React.useState(false);

    const handleClickAbrir = () => {
        setAbrirReporte(true);
    }

    const handleClickCerrar = () => {
        setAbrirReporte(false);
    }

    React.useEffect(() => {
        let ams, oms, acs;
        const acidos = new Array();
        const aminos = new Array();
        const omegas = new Array();
        axios.get(api.concat("perfiles_aminos/read_by_articulo.php?id=", props.articulo.articuloID.toString()))
            .then(res => {
                ams = res.data;
            }).catch(err => {
                console.error(err);
                ams = [];
            }).finally(() => {
                aminos.push(ams);
            });
        axios.get(api.concat("perfiles_acidos_grasos/read_by_articulo.php?id=", props.articulo.articuloID.toString()))
            .then(res => {
                acs = res.data;
            }).catch(err => {
                console.error(err);
                acs = [];
            }).finally(() => {
                acidos.push(acs);
            });
        axios.get(api.concat("perfiles_omegas/read_by_articulo.php?id=", props.articulo.articuloID.toString()))
            .then(res => {
                oms = res.data;
            })
            .catch(err => {
                console.error(err);
                oms = [];
            }).finally(() => {
                omegas.push(oms);
            });
        axios.get(api.concat(""))
        setArticulo({
            titulo: props.articulo.titulo,
            etiquetas: props.articulo.etiquetas,
            tipoSuplemento: props.articulo.tipoSuplemento,
            ingredientes: props.articulo.ingredientes,
            ingActivo: props.articulo.ingActivo,
            imagen: props.articulo.imagen,
            tamano: props.articulo.tamano,
            calorias: props.articulo.calorias,
            proteina: props.articulo.proteina,
            lipidos: props.articulo.lipidos,
            carbos: props.articulo.carbos,
            perfilAG: acidos,
            perfilAG: aminos,
            tiposOmegas: omegas
        });
        console.log(articulo);
    }, []
    );



    return (
        <>
            <Grid container direction="row" rowSpacing={2} alignItems="center" >
                <Grid item xs={12} md={6}>
                    <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
                        <Typography variant="h3" color="primary">{articulo.titulo}</Typography>
                        <Typography variant="subtitle2" color="secondary">{articulo.etiquetas}</Typography>
                        <Typography variant="h5" color="primary">Ingredientes</Typography>
                        <Typography variant="body1" color="secondary">{articulo.ingredientes}</Typography>
                        <Typography variant="h5" color="primary">Ingrediente activo</Typography>
                        <Typography variant="body1" color="secondary">{articulo.ingActivo}</Typography>
                        <Typography variant="h5" color="primary">Advertencias</Typography>
                        <Advertencia advertencia={1} />
                        {articulo.tiposOmegas.length > 0 && <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>{articulo.tiposOmegas.map((item) => <Chip label={PlaceholderValues.getOmegaByID(item).nombre} color="primary" />)}</Stack>}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box sx={{ bgcolor: '#cfe8fc', maxHeight: '500px', maxWidth: "500px" }}>
                        <Card elevation={4}>
                            <CardMedia
                                component="img"
                                height="inherit"
                                image={articulo.imagen}
                            />
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Stack direction="column" justifyContent="flex-start" alignItems="center">
                        <IconButton onClick={handleClickAbrir}><ReportProblemIcon /></IconButton>
                    </Stack>
                    <FormatoReportes articulo={props.articulo} abierto={abrirReporte} funcionCerrar={handleClickCerrar} />
                </Grid>
                <Grid item xs={12}>
                    <TablaNutrimental articulo={articulo} />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grafica articulo={articulo} />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    );
}

function TablaNutrimental(props) {
    const articulo = props.articulo;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <caption>Información nutrimental {articulo.titulo}</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Nutrimento (porción de {articulo.tamano}&nbsp;g)</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Unidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Calorias</TableCell>
                        <TableCell align="right">{articulo.calorias}</TableCell>
                        <TableCell align="right">Cal</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Proteina</TableCell>
                        <TableCell align="right">{articulo.proteina}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Lipidos</TableCell>
                        <TableCell align="right">{articulo.lipidos}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hidratos de carbono</TableCell>
                        <TableCell align="right">{articulo.carbos}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Grafica(props) {
    const articulo = props.articulo;

    switch (articulo.tipoSuplemento) {
        case 1:
            return <Aminograma articulo={articulo} />;
            break;
        case 2:
            return <ComposicionOmegas articulo={articulo} />;
            break;
        default:
            return <></>;
            break;
    }
}
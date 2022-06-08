import * as React from 'react';
import { Box, Card, CardMedia, Chip, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import axios from 'axios';

import ApiContext from '../ApiContext';
import Aminograma from './Graficas/Aminograma';
import ComposicionOmegas from './Graficas/ComposicionOmegas';
import Vitamina from './Graficas/Vitaminas';
import FormatoReportes from '../Reportes/FormatoReportes';
import Advertencia from '../Advertencia/Advertencia';


export default function VisualizadorArticulos(props) {
    const api = React.useContext(ApiContext);

    const [articulo, setArticulo] = React.useState(
        {
            titulo: "",
            etiquetas: [],
            tipoSuplemento: "",
            ingredientes: [],
            ingActivo: [],
            imagen: "",
            tamano: "",
            calorias: "",
            proteina: "",
            lipidos: "",
            carbos: "",
            perfilAminos: [],
            perfilAG: [],
            tiposOmegas: [],
            vitaminas: [],
            advertencias: []
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
        const acidos = [];
        const aminos = [];
        const omegas = [];
        const vitaminas = [];
        const advertencias = [];
        const ingredientes = [];

        function getActivos(ing) {
            if (ing.ingActivo)
                return ing;
        }

        function executePromisesInRow(queue, index) {
            if (index >= queue.length) {
                setArticulo({
                    titulo: props.articulo.titulo,
                    etiquetas: props.articulo.etiquetas,
                    tipoSuplemento: props.articulo.categoriaID,
                    ingredientes: ingredientes,
                    ingActivo: ingredientes.filter(getActivos),
                    imagen: props.articulo.imagen,
                    tamano: props.articulo.tamanoPorcion,
                    calorias: props.articulo.calorias,
                    proteina: props.articulo.proteina,
                    lipidos: props.articulo.lipidos,
                    carbos: props.articulo.carbohidratos,
                    perfilAG: acidos,
                    perfilAminos: aminos,
                    vitaminas: vitaminas,
                    tiposOmegas: omegas,
                    advertencias: advertencias
                });
                return;
            }

            axios.get(queue[index].route).then(
                res => {
                    res.data.forEach(item => {
                        queue[index].ref.push(item);
                    })
                }).catch(
                    err => {
                        console.log(err);
                    }).finally(
                        () => {
                            executePromisesInRow(queue, index + 1);
                        })
        }

        executePromisesInRow([
            { route: api.concat("perfiles_advertencias/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: advertencias },
            { route: api.concat("perfiles_aminos/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: aminos },
            { route: api.concat("perfiles_acidos_grasos/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: acidos },
            { route: api.concat("perfiles_ingredientes/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: ingredientes },
            { route: api.concat("perfiles_omegas/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: omegas },
            { route: api.concat("perfiles_vitaminas/read_by_articulo.php?id=", props.articulo.articuloID.toString()), ref: vitaminas }
        ], 0);

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
                        {articulo.ingredientes.map((item) => <Typography variant="body1" color={item.alergeno ? "warning.main" : "secondary"}>{item.nombre}</Typography>)}
                        <Typography variant="h5" color="primary">Ingrediente activo</Typography>
                        {articulo.ingActivo.map((item) => <Typography variant="body1" color="secondary">{item.nombre}</Typography>)}
                        {articulo.advertencias.legth > 0 && <Typography variant="h5" color="primary">Advertencias</Typography>}
                        {articulo.advertencias.map((item) => <Advertencia advertencia={item.texto} resumen={item.resumen} />)}
                        {articulo.tiposOmegas.length > 0 && <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>{articulo.tiposOmegas.map((item) => <Chip label={item.nombre} color="primary" />)}</Stack>}
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
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    {articulo.vitaminas.legth > 0 && <Vitamina articulo={articulo} />}
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
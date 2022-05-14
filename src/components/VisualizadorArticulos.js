import * as React from 'react';
import { Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import * as PlaceholderValues from "./PlaceholderValues";

const articuloFake = PlaceholderValues.getArticuloFake();

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
            perfilAminos: "",
            perfilAG: ""
        }
    );

    React.useEffect(() => {
        setArticulo({
            titulo: articuloFake.titulo,
            etiquetas: articuloFake.etiquetas,
            tipoSuplemento: articuloFake.tipo,
            ingredientes: articuloFake.ingredientes,
            ingActivo: articuloFake.ingActivo,
            imagen: "",
            tamano: articuloFake.tamano,
            calorias: articuloFake.calorias,
            proteina: articuloFake.proteina,
            lipidos: articuloFake.lipidos,
            carbos: articuloFake.carbos,
            perfilAminos: PlaceholderValues.getPerfilAminosFake(),
            perfilAG: PlaceholderValues.getPerfilAGFake()
        });
    }, []
    );

    const datos = [articulo.titulo, articulo.tamano, articulo.calorias, articulo.proteina, articulo.lipidos, articulo.carbos];

    return (
        <>
            <Grid container direction="row">
                <Grid item xs={12} md={6}>
                    <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
                        <Typography variant="h3" color="primary">{articulo.titulo}</Typography>
                        <Typography variant="subtitle2" color="secondary">{articulo.etiquetas}</Typography>
                        <Typography variant="h5" color="primary">Ingredientes</Typography>
                        <Typography variant="body1" color="secondary">{articulo.ingredientes}</Typography>
                        <Typography variant="h5" color="primary">Ingrediente activo</Typography>
                        <Typography variant="body1" color="secondary">{articulo.ingActivo}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ bgcolor: '#cfe8fc', maxMeight: '500px', maxWidth: "500px" }}><Paper /></Box>
                </Grid>
                <Grid item xs={12}>
                    <TablaNutrimental {...datos} />
                </Grid>
                {articulo.tipoSuplemento >= 2 ? <></> : <Grid item xs={12}>
                    <Typography variant="body1" color="initial">Grafiquita</Typography>
                </Grid>}
            </Grid>
        </>
    );
}

function TablaNutrimental({ titulo, tamano, calorias, proteina, lipidos, carbos }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <caption>Información nutrimental {titulo}</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Nutrimento (porción de {tamano}&nbsp;g)</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Unidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Calorias</TableCell>
                        <TableCell align="right">{calorias}</TableCell>
                        <TableCell align="right">Cal</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Proteina</TableCell>
                        <TableCell align="right">{proteina}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Lipidos</TableCell>
                        <TableCell align="right">{lipidos}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hidratos de carbono</TableCell>
                        <TableCell align="right">{carbos}</TableCell>
                        <TableCell align="right">g</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
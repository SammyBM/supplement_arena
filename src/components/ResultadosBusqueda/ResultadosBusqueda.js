import * as React from 'react';
import { Grid, Pagination, Typography } from '@mui/material';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

import axios from 'axios';

import ApiContext from '../../contexts/ApiContext';
import TarjetaArticulo from './TarjetaArticulo';

export default function ResultadosBusqueda(props) {
    const api = React.useContext(ApiContext);

    const [resultados, setResultados] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        resultados.length <= (value * 12 - 1) ?
            setLimites(
                {
                    min: value * 12 - 12,
                    max: value * 12
                }
            )
            :
            setLimites(
                {
                    min: value * 12 - 12,
                    max: resultados.length
                }
            );
    };

    const [limites, setLimites] = React.useState(
        {
            min: 0,
            max: 11
        }
    );

    React.useEffect(() => {
        setResultados(sessionStorage.getItem("resultados"));
        console.log(resultados);
    });

    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1}>

                {(!resultados || resultados.length === 0) ? <Grid container direction="column" alignItems="center" justifyContent="center">
                    <br />
                    <Grid item xs={12}>
                        <Typography variant="h1" color="#6c6960" size=""><SentimentVeryDissatisfied sx={{ fontSize: 100 }} /></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" color="#6c6960">No encontramos resultados.</Typography>
                    </Grid>
                </Grid>
                    :
                    resultados.slice(limites.min, limites.max).map((item) => <Grid item key={item.articuloID} xs={12} md={6} lg={3}><TarjetaArticulo articulo={item} /></Grid>)

                }
            </Grid>
            {(!resultados || resultados.length === 0) ? <></> : <Pagination count={resultados.length % 12 === 0 ? resultados.length / 12 : Math.floor(resultados.length / 12) + 1} page={page} onChange={handleChange} />}
        </>
    );
}
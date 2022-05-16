import * as React from 'react';
import { Grid, Pagination } from '@mui/material';
import TarjetaArticulo from './TarjetaArticulo';
import * as PlaceholderValues from "../PlaceholderValues";

const resultados = PlaceholderValues.getResultadosFake();

export default function ResultadosBusqueda(props) {
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



    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1}>
                {resultados.slice(limites.min, limites.max).map((item) => <Grid item xs={12} md={6} lg={3}><TarjetaArticulo articulo={item} funcionMenu={props.funcionMenu} /></Grid>)}
            </Grid>
            <Pagination count={resultados.length % 12 == 0 ? resultados.length / 12 : Math.floor(resultados.length / 12) + 1} page={page} onChange={handleChange} />
        </>
    );
}
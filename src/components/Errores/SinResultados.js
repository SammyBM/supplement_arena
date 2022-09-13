import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';

function SinResultados() {
    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <br />
            <Grid item xs={12}>
                <Typography variant="h1" color="#6c6960" size=""><SentimentVeryDissatisfied sx={{ fontSize: 100 }} /></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" color="#6c6960">No encontramos resultados.</Typography>
            </Grid>
        </Grid>
    );
}

export default SinResultados;
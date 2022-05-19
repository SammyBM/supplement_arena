import * as React from 'react';
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Box, height } from '@mui/system';

import * as PlaceholderValues from '../PlaceholderValues';
import Tweet from './Tweet';


const descripcionActividad = "En esta herramienta encontrarás una selección de información que se considera relevante sobre el mercado actual de suplementos." + '\n' + "La información mostrada aquí es adquirida a través de las herramientas para desarrrolladores de Twitter.";


const tweets = PlaceholderValues.getTweetsFake();

export default function CentroNovedades() {
    const tweetCards = tweets.map((item) => <Grid item xs={12} md={8}> <Tweet tweet={item} /></Grid >);
    return (
        <>
            <Card>
                <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                    <CardContent>
                        <Typography variant="h3" noWrap component="div" fontFamily="Lexend Deca">
                            Novedades
                        </Typography>
                        <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                    </CardContent>
                </Paper>
            </Card>
            <Box sx={{ width: "inherit", height: "inherit", backgroundColor: "warning" }}>

                <br />
                <Grid container direction="column" alignItems="center" spacing={1} >
                    {tweetCards}
                </Grid>
            </Box>
        </>
    );
}
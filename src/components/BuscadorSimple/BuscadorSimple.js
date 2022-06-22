import * as React from 'react';
import { Box, Button, Card, CardContent, Container, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Stack, Tooltip, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const descripcionActividad = "Esta herramienta te ayuda a encontrar suplementos con la ayuda de un cuestionario guiado." + '\n' + "A través de este cuetionario se intentará encontrar un suplemento de acuerdo a tus intereses. Sin necesidad de conocimientos extensos en el tema." + '\n' + "Por favor recuerda que esta aplicación no hace recomendaciones de ninguna sustancia, solo facilita a sus usuarios la busqueda y comparación entre las opciones disponibles.";

const listaPreguntas = [
    {
        id: 1, pregunta: "Pregunta 1", respuestas: [
            { id: 1, respuesta: "Resp 1.1" },
            { id: 2, respuesta: "Resp 1.2" },
            { id: 3, respuesta: "Resp 1.3" }
        ]
    },
    {
        id: 2, pregunta: "Pregunta 2", respuestas: [
            { id: 1, respuesta: "Resp 2.1" },
            { id: 2, respuesta: "Resp 2.2" },
            { id: 3, respuesta: "Resp 2.3" }
        ]
    },
    {
        id: 3, pregunta: "Pregunta 3", respuestas: [
            { id: 1, respuesta: "Resp 3.1" },
            { id: 2, respuesta: "Resp 3.2" },
            { id: 3, respuesta: "Resp 3.3" }
        ]
    },
    {
        id: 4, pregunta: "Pregunta 4", respuestas: [
            { id: 1, respuesta: "Resp 4.1" },
            { id: 2, respuesta: "Resp 4.2" },
            { id: 3, respuesta: "Resp 4.3" }
        ]
    },
    {
        id: 5, pregunta: "Pregunta 5", respuestas: [
            { id: 1, respuesta: "Resp 5.1" },
            { id: 2, respuesta: "Resp 5.2" },
            { id: 3, respuesta: "Resp 5.3" }
        ]
    },
];

export default function BuscadorSimple() {
    return (
        <div>

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Card>
                    <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                        <CardContent>
                            <Typography variant="h3" component="div" fontFamily="Lexend Deca">
                                Buscador Simplificado
                            </Typography>
                            <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                        </CardContent>
                    </Paper>
                </Card>
                {/*https://mui.com/components/tabs/#basic-tabs*/}

                <Container sx={{
                    maxWidth: 400,
                    maxHeight: 400,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Paper elevation={5} sx={{ width: "inherit", height: "inherit", backgroundColor: "#F75E25", justifyContent: "center", alignItems: "center" }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center " sx={{ height: "inherit", width: "inherit" }}>
                            <Paper elevation={1} sx={{ maxWidth: 350, maxHeight: 350, backgroundColor: "beige", justifyContent: "center", alignItems: "center" }}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: "inherit", width: "inherit" }}>
                                    <Grid item xs={1} md={2}>
                                        <Stack direction="column" justifyContent="center" alignItems="center">
                                            <IconButton><ChevronLeftIcon /></IconButton>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} md={8}>
                                        <Grid container direction="column" spacing={2} justifyContent="space-around" alignItems="center">
                                            <Grid item xs={8}>
                                                <Typography variant='body2' component="div" fontFamily="Lexend Deca" color="secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore fugit est quae corrupti, quia odio animi. Beatae deleniti eaque totam dignissimos. Maxime, aspernatur quidem! Eos fuga voluptatum incidunt. Officia?</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Stack direction="column" justifyContent="center" alignItems="center">
                                                    <Button cariation="filled">Boton 1</Button>
                                                    <Button>Boton 2</Button>
                                                    <Button>Boton 3</Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} md={2}>
                                        <Stack direction="column" justifyContent="center" alignItems="center"></Stack>
                                        <IconButton><ChevronRightIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Paper>
                </Container >
            </Stack>
        </div>
    );
}
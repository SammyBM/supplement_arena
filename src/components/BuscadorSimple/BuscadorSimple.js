import * as React from 'react';
import { Button, Card, CardContent, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm, Controller } from 'react-hook-form';

import Service from '../../Service';
import { preguntasDinamicas, setRespuestasSimple } from '../../MetodosBusqueda';

const descripcionActividad = "Esta herramienta te ayuda a encontrar suplementos con la ayuda de un cuestionario guiado." + '\n' + "A través de este cuetionario se intentará encontrar un suplemento de acuerdo a tus intereses. Sin necesidad de conocimientos extensos en el tema." + '\n' + "Por favor recuerda que esta aplicación no hace recomendaciones de ninguna sustancia, solo facilita a sus usuarios la busqueda y comparación entre las opciones disponibles.";

export default function BuscadorSimple() {
    let respuestas;
    const [pregunta, setPregunta] = React.useState(preguntasDinamicas(null));

    const handleClick = () => {
        // TODO: Setear respuestas y cambiar preguntas 
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <>
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
                                                <Typography variant='body2' component="div" fontFamily="Lexend Deca" color="secondary">{pregunta.pregunta}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Stack direction="column" justifyContent="center" alignItems="center">
                                                    {pregunta.respuestas.forEach((resp) => <Button>{resp.texto}</Button>)}
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
        </>
    );
}
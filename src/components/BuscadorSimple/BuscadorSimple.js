import * as React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm, Controller } from 'react-hook-form';

import Service from '../../Service';
import Preguntas from '../../Preguntas.json'
import { preguntasDinamicas, setRespuestasSimple } from '../../MetodosBusqueda';

const descripcionActividad = "Esta herramienta te ayuda a encontrar suplementos con la ayuda de un cuestionario guiado." + '\n' + "A través de este cuetionario se intentará encontrar un suplemento de acuerdo a tus intereses. Sin necesidad de conocimientos extensos en el tema." + '\n' + "Por favor recuerda que esta aplicación no hace recomendaciones de ninguna sustancia, solo facilita a sus usuarios la busqueda y comparación entre las opciones disponibles.";

export default function BuscadorSimple() {
    const [pregunta, setPregunta] = React.useState(preguntasDinamicas(null));
    const [respuestas, setRespuestas] = React.useState(null);

    const handleClick = (e) => {
        // TODO: Setear respuestas y cambiar preguntas 
        if (pregunta.pregunta.preguntaID === 1)
            setRespuestas(setRespuestasSimple(pregunta.preguntaID, e.target.id));
        else
            setRespuestas(setRespuestasSimple(pregunta.preguntaID, e.target.id, respuestas));
        console.log(pregunta.preguntaID);
    }

    const desplazamiento = (e) => {
        console.log(e.target.id);
        if (e.target.id === "right") {
            console.log("right");
            setPregunta(preguntasDinamicas(respuestas, pregunta.preguntaID + 1))
        }
        if (e.target.id === "left") {
            console.log("left");
            setPregunta(preguntasDinamicas(respuestas, pregunta.preguntaID - 1))

        }
    }

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    React.useEffect(() => {
        console.log(pregunta);
    }, [pregunta]);

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

                <Card sx={{
                    display: {
                        backgroundColor: "beige"
                    }
                }}>
                    <CardHeader title={pregunta.pregunta} titleTypographyProps={{ fontFamily: "Lexend Deca", color: "white" }}
                        sx={{
                            display: {
                                backgroundColor: "#F75E25"
                            }
                        }} />
                    <CardContent>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            {pregunta.respuestas.map((resp) => <Button sx={{ m: 1 }} variant="contained" id={resp.respuestaID} onClick={handleClick}>{resp.texto}</Button>)}
                        </Stack>
                    </CardContent>
                    <CardActions sx={{
                        display: {
                            backgroundColor: "#F75E25"
                        }
                    }} >
                        <IconButton sx={{ display: { xs: pregunta.preguntaID === 1 ? "none" : "block" } }} id="left" onClick={desplazamiento}><ChevronLeftIcon /></IconButton>
                        <IconButton sx={{ display: { xs: pregunta.preguntaID === 7 ? "none" : "block" } }} id="right" onClick={desplazamiento}><ChevronRightIcon /></IconButton>
                    </CardActions>
                </Card>
            </Stack>
        </>
    );
}

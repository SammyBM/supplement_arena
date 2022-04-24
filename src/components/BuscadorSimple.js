import * as React from 'react';
import { Box, Card, CardContent, Container, Grid, Paper, Typography } from '@mui/material';


const descripcionActividad = "Esta herramienta te ayuda a encontrar suplementos con la ayuda de un cuestionario guiado." + '\n' + "A través de este cuetionario se intentará encontrar un suplemento de acuerdo a tus intereses. Sin necesidad de conocimientos extensos en el tema." + '\n' + "Por favor recuerda que esta aplicación no hace recomendaciones de ninguna sustancia, solo facilita a sus usuarios la busqueda y comparación entre las opciones disponibles.";


export default function BuscadorSimple() {
    return (
        <div>
            <Card>
                <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                    <CardContent>
                        <Typography variant="h3" noWrap component="div" fontFamily="Lexend Deca">
                            Buscador Simplificado
                        </Typography>
                        <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                    </CardContent>
                </Paper>
            </Card>

            {/*https://mui.com/components/tabs/#basic-tabs*/}
            <Container fixed sx={{
                width: 200,
                height: 200
            }}>
                <Paper elevation={3} sx={{ backgroundColor: "darkgray" }}>A</Paper>
            </Container>
            <Container fixed sx={{
                width: 200,
                height: 200
            }}>
                <Paper elevation={3} sx={{ height: "200", width: "200", backgroundColor: "darkgray" }}>B</Paper>
            </Container>
        </div>
    );
}
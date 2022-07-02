import * as React from 'react';
import { Button, Container, Grid, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, Slide, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import Service from "../../Service";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoginIcon from "@mui/icons-material/Login"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { height } from '@mui/system';

import ApiContext from "../../contexts/ApiContext";

export default function RecuperacionContrasena(props) {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            correo: "",
            contrasena: " "
        }
    });

    const [sent, SetSent] = React.useState(false);

    const handleUser = () => {
        //mandar correo
        SetSent(true);
    };

    //Leer registro en BD, comparar contraseña, devolver datos de usuario y guardarlos en Contexto, 
    //sino regresar error (no registro o contraseña incorrecta)
    const submit = (data) => {
        console.log(data);
        Service.postData("usuarios/login", data).then((result) => {
            if (result.status === "true")
                handleUser();
            else
                mostrarNotificacion("No encontramos una cuenta con esos datos");
        }).catch((err) => {
            console.error(err);
            mostrarNotificacion("Hubo un problema buscando su cuenta. Intente más tarde.");
        }).finally(() => reset());
    }


    const onError = (err) => {
        handleErrores(err);
    }

    const handleErrores = (err) => {
        err.contrasena && mostrarNotificacion(err.contrasena.message, "warning");
        err.correo && mostrarNotificacion(err.correo.message, "warning");
    }


    const [transition, setTransition] = React.useState(undefined);
    const [notificacion, setNotificacion] = React.useState({
        mostrar: false,
        mensaje: "",
        severity: "",
    });


    const mostrarNotificacion = (msg, svty) => {
        setNotificacion({
            mostrar: true,
            mensaje: msg,
            severity: svty
        });
        setTransition(() => TransitionLeft);
    }

    const cerrarNotificacion = () => {
        setNotificacion(
            {
                ...notificacion,
                mostrar: false
            }
        );
    }

    if (sent) {
        return (
            <Container fixed sx={{
                width: 400,
                height: 400,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Paper elevation={5} sx={{ width: "inherit", height: "inherit", backgroundColor: "#F75E25", justifyContent: "center", alignItems: "center" }}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: "inherit", width: "inherit" }}>
                        <Paper elevation={1} sx={{ width: 350, height: 350, backgroundColor: "beige", justifyContent: "center", alignItems: "center" }}>
                            <Grid container direction="column" justifyContent="center" alignContent="center" sx={{ height: "inherit", width: "inherit" }}>
                                <Typography variant="p" color="secondary">Se han enviado tus credenciales a tu correo electronico</Typography>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <Tooltip title='Iniciar sesión'>
                                        <Button type="submit" onClick={handleSubmit(submit, onError)} variant='contained' color='primary' endIcon={<HomeIcon />}>
                                            Ir a inicio
                                        </Button>
                                    </Tooltip>
                                </FormControl>
                            </Grid>
                        </Paper>
                    </Grid>
                </Paper>
            </Container >
        )
    }

    else {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <Container fixed sx={{
                        width: 400,
                        height: 400,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Paper elevation={5} sx={{ width: "inherit", height: "inherit", backgroundColor: "#F75E25", justifyContent: "center", alignItems: "center" }}>
                            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: "inherit", width: "inherit" }}>
                                <Paper elevation={1} sx={{ width: 350, height: 350, backgroundColor: "beige", justifyContent: "center", alignItems: "center" }}>
                                    <Grid container direction="column" justifyContent="center" alignContent="center" sx={{ height: "inherit", width: "inherit" }}>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <InputLabel htmlFor="correo">Correo electronico</InputLabel>
                                            <Controller name="correo" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <Input
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <AlternateEmailIcon />
                                                        </InputAdornment>
                                                    }
                                                />
                                            )}
                                                rules={
                                                    {
                                                        required: "Ingresar un correo electronico es obligatorio.",
                                                        pattern: {
                                                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                                            message: "Por favor ingrese un correo electronico."
                                                        },
                                                    }
                                                }
                                            />
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <Tooltip title='Iniciar sesión'>
                                                <Button type="submit" onClick={handleSubmit(submit, onError)} variant='contained' color='primary' endIcon={<LoginIcon />}>
                                                    Iniciar
                                                </Button>
                                            </Tooltip>
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <Tooltip title='Crear una cuenta'>

                                                <Button variant='outlined' color='primary' startIcon={<AccountCircleIcon />} onClick={() => Service.changePage("registro")}>
                                                    Registrate
                                                </Button>
                                            </Tooltip>
                                        </FormControl>
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <Tooltip title='Iniciar sesión'>
                                                <Button variant='outlined' color='primary' startIcon={<LoginIcon />} onClick={() => Service.changePage("login")}>
                                                    ¿Ya tienes cuenta?
                                                </Button>
                                            </Tooltip>
                                        </FormControl>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Container >
                </form>

                <Snackbar
                    open={notificacion.mostrar}
                    onClose={cerrarNotificacion}
                    TransitionComponent={transition}
                    message={notificacion.mensaje}
                    severity={notificacion.severity}
                    key={"notificacion: " + notificacion.mensaje}
                />
            </>
        );
    }
}
function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
import * as React from 'react';

import Paper from "@mui/material/Paper";
import { Grid, Container, Stack } from '@mui/material';
import { Button, Container, Grid, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, Slide, Snackbar, Stack, Tooltip } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import Service from "../../Service";


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoginIcon from "@mui/icons-material/Login"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { height } from '@mui/system';

import ApiContext from "../../contexts/ApiContext";
import UserContext from "../../contexts/UserContext";
import axios from 'axios';

export default function Login(props) {
    const { user, setUser } = React.useContext(UserContext);
    const api = React.useContext(ApiContext);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            correo: "",
            contrasena: ""
        }
    });

    const handleChange = (usuario) => {
        setUser(
            {
                usuarioID: usuario.usuarioID,
                tipoUsuarioID: usuario.tipoUsuarioID,
                nombre: usuario.nombre,
                nombreUsuario: usuario.nombreUsuario,
                fechaNacimiento: usuario.fechaNacimiento
            }
        );

    };

    //Leer registro en BD, comparar contraseña, devolver datos de usuario y guardarlos en Contexto, 
    //sino regresar error (no registro o contraseña incorrecta)
    const submit = (data) => {
        console.log(data);
        Service.postData("usuarios/login", data).then((result) => {
            this.updateLoginStatus(result);
        });
       /*  axios({
            method: 'POST',
            url: api.concat("usaurios/login.php"),
            data: data
        }).catch((error) => {
           mostrarNotificacion("No encontramos una cuenta con esos datos");
        }).finally(() => {
            reset();
        }) */
        
    }
    const updateLoginStatus = (data) => {
        if (data.status === "true") {
            reset();
          }else{
            mostrarNotificacion("No encontramos una cuenta con esos datos");
          }
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
                                        <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
                                        <Controller name="contrasena" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={onChange}
                                                value={value}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                            rules={{
                                                required: "Ingresar la contraseña es obligatorio",
                                                minLength: {
                                                    value: 8,
                                                    message: "Tu contraseña debe tener al menos 8 caracteres"
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <Tooltip title='Iniciar sesión'>
                                            <Button type="submit" onClick={handleSubmit(submit, onError)} variant='contained' color='primary' endIcon={<LoginIcon />}>
                                                Ingresar
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

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
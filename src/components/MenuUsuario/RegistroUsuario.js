import * as React from 'react';
import { Button, Container, Grid, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, Slide, Snackbar, Tooltip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SendIcon from '@mui/icons-material/Send';
import LoginIcon from '@mui/icons-material/Login'

import ApiContext from "../../contexts/ApiContext";
import UserContext from "../../contexts/UserContext";
import axios from 'axios';

export default function RegistroUsuario(props) {
    const { user, setUser } = React.useContext(UserContext);
    const api = React.useContext(ApiContext);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            nombre: '',
            apellido: '',
            edad: '',
            contrasena: '',
            correo: '',
            usuario: '',
            fechaNacimiento: ''
        }
    });

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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


    const submit = (data) => {
        axios({
            method: 'POST',
            url: api.concat("usaurios/create.php"),
            data: data
        }).catch((error) => {
            mostrarNotificacion("No encontramos una cuenta con esos datos");
        })
        alert("coso");
    }

    const onError = (err) => {
        handleErrores(err);
    }

    const handleErrores = (err) => {
        console.error(err);
        err.nombre && mostrarNotificacion(err.nombre.message, "warning");
        err.apellido && mostrarNotificacion(err.apellido.message, "warning");
        err.contrasena && mostrarNotificacion(err.contrasena.message, "warning");
        err.correo && mostrarNotificacion(err.correo.message, "warning");
        err.nombreUsuario && mostrarNotificacion(err.nombreUsuario.message, "warning");
        err.fechaNacimiento && mostrarNotificacion(err.fechaNacimiento.message, "warning");
    }

    const cambiarPagina = (actividad) => {
        props.funcionMenu(actividad)
    };

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
            <form onSubmit={handleSubmit(submit)}>
                <Container fixed sx={{
                    width: 400,
                    height: 600,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Paper elevation={5} sx={{ width: "inherit", height: "inherit", backgroundColor: "#F75E25", justifyContent: "center", alignItems: "center" }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: "inherit", width: "inherit" }}>
                            <Paper elevation={1} sx={{ width: 350, height: 550, backgroundColor: "beige", justifyContent: "center", alignItems: "center" }}>
                                <Grid container direction="column" justifyContent="center" alignContent="center" sx={{ height: "inherit", width: "inherit" }}>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="nombre">Nombre</InputLabel>
                                        <Controller name="nombre" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <AccountCircleIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                            rules={{
                                                required: "Ingresar su nombre es obligatorio."
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="apellido">Apellido</InputLabel>
                                        <Controller name="apellido" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <AccountCircleIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                            rules={{
                                                required: "Ingresar su apellido es obligatorio"
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="nombreUsuario">Nombre de usuario</InputLabel>
                                        <Controller name="nombreUsuario" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <AccountCircleIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                            rules={{
                                                required: "Es necesario ingresar un nombre de usuario"
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <Controller name="fechaNacimiento" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                label="Fecha de nacimiento"
                                                type="date"
                                                defaultValue="2017-05-24"
                                                onChange={onChange}
                                                value={value}
                                                sx={{ width: 220 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                            rules={{
                                                required: "Por favor seleccione su fecha de nacimiento"
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="correo">Correo electronico</InputLabel>
                                        <Controller name="correo" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <AlternateEmailIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                            rules={{
                                                required: "Ingresar un correo electronico es obligatorio.",
                                                pattern: {
                                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                                    message: "Por favor ingrese un correo electronico."
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
                                        <Controller name="contrasena" control={control} render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                value={value}
                                                onChange={onChange}
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
                                                },
                                                pattern: {
                                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
                                                    message: "Su contraseña debe tener al menos 1 mayuscula, 1 minuscula y 1 numero"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Tu contraseña puede tener hasta 20 caracteres"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <Tooltip title='Enviar registro'>
                                            <Button type="submit" onClick={handleSubmit(submit, onError)} variant='contained' color='primary' endIcon={<SendIcon />}>
                                                Registrate
                                            </Button>
                                        </Tooltip>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                        <Tooltip title='Iniciar sesión'>
                                            <Button variant='outlined' color='primary' startIcon={<LoginIcon />} onClick={() => cambiarPagina("login")}>
                                                ¿Ya tienes cuenta?
                                            </Button>
                                        </Tooltip>
                                    </FormControl>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Paper >
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
import * as React from 'react';
import Paper from "@mui/material/Paper";
import { Grid, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SendIcon from '@mui/icons-material/Send';
import LoginIcon from '@mui/icons-material/Login'
import Tooltip from '@mui/material/Tooltip';

export default function RegistroUsuario(props) {
    const [values, setValues] = React.useState({
        nombre: '',
        apellido: '',
        edad: '',
        contrasena: '',
        correo: '',
        usuario: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const textfieldProps = {
        shrink: true,
        required: true,
        type: "string"
    };

    const cambiarPagina = (actividad) => {
        props.funcionMenu(actividad)
    };

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
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="correo">Correo electronico</InputLabel>
                                <Input
                                    id="correo"
                                    value={values.correo}
                                    onChange={handleChange('correo')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="nombreUsuario">Nombre de usuario</InputLabel>
                                <Input
                                    id="nombreUsuario"
                                    value={values.usuario}
                                    onChange={handleChange('usuario')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
                                <Input
                                    id="contrasena"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Tooltip title='Enviar registro'>
                                    <Button variant='contained' color='primary' endIcon={<SendIcon />}>
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

    );
}
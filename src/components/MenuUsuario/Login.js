import * as React from 'react';
import Paper from "@mui/material/Paper";
import { Grid, Container, Stack } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Tooltip from "@mui/material/Tooltip"
import LoginIcon from "@mui/icons-material/Login"
import Button from "@mui/material/Button"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { height } from '@mui/system';


export default function Login(props) {

    const [values, setValues] = React.useState({
        contrasena: '',
        correo: '',
        showPassword: false,
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
                                <Tooltip title='Iniciar sesión'>
                                    <Button variant='contained' color='primary' endIcon={<LoginIcon />}>
                                        Ingresar
                                    </Button>
                                </Tooltip>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <Tooltip title='Crear una cuenta'>
                                    <Button variant='outlined' color='primary' startIcon={<AccountCircleIcon />} onClick={() => cambiarPagina("registro")}>
                                        Registrate
                                    </Button>
                                </Tooltip>
                            </FormControl>
                        </Grid>
                    </Paper>
                </Grid>
            </Paper>
        </Container >

    );
}
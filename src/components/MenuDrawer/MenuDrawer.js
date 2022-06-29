import React, { useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Box, ButtonBase, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Snackbar, Toolbar, Typography, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

import IconoMenu from './IconoMenu';
import AvatarMenu from '../MenuUsuario/AvatarMenu';
import BusquedaPredictiva from '../BuscadorPredictivo/BusquedaPredictiva';
import MenuAdmin from '../MenuAdmin/MenuAdmin';

import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Login from '../MenuUsuario/Login';
import EditorArticulos from '../EditorArticulos/EditorArticulos';
import CentroNovedades from '../Novedades/CentroNovedades';
import RegistroUsuario from '../MenuUsuario/RegistroUsuario';
import BuscadorAvanzado from '../BuscadorAvanzado/BuscadorAvanzado';
import CentroReportes from '../Reportes/CentroReportes';
import BuscadorSimple from '../BuscadorSimple/BuscadorSimple';
import VisualizadorArticulos from '../VisualizadorArticulos/VisualizadorArticulos';
import ResultadosBusqueda from '../ResultadosBusqueda/ResultadosBusqueda';
import RecuperacionContrasena from '../MenuUsuario/RecuperacionContrasena';
import Service from '../../Service';
import { INVITADO } from '../../constantes';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const appBarColor = {
    backgroundColor: "#F75E25"
};

const drawerStyles = {

    divider: {
        background: "#6C6960"
    },
    paper: {
        background: "#191919"
    }
};

const actividadesUsuarios = (tipoUsuario) => {
    if (tipoUsuario < 3)
        return menuActividades.slice(0, 2);
    else
        return menuActividades;
}

//borrar acceso a resultados y visualizador
const menuActividades = [
    { actividad: "Buscador avanzado", id: "buscadorAvanzado" },
    { actividad: "Buscador simplificado", id: "buscadorSimple" },
    { actividad: "Editor de articulos", id: "editor" },
    { actividad: "Centro de novedades", id: "novedades" },
    { actividad: "Centro de reportes", id: "reportes" },
    { actividad: "Visualizador", id: "visualizador" },
    { actividad: "Resultados", id: "resultados" }
];

export default function MenuDrawer(props) {
    const usuario = sessionStorage.getItem("usuario") == null ? INVITADO : JSON.parse(sessionStorage.getItem("usuario"));
    const tipoUsuario = usuario.tipoUsuarioID

    const [pagina, setPagina] = React.useState(props.actividad);
    const [articulo, setArticulo] = React.useState(null);
    const [resultados, setResultados] = React.useState(null);

    const cambiarPagina = (actividad, art = null, res = null) => {
        Service.changePage(actividad);
        setArticulo(art)
        setResultados(res)
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [openBar, setOpenBar] = React.useState(false);

    const handleBarDrawer = (value) => {
        setOpenBar(value);
    };

    const [notificacion, setNotificacion] = React.useState({
        mostrar: false,
        mensaje: "",
        severity: "",
    });

    const mostrarNotificacion = ({ msg, svty }) => {
        setNotificacion({
            mostrar: true,
            mensaje: msg,
            severity: svty
        });
    }

    const cerrarNotificacion = () => {
        setNotificacion({
            mostrar: false,
            mensaje: "",
            severity: ""
        })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        <Grid container direction="row" justifyContent="space-around" alignItems="center">
                            <Grid item xs={6} md={4} lg={3}>
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            marginRight: 5,
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <ButtonBase onClick={() => cambiarPagina("")}>
                                        <Typography variant="h6" noWrap component="div">
                                            Supplement Arena
                                        </Typography>
                                    </ButtonBase>
                                </Toolbar>
                            </Grid>
                            <Grid component={Box} item xs={0} md={4} lg={8} display={{ xs: "none", md: "block" }}>
                                <BusquedaPredictiva />
                            </Grid>
                            <Grid component={Box} item xs={3} md={0} display={{ xs: "block", md: "none" }}>
                                <IconButton onClick={() => handleBarDrawer(true)}><SearchIcon /></IconButton>
                            </Grid>
                            <Grid item xs={3} md={1} lg={1}>
                                <AvatarMenu funcionMenu={(actividad) => cambiarPagina(actividad)} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </AppBar >
            <Drawer anchor="bottom" open={openBar} >
                <Box
                    sx={{ width: 'auto' }}
                    role="presentation"
                    onClick={() => handleBarDrawer(false)}
                    onKeyDown={() => handleBarDrawer(false)}
                >
                    <List>
                        <ListItem key="busquedaPredictiva">
                            <BusquedaPredictiva />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {actividadesUsuarios(tipoUsuario).map((item) => (
                        <Tooltip key={item.actividad} title={item.actividad} placement="right">
                            <ListItem key={item.actividad} disablePadding>
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => cambiarPagina(item.id)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconoMenu id={item.id} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.actividad} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                    <Tooltip sx={{ display: { xs: tipoUsuario == 4 ? 'none' : 'block' } }} key="menu-admin" title="Funciones admin" placement="right">
                        <MenuAdmin show={tipoUsuario} open={open} />
                    </Tooltip>
                </List>
            </Drawer>
            <Grid component="main" alignItems="center" justifyContent="center" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<RegistroUsuario />} />
                            <Route path="/recuperar" element={<RecuperacionContrasena />} />
                            <Route path="/editor" element={<EditorArticulos />} />
                            <Route path="/buscadorAvanzado" element={<BuscadorAvanzado />} />
                            <Route path="/buscadorSimple" element={<BuscadorSimple />} />
                            <Route path="/resultados" element={<ResultadosBusqueda />} />
                            <Route path="/visualizador" element={<VisualizadorArticulos />} />
                            <Route path="/novedades" element={<CentroNovedades />} />
                            <Route path="/reportes" element={<CentroReportes />} />
                            <Route path="*" component={NotFound} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </Grid>

        </Box >
    );
}
function NotFound() {
    return <><Typography variant="h2">Ha llegado a una página que no existe</Typography></>;
}



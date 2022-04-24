import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Tooltip } from '@mui/material';
import { ButtonBase } from '@mui/material';

import ActivityHandler from './ActivityHandler';
import IconoMenu from './IconoMenu';
import AvatarMenu from './AvatarMenu';
import BusquedaPredictiva from './BusquedaPredictiva';


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


const menuActividades = [
    { actividad: "Buscador avanzado", id: "buscadorAvanzado" },
    { actividad: "Buscador simplificado", id: "buscadorSimple" },
    { actividad: "Editor de articulos", id: "editor" },
    { actividad: "Centro de novedades", id: "novedades" },
    { actividad: "Centro de reportes", id: "reportes" }
];

export default function MenuDrawer(props) {

    const [pagina, setPagina] = React.useState(props.actividad);

    const cambiarPagina = (actividad) => {
        setPagina(actividad)
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                            <ButtonBase onClick={() => cambiarPagina("landing")}>
                                <Typography variant="h6" noWrap component="div">
                                    Supplement Arena
                                </Typography>
                            </ButtonBase>
                        </Toolbar>
                        <BusquedaPredictiva />
                        <AvatarMenu funcionMenu={(actividad) => cambiarPagina(actividad)} />
                    </Box>
                </Box>
            </AppBar >
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuActividades.map((item) => (
                        <Tooltip title={item.actividad} placement="right">
                            <ListItemButton
                                key={item}
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
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
            <Grid component="main" alignItems="center" justifyContent="center" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <ActivityHandler activity={pagina} funcionMenu={(actividad) => cambiarPagina(actividad)}></ActivityHandler>
            </Grid>
        </Box >
    );
}

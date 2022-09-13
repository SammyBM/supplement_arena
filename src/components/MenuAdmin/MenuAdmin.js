import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemButton, ListItemText, Slide, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Service from "../../Service";
import PeopleIcon from '@mui/icons-material/People';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const Input = styled('input')({
    display: 'none',
});

/**
 * 
 * @param {any[]} props array of properties
 * @param {Integer} show property to authorize user by their user type
 * @param {Boolean} open property to show or hide component
 * @returns 
 */

export default function MenuAdmin(props) {

    //Tomar username para avatar
    //Pasar estado a funcion padre para cambiar de actividad

    //Access parents methods: https://stackoverflow.com/questions/26176519/reactjs-call-parent-method
    //Access childs state: https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-r

    const show = props.show === 4 ? "block" : "none";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const openDrawer = props.open;
    const [link, setlink] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [notificacion, setNotificacion] = React.useState({
        mostrar: false,
        mensaje: "",
        severity: "",
    });

    const [transition, setTransition] = React.useState(undefined);


    const mostrarNotificacion = (msg, svty) => {
        setNotificacion({
            mostrar: true,
            mensaje: msg,
            severity: svty
        });
        setTransition(() => TransitionLeft);
    }

    const cerrarNotificacion = () => {
        setNotificacion({
            mostrar: false,
            mensaje: "",
            severity: ""
        })
    }
    const MENSAJE = "Descargando...";
    const SEVERITY = "error";

    const needBackup = () => {
        Service.postData("backup/backup", null).then((result) => {
            console.log(result.status);
            if (result.status == true) {
                mostrarNotificacion("Respaldo descargado correctamente", "warning");
                let url = window.URL.createObjectURL(new Blob([result.file]));
                const element = document.createElement("a");
                element.href = url;
                document.body.appendChild(element);
                element.click();
                element.parentNode.removeChild(element);
            } else
                mostrarNotificacion("Hubo un problema descargando información. Intente más tarde.", "warning");
        }).catch((err) => {
            console.error(err);
            mostrarNotificacion("Hubo un problema descargando información. Intente más tarde.", "warning");
        }).finally(mostrarNotificacion(MENSAJE, SEVERITY));

    }


    return (
        <>
            <ListItemButton
                key="funcionesAdmin"
                id="funciones-admin-btn"
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? 'initial' : 'center',
                    px: 2.5,
                    display: { xs: show }
                }}>
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: openDrawer ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Funciones admin" sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
            <Menu
                anchorEl={anchorEl}
                id="menu-admin"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },

                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
            >
                <MenuItem onClick={() => needBackup()}>
                    <ListItemIcon>
                        <DownloadForOfflineIcon />
                    </ListItemIcon>
                    Descargar respaldo
                </MenuItem>
                <MenuItem onClick={() => Service.changePage("PanelUsuarios")}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    Panel de usaurios
                </MenuItem>
            </Menu>
            <Snackbar
                open={notificacion.mostrar}
                onClose={cerrarNotificacion}
                TransitionComponent={transition}
                message={notificacion.mensaje}
                severity={notificacion.severity}
                key={"notificacion: " + notificacion.mensaje}
            />
        </>
    )
}

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
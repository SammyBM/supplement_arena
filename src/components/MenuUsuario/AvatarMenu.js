import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import Service from "../../Service";
import { INVITADO } from "../../constantes";

export default function AvatarMenu(props) {

    //Tomar username para avatar
    //Pasar estado a funcion padre para cambiar de actividad

    //Access parents methods: https://stackoverflow.com/questions/26176519/reactjs-call-parent-method
    //Access childs state: https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-r

    const usuario = sessionStorage.getItem("usuario") == null ? INVITADO : JSON.parse(sessionStorage.getItem("usuario"))

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const cambiarPagina = (actividad) => {
        /* props.funcionMenu(actividad) */
        Service.changePage(actividad);
    };

    //

    return (
        <>
            <Tooltip title="Sesión">
                <IconButton
                    onClick={handleClick}
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'menu-cuenta' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32, display: { xs: usuario.tipoUsuarioID != 1 ? "block" : "none" } }}>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
                    <Avatar sx={{ width: 32, height: 32, display: { xs: usuario.tipoUsuarioID == 1 ? "block" : "none" } }} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="menu-cuenta"
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
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ display: { xs: usuario.tipoUsuarioID > 1 ? 'none' : 'block' } }} onClick={() => cambiarPagina("login")}>
                    <ListItemIcon>
                        <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    Iniciar sesión
                </MenuItem>
                <MenuItem sx={{ display: { xs: usuario.tipoUsuarioID <= 1 ? 'none' : 'block' } }} onClick={() => {
                    sessionStorage.removeItem("usuario")
                    Service.changePage("")
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}
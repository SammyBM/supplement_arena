import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import ApiContext from '../../contexts/ApiContext';
import { INVITADO } from '../../constantes';

import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const Input = styled('input')({
    display: 'none',
});

function SimpleDialog(props) {
    const api = React.useContext(ApiContext);

    const { onClose, open } = props;

    let imagenes = props.imagenes;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        console.log(value);

        if (value === "agregarImagen") {
            /* axios.get(api.concat('imagenes_carrousel/create.php', value.fotoID)).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.warn(error);
            }); */
            return;
        }
        else
            axios.get(api.concat('imagenes_carrousel/delete.php?id=', value.fotoID)).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.warn(error);
            });
    };

    const handleImageSelect = (event) => {
        const formData = new FormData();
        formData.append('fileToUpload', event.target.files[0]);

        setTimeout(async () => {
            await axios({
                method: 'POST',
                url: api.concat('imagenes/imagenes_carrousel/create2.php'),
                data: { file: event.target.files[0] },
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            }
            );

        }, 1000)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Seleccionar imagenes de inicio</DialogTitle>
            <List sx={{ pt: 0 }}>
                {imagenes.map((imagen) => (
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={imagen.nombre_foto} />
                        <IconButton onClick={() => handleListItemClick(imagen)} key={imagen}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </ListItem>
                ))}

                <label htmlFor="btn-subir-imagen">
                    <ListItem autoFocus button onClick={() => handleListItemClick('agregarImagen')}>
                        <Input onChange={handleImageSelect} accept="image/*" id="btn-subir-imagen" name="imagenSuplemento" type="file" />
                        <ListItemAvatar>
                            <AddPhotoAlternateIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Agregar imagen" />
                    </ListItem>
                </label>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
    const api = React.useContext(ApiContext);

    const usuario = sessionStorage.getItem("usuario") == null ? INVITADO : JSON.parse(sessionStorage.getItem("usuario"));
    const tipoUsuario = usuario.tipoUsuarioID

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [imagenes, setImagenes] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);

    };

    const handleImagenes = async () => {
        await axios.get(api.concat('imagenes/imagenes_carrousel/read.php')).then(res => {
            const data = res.data;
            data.records.length > 0 ? setImagenes(data.records) : setImagenes([]);
        });
    }

    React.useEffect((() => {
        setTimeout(async () => {
            handleImagenes();
            console.log(imagenes);
            setLoading(false);
        }, 5000);
    }), []);

    if (loading)
        return (
            <Skeleton variant="circular">
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Skeleton>
        )

    else
        return (
            <>
                <IconButton sx={{ display: { xs: tipoUsuario > 2 ? "block" : "none" } }} variant="outlined" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    imagenes={imagenes}
                />
            </>
        );
}
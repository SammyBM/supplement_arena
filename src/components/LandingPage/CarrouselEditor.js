import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const api = "http://localhost/api/";


const Input = styled('input')({
    display: 'none',
});

function SimpleDialog(props) {
    const { onClose, open } = props;

    const [selectedImage, setSelectedImage] = React.useState(null);

    const [imagenes, setImagenes] = React.useState([]);

    const { register, handleSubmit } = useForm();

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        if (value === "agregarImagen")
            return;
        axios.get(api.concat('imagenes_carrousel/delete.php?id=', value.id)).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.warn(error);
        });
    };

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
        console.log(selectedImage);
        axios.post(api.concat('imagenes_carrousel/create.php'), {
            nombre_foto: null
        }).then((response) => { });
    }

    const handleImagenes = () => {
        axios.get(api.concat('imagenes_carrousel/read.php')).then(res => {
            const data = res.data;
            setImagenes(data.records);
        });
    }

    const desiplay = (data) => console.log("hey", data);

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
                        <ListItemText primary={imagen} />
                        <IconButton onClick={() => handleListItemClick(imagen)} key={imagen}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </ListItem>
                ))}

                <label htmlFor="btn-subir-imagen">
                    <ListItem autoFocus button onClick={() => handleListItemClick('agregarImagen')}>
                        <Input inputRef={register} onChange={handleImageSelect} accept="image/*" id="btn-subir-imagen" name="imagenSuplemento" type="file" />
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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);

    };

    return (
        <>
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </>
    );
}
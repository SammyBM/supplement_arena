import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SendIcon from "@mui/icons-material/Send"
import axios from 'axios';

import ApiContext from '../ApiContext';

export default function FormatoReportes(props) {
    const api = React.useContext(ApiContext);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            resumen: "",
            texto: "",
            articulo: props.articulo.articuloID,
            fecha: Date.now()
        }
    });

    const submit = data => {
        axios.post(api.concat("reportes/create.php"), {
            resumen: data.resumen,
            texto: data.texto,
            fecha: data.fecha,
            articuloID: data.articulo
        }).catch((err) => {
            console.warn(err);
        });
        handleClose();
    }

    const handleClose = () => {
        props.funcionCerrar();
        reset();
    }

    return (
        <>
            <form>
                <Dialog open={props.abierto} onClose={handleClose}>
                    <DialogTitle>Crear un reporte.</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Describa el motivo de su reporte en una linea de resumen.
                        </DialogContentText>
                        <Controller name="resumen" control={control} render={({ field: { onChange, value } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Resumen"
                                onChange={onChange}
                                value={value}
                                fullWidth
                                variant="standard"
                            />
                        )}
                            rules={{ required: "Se debe llenar el campo resumen." }}
                        />
                        <DialogContentText>
                            Ingrese los detalles de su reporte
                        </DialogContentText>
                        <Controller name="texto" control={control} render={({ field: { onChange, value } }) => (
                            <TextField
                                margin="dense"
                                label="Detalles del reporte"
                                onChange={onChange}
                                value={value}
                                fullWidth
                                multiline
                            />
                        )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" onClick={handleSubmit(submit)} endIcon={<SendIcon />} >Enviar</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    );
}

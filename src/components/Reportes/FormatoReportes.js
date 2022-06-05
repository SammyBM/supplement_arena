import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SendIcon from "@mui/icons-material/Send"

export default function FormatoReportes(props) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            resumen: "",
            texto: "",
            articulo: props.articulo.articuloID,
            fecha: Date.now()
        }
    });

    const onSubmit = data => console.log(data);

    const handleClose = () => {
        props.funcionCerrar();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={props.abierto} onClose={handleClose}>
                    <DialogTitle>Crear un reporte.</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Describa el motivo de su reporte en una linea de resumen.
                        </DialogContentText>
                        <Controller name="resumen" const={control} render={({ }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="resumen"
                                label="Resumen"
                                fullWidth
                                variant="standard"
                            />
                        )} />
                        <DialogContentText>
                            Ingrese los detalles de su reporte
                        </DialogContentText>
                        <Controller name="texto" control={control} render={({ }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="detalles"
                                label="Detalles del reporte"
                                fullWidth
                                multiline
                            />
                        )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" onClick={handleClose} endIcon={<SendIcon />}>Enviar</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    );
}

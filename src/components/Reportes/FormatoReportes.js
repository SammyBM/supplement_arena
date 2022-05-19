import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import SendIcon from "@mui/icons-material/Send"

export default function FormatoReportes(props) {
    const handleClose = () => {
        props.funcionCerrar();
    }

    return (
        <>
            <Dialog open={props.abierto} onClose={handleClose}>
                <DialogTitle>Crear un reporte.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Describa el motivo de su reporte en una linea de resumen.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="resumen"
                        label="Resumen"
                        fullWidth
                        variant="standard"
                    />
                    <DialogContentText>
                        Ingrese los detalles de su reporte
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="detalles"
                        label="Detalles del reporte"
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} endIcon={<SendIcon />}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

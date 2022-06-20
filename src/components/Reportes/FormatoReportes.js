import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SendIcon from "@mui/icons-material/Send"
import axios from 'axios';
import Service from "../../Service";
import ApiContext from '../../contexts/ApiContext';
import UserContext from '../../contexts/UserContext';

export default function FormatoReportes(props) {
    const api = React.useContext(ApiContext);
    const usuario = React.useContext(UserContext);
    const propis = JSON.parse(sessionStorage.getItem("props"))
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            resumen: "",
            texto: "",
            articulo:""+ propis.articuloID,
            fecha: date,
            usuario: 1
        }
    });

    const submit = (data) => {
        console.log(data)
        let user= {
                articuloID: data.articulo,
                resumen: data.resumen,
                texto: data.texto,
                fechaCreacion: data.fecha,
                usuarioID: data.usuario
            };
        console.log(user);
        Service.postData("reportes/create",user).then((result) => {
            updateLoginStatus(result);
        });
        /* axios.post(api.concat("reportes/create.php"), {
            articuloID: data.articulo,
            resumen: data.resumen,
            texto: data.texto,
            fechaCreacion: data.fecha,
            usuarioID: data.usuario
        }).catch((err) => {
            console.warn(err);
        }); */
        
    }
    const updateLoginStatus = (data) => {
        if (data.status === "true") {
            console.log("si sirvo");
           /*  mostrarNotificacion("Reporte enviado"); */
          }else{
            console.log("eres una deshonra para la naturaleza");
           /*  mostrarNotificacion("No encontramos una cuenta con esos datos"); */
          }
          handleClose();
    }
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

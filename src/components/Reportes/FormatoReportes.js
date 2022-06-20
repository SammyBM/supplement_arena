import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField } from '@mui/material';
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
        });
        handleClose();
    }
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

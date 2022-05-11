import * as React from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, FormHelperText, FormGroup } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import * as PlaceholderValues from "./PlaceholderValues";


const listaEtiquetas = PlaceholderValues.getEtiquetas();

const listaTiposSuplementos = PlaceholderValues.getTiposSuplementos();

const listaIngredientes = PlaceholderValues.getIngredientes();

const aminoacidos = PlaceholderValues.getAminos();

const listaOmegas = PlaceholderValues.getOmegas();

const acidosGrasos = PlaceholderValues.getAcidosGrasos();

const descripcionActividad = "Herramienta para la creación y edicion de nuevos articulos de suplementos."


//coso para merge

export default function EditorArticulos(props) {



    const [ingredientes, setIngredientes] = React.useState([
        listaIngredientes[0].nombre
    ]);
    const [ingActivo, setIngActivo] = React.useState(null);
    const [tipoSuplemento, setTipoSuplemento] = React.useState(listaTiposSuplementos[0].id);
    const [omegas, setOmegas] = React.useState([]);


    const handleOmegas = (event, newOmegas) => {
        setOmegas(newOmegas);
        console.log(omegas);
    };

    const handleTipoSup = (event) => {
        setTipoSuplemento(event.target.value);
    };



    const filter = createFilterOptions();

    const radiosTipoSuplemento = listaTiposSuplementos.map((item) => <FormControlLabel value={item.id} control={<Radio />} label={item.tipo} />);

    const Input = styled('input')({
        display: 'none',
    });

    /*  const botonImagen = document.getElementById("btn-subir-imagen");
     const imagenSuplemento = document.getElementById("imagenSuplemento");
     botonImagen.addEventListener("submit", e => {
         e.preventDefault();
         const endpoint = "../upload.php";
         const formData = new FormData();
 
         formData.append("imagenSuplemento", imagenSuplemento.files[0]);
 
         fetch(endpoint, {
             method: "post",
             body: formData
         }).catch(console.error);
     }); */

    export default function EditorArticulos() {
        return (
            <h1>Editor</h1>
        );
    }
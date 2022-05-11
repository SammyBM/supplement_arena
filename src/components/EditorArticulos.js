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


    return (
        <Grid container direction="column" spacing={2}  >
            <Grid item>
                <Card>
                    <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                        <CardContent>
                            <Typography variant="h3" noWrap component="div" fontFamily="Lexend Deca">
                                Editor de articulos
                            </Typography>
                            <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                        </CardContent>
                    </Paper>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={12} md={6}>
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <FormControl sx={{ width: '25ch' }}>
                                <TextField label="Titulo" color='primary' variant='standard' required />
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }}>
                                <Autocomplete
                                    multiple
                                    id="etiquetas"
                                    options={listaEtiquetas}
                                    getOptionLabel={(option) => option.etiqueta}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Etiquetas"
                                            variant='standard'
                                            size='small'
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel id="tipo-suplemento"><Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Tipo de suplemento</Typography></FormLabel>
                                <RadioGroup
                                    value={tipoSuplemento}
                                    name="radio-buttons-group"
                                    onChange={handleTipoSup}
                                >
                                    {radiosTipoSuplemento}
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }}>
                                <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                                <Autocomplete
                                    value={ingredientes}
                                    onChange={(event, newValue) => {
                                        setIngredientes(newValue);
                                    }}
                                    multiple
                                    id="ingredientes"
                                    options={listaIngredientes.map((option) => option.nombre)}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Ingredientes"
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '25ch' }}>
                                <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Ingrediente activo</Typography>
                                <Autocomplete
                                    value={ingActivo}
                                    onChange={(event, newIngActivo) => {
                                        if (typeof newIngActivo === 'string') {
                                            setIngActivo({
                                                nombre: newIngActivo,
                                            });
                                        } else if (newIngActivo && newIngActivo.inputValue) {
                                            // Create a new value from the user input
                                            setIngActivo({
                                                nombre: newIngActivo.inputValue,
                                            });
                                        } else {
                                            setIngActivo(newIngActivo);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.nombre);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                title: `Agregar "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="ingrediente-activo"
                                    options={listaIngredientes}
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        // Regular option
                                        return option.nombre;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.nombre}</li>}
                                    sx={{ width: 300 }}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField {...params} label="Ingrediente Activo" />
                                    )}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <Container fixed>
                                <Box sx={{ bgcolor: '#cfe8fc', maxMeight: '500px', maxWidth: "500px" }}>

                                </Box>
                                <label htmlFor="btn-subir-imagen">
                                    <Input accept="image/*" id="btn-subir-imagen" name="imagenSuplemento" type="file" />
                                    <Button variant="contained" component="span" endIcon={<AddPhotoAlternateIcon />}>
                                        Subir imagen
                                    </Button>
                                </label>
                            </Container>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Divider variant="fullWidth" />
                <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Caracteristicas nutrimentales</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="calorias" label="Calorias" type="number" helperText="Por porción" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="proteina" label="Proteina" type="number" helperText="Por porción" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="lipidos" label="Lipidos" type="number" helperText="Por porción" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="carbohidratos" label="Carbohidratos" type="number" helperText="Por porción" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="tamano" label="Tamaño" type="number" helperText="de una porción" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="cantidad" label="Cantidad" type="number" helperText="Numero de porciones" required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField id="precio" label="Precio" type="number" helperText="Por empaque" required />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <InterfazVariable tipoSuplemento={tipoSuplemento} omegasValue={omegas} omegasFunction={handleOmegas} />
            </Grid>
            <Grid item>
                <Divider variant='fullWidth' />
                <br />
                <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                    <Button variant='contained' color="warning" startIcon={<DeleteForeverIcon />}>Eliminar</Button>
                    <Button variant='contained' endIcon={<SaveIcon />}>Guardar</Button>
                </Stack>
            </Grid>

        </Grid>
    );

}

function InterfazVariable(props) {

    const omegas = props.omegasValue;
    const handleOmegas = (event, newOmegas) => props.omegasFunction(event, newOmegas);

    const textfieldsAminos = aminoacidos.map((item) => <Grid item xs={12} md={6} lg={3}><TextField id={"aminos-" + item.id} label={item.nombre} type="number" helperText="Por porción" /></Grid>);
    const botonesOmegas = listaOmegas.map((value) => <ToggleButton value={value.tipo} key={value.id}><Chip label={value.numero} color={omegas.includes(value.tipo) ? "primary" : "secondary"} variant={omegas.includes(value.tipo) ? "filled" : "outlined"}></Chip></ToggleButton>);
    const textfieldAcidosGrasos = acidosGrasos.map((item => <TextField id={"acidos-grasos-" + item.id} label={item.nombre} type="number" helperText="Por porción" disabled={omegas.includes(listaOmegas[0].tipo) ? false : true} />))


    switch (props.tipoSuplemento) {
        case listaTiposSuplementos[0].id:
            return (
                <Grid item>
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de aminoacidos</Typography>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {textfieldsAminos}
                    </Grid>
                </Grid>
            );
            break;
        case listaTiposSuplementos[1].id:
            return (
                <Grid item >
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Omegas</Typography>
                    <ToggleButtonGroup value={omegas} onChange={handleOmegas}>
                        {botonesOmegas}
                    </ToggleButtonGroup>
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de acidos grasos</Typography>
                    <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                        {textfieldAcidosGrasos}
                    </Stack>
                </Grid >
            );
            break;
        default:
            return (<></>);
            break;
    }
}
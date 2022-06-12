import * as React from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, FormHelperText, FormGroup } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { ApiContext } from '../../contexts/ApiContext';


import * as PlaceholderValues from "../PlaceholderValues";


const listaEtiquetas = PlaceholderValues.getEtiquetas();

const listaTiposSuplementos = PlaceholderValues.getTiposSuplementos();

const listaIngredientes = PlaceholderValues.getIngredientes();

const descripcionActividad = "Herramienta para la creación y edicion de nuevos articulos de suplementos."


export default function EditorArticulos(props) {
    const api = React.useContext(ApiContext);

    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            titulo: "",
            etiquetas: "",
            tipoSuplemento: "",
            ingredientes: "",
            ingActivo: "",
            imagen: "",
            calorias: "",
            proteina: "",
            lipidos: "",
            carbohidratos: "",
            tamano: "",
            precio: "",
            perfilAminos: "",
            perfilAG: "",
            perfilOmegas: ""
        }
    });

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
        <form>
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
                                    <Controller name="titulo" control={control} render={({ field: { onChange, value } }) => (
                                        <TextField label="Titulo" color='primary' variant='standard' required />
                                    )}
                                        rules={{
                                            required: "El campo titulo es obligatorio."
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: '25ch' }}>
                                    <Controller name="etiquetas" control={control} render={({ field: { onChange, value } }) => (
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
                                    )}
                                        rules={{}}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel id="tipo-suplemento"><Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Tipo de suplemento</Typography></FormLabel>
                                    <Controller name="tipoSuplemento" control={control} render={({ field: { onChange, value } }) => (
                                        <RadioGroup
                                            value={tipoSuplemento}
                                            name="radio-buttons-group"
                                            onChange={handleTipoSup}
                                        >
                                            {radiosTipoSuplemento}
                                        </RadioGroup>
                                    )}
                                        rules={{}}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: '25ch' }}>
                                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                                    <Controller name="ingredientes" control={control} render={({ field: { onChange, value } }) => (
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
                                    )}
                                        rules={{}}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: '25ch' }}>
                                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Ingrediente activo</Typography>
                                    <Controller name="ingActivo" control={control} render={({ field: { onChange, value } }) => (
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
                                    )}
                                        rules={{}}
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <Container fixed>
                                    <Box sx={{ bgcolor: '#cfe8fc', maxHeight: '500px', maxWidth: "500px" }}>
                                        <img />
                                    </Box>
                                    <label htmlFor="btn-subir-imagen">
                                        <Controller name="imagenSuplemento" control={control} render={({ field: { onChange, value } }) => (
                                            <Input accept="image/*" id="btn-subir-imagen" onChange={onChange} value={value} name="imagenSuplemento" type="file" />
                                        )}
                                            rules={{

                                            }}
                                        />
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
                            <Controller name="calorias" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="calorias" label="Calorias" type="number" helperText="Por porción" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="proteina" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="proteina" label="Proteina" type="number" helperText="Por porción" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="lipidos" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="lipidos" label="Lipidos" type="number" helperText="Por porción" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="carbohidratos" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="carbohidratos" label="Carbohidratos" type="number" helperText="Por porción" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="tamano" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="tamano" label="Tamaño" type="number" helperText="de una porción" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="cantidad" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="cantidad" label="Cantidad" type="number" helperText="Numero de porciones" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="precio" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="precio" label="Precio" type="number" helperText="Por empaque" required />
                            )}
                                rules={{}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <InterfazVariable tipoSuplemento={watch(tipoSuplemento)} control={control} watch={watch} />
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
        </form>
    );

}

function InterfazVariable(props) {

    const control = props.control;
    const watch = props.watch;

    let textfieldsAminos;
    let botonesOmegas;
    let textfieldAcidosGrasos;
    const aminoacidos = [];
    const omega = [];
    const acidosGrasos = [];


    switch (props.tipoSuplemento) {
        case 1:

            React.useEffect(() => {
                axios.get(api.concat('aminoacidos/read.php')).then((response) => {
                    aminoacidos = response.data.records;
                }).catch((error) => {
                    console.error(error);
                    aminoacidos = null;
                }).finally(() => {
                    if (aminoacidos !== null)
                        textfieldsAminos = aminoacidos.map((item) => <Grid item xs={12} md={6} lg={3}><Controller name={"aminos-" + item.id} control={control} render={({ field: { onChange, value } }) => (<TextField id={"aminos-" + item.id} label={item.nombre} type="number" helperText="Por porción" onChange={onChange} value={value} />)} rules={{}} /></Grid>);
                    else
                        textfieldsAminos = <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los aminoacidos, intente más tarde.</Typography></Grid>;
                })
            }, []);

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
        case 2:

            React.useEffect(() => {
                axios.get(api.concat('omegas/read.php')).then((response) => {
                    omega = response.data.records;
                }).catch((error) => {
                    console.error(error);
                    omega = null;
                }).finally(() => {
                    if (omega !== null)
                        botonesOmegas = omega.map((value) => <ToggleButton value={value.nombre} key={value.id}><Chip label={value.nombre.charAt(value.nombre.length - 1)} color={watch(omegas) ? "primary" : "secondary"} variant={omegas.includes(value.nombre) ? "filled" : "outlined"}></Chip></ToggleButton>);
                    else
                        botonesOmegas = <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los omegas, intente más tarde.</Typography></Grid>;
                });

                axios.get(api.concat('acidos_grasos/read.php')).then((response) => {
                    acidosGrasos = response.data.records;
                }).catch((error) => {
                    console.error(error);
                    acidosGrasos = null;
                }).finally(() => {
                    if (acidosGrasos !== null)
                        textfieldAcidosGrasos = acidosGrasos.map((item) => <Controller name={"aminos-" + item.id} control={control} render={({ field: { onChange, value } }) => (<TextField id={"acidos-grasos-" + item.id} label={item.nombre} type="number" helperText="Por porción" onChange={onChange} value={value} disabled={watch(omegas) === "Omega3" ? false : true} />)} rules={{}} />);
                    else
                        textfieldAcidosGrasos = <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los acidos grasos, intente más tarde.</Typography></Grid>;

                })

            }, []);

            return (
                <Grid item >
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Omegas</Typography>
                    <Controller name="omegas" control={control} render={({ field: { onChange, value } }) => (
                        <ToggleButtonGroup value={value} onChange={onChange}>
                            {botonesOmegas}
                        </ToggleButtonGroup>
                    )}
                        rules={{}}
                    />
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
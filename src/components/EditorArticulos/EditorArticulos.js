import * as React from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, FormHelperText, FormGroup } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';
import ApiContext from '../../contexts/ApiContext';


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
            tipoSuplemento: 3,
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

    const switchTipo = watch("tipoSuplemento", 1);

    const filter = createFilterOptions();

    const radiosTipoSuplemento = listaTiposSuplementos.map((item) => <FormControlLabel value={item.id} control={<Radio />} label={item.tipo} />);

    const Input = styled('input')({
        display: 'none',
    });

    const onSubmit = (data) => {
        alert("submit");
        console.log(data);
    }

    const handleDelete = (data) => {
        alert('deleting');
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <TextField key="titulo" label="Titulo" onChange={onChange} value={value} color='primary' variant='standard' />
                                    )}
                                        rules={{
                                            required: "El campo titulo es obligatorio."
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: '25ch' }}>
                                    <Controller name="etiquetas" control={control} onChange={([, data]) => data} render={({ field: { onChange } }) => (
                                        <Autocomplete
                                            multiple
                                            onChange={(event, newValue) => {
                                                onChange(newValue);
                                            }} options={listaEtiquetas}
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
                                <FormControl component={"fieldset"}>
                                    <FormLabel id="tipo-suplemento"><Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Tipo de suplemento</Typography></FormLabel>
                                    <Controller name="tipoSuplemento" control={control} render={({ field: { onChange, value } }) => (
                                        <RadioGroup
                                            value={value}
                                            onChange={onChange}
                                            defaultValue={1}
                                        >
                                            {radiosTipoSuplemento}
                                        </RadioGroup>
                                    )}
                                        rules={{
                                            required: true
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ width: '25ch' }}>
                                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                                    <Controller name="ingredientes" control={control} onChange={([, data]) => data} render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            value={value}
                                            onChange={(event, newValue) => {
                                                onChange(newValue);
                                            }}
                                            multiple
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
                                            value={value}
                                            onChange={(event, newIngActivo) => {
                                                if (typeof newIngActivo === 'string') {
                                                    onChange({
                                                        nombre: newIngActivo,
                                                    });
                                                } else if (newIngActivo && newIngActivo.inputValue) {
                                                    // Create a new value from the user input
                                                    onChange({
                                                        nombre: newIngActivo.inputValue,
                                                    });
                                                } else {
                                                    onChange(newIngActivo);
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
                                <TextField id="calorias" label="Calorias" type="number" onChange={onChange} value={value} helperText="Por porción" />
                            )}
                                rules={{
                                    required: "El campo calorias es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="proteina" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="proteina" label="Proteina" type="number" onChange={onChange} value={value} helperText="Por porción" />
                            )}
                                rules={{
                                    required: "El campo proteina es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="lipidos" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="lipidos" label="Lipidos" type="number" onChange={onChange} value={value} helperText="Por porción" />
                            )}
                                rules={{
                                    required: "El campo carbohidratos es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="carbohidratos" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="carbohidratos" label="Carbohidratos" type="number" onChange={onChange} value={value} helperText="Por porción" />
                            )}
                                rules={{
                                    required: "El campo carbohidratos es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="tamano" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="tamano" label="Tamaño" type="number" onChange={onChange} value={value} helperText="de una porción" />
                            )}
                                rules={{
                                    required: "El campo tamaño de porción es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="cantidad" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="cantidad" label="Cantidad" type="number" onChange={onChange} value={value} helperText="Numero de porciones" />
                            )}
                                rules={{
                                    required: "El campo cantidad de porciones es obligatorio"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Controller name="precio" control={control} render={({ field: { onChange, value } }) => (
                                <TextField id="precio" label="Precio" type="number" onChange={onChange} value={value} helperText="Por empaque" />
                            )}
                                rules={{
                                    required: "El campo precio es obligatorio"
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <InterfazVariable api={api} tipoSuplemento={switchTipo} control={control} watch={watch} />
                </Grid>
                <Grid item>
                    <Divider variant='fullWidth' />
                    <br />
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                        <Button variant='contained' onClick={handleDelete} color="warning" startIcon={<DeleteForeverIcon />}>Eliminar</Button>
                        <Button type="submit" variant='contained' endIcon={<SaveIcon />}>Guardar</Button>
                    </Stack>
                </Grid>

            </Grid>
        </form>
    );

}

function InterfazVariable(props) {


    const { api, control, tipoSuplemento, watch } = props;

    const watchOmegas = watch("omegas");

    const [data, setData] = React.useState({
        aminoacidos: [],
        omegas: [],
        acidosGrasos: []
    });


    let amino, omega, acido;

    React.useEffect(() => {

        axios.get(api.concat('aminoacidos/read.php')).then((response) => {
            amino = response.data.records;
            console.log(amino);
        }).catch((error) => {
            console.error(error);
            amino = null;
        });

        axios.get(api.concat('omegas/read.php')).then((response) => {
            omega = response.data.records;
            console.log(omega);
        }).catch((error) => {
            console.error(error);
            omega = null;
        });

        axios.get(api.concat('acidos_grasos/read.php')).then((response) => {
            acido = response.data.records;
        }).catch((error) => {
            console.error(error);
            acido = null;
        });

        setData({
            aminoacidos: amino,
            omegas: omega,
            acidosGrasos: acido
        });

        console.log(data);

    }, []);

    switch (tipoSuplemento) {

        case '1':
            return (
                <Grid item>
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de aminoacidos</Typography>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {console.log(data)}
                        {
                            (data.aminoacidos !== undefined && data.aminoacidos !== null) ?
                                data.aminoacidos.map((item) => <Grid item xs={12} md={6} lg={3}><Controller name={"aminos-" + item.aminoID} control={control} render={({ field: { onChange, value } }) => (<TextField id={"aminos-" + item.aminoID} label={item.nombre} type="number" helperText="Por porción" onChange={onChange} value={value} />)} rules={{}} /></Grid>)
                                :
                                <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los aminoacidos, intente más tarde.</Typography></Grid>
                        }
                    </Grid>
                </Grid>
            );
            break;
        case '2':
            return (
                <Grid item >
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Omegas</Typography>
                    <Controller name="omegas" control={control} render={({ field: { onChange, value } }) => (
                        <ToggleButtonGroup value={value} onChange={onChange}>
                            {
                                (data.omegas !== undefined && data.omegas !== null) ?
                                    data.omegas.map((value) => <ToggleButton value={value.nombre} key={value.omegaID}><Chip label={value.nombre.charAt(value.nombre.length - 1)} color={watchOmegas.includes(value.nombre) ? "primary" : "secondary"} variant={watchOmegas.includes(value.nombre) ? "filled" : "outlined"}></Chip></ToggleButton>)
                                    :
                                    <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los omegas, intente más tarde.</Typography></Grid>
                            }
                        </ToggleButtonGroup>
                    )}
                        rules={{}}
                    />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de acidos grasos</Typography>
                    <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                        {
                            (data.acidosGrasos !== undefined && data.acidosGrasos !== null) ?
                                data.acidosGrasos.map((item) => <Controller name={"aminos-" + item.id} control={control} render={({ field: { onChange, value } }) => (<TextField id={"acidos-grasos-" + item.acidoGrasoID} label={item.nombre} type="number" helperText="Por porción" onChange={onChange} value={value} disabled={watchOmegas.includes("Omega3") ? false : true} />)} rules={{}} />)
                                :
                                <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los acidos grasos, intente más tarde.</Typography></Grid>
                        }
                    </Stack>
                </Grid >
            );
            break;
        default:
            return (<></>);
            break;
    }
}
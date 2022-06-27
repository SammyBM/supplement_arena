import * as React from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, FormHelperText, FormGroup, Skeleton } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';
import ApiContext from '../../contexts/ApiContext';


import * as PlaceholderValues from "../PlaceholderValues";
import Service from '../../Service';


const listaEtiquetas = PlaceholderValues.getEtiquetas();

const listaTiposSuplementos = PlaceholderValues.getTiposSuplementos();

const listaIngredientes = [];

const descripcionActividad = "Herramienta para la creación y edicion de nuevos articulos de suplementos."


export default function EditorArticulos(props) {
    const api = React.useContext(ApiContext);

    const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
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
            precio: ""
        }
    });

    const switchTipo = watch("tipoSuplemento");

    const filter = createFilterOptions();

    const radiosTipoSuplemento = listaTiposSuplementos.map((item) => <FormControlLabel value={item.id} key={"radio-" + item.id} control={<Radio />} label={item.tipo} />);

    const Input = styled('input')({
        display: 'none',
    });

    const onSubmit = (data) => {
        alert("submit");
        console.log(data);
        let dataAminos = [
            data.amino1,
            data.amino2,
            data.amino3,
            data.amino4,
            data.amino5,
            data.amino6,
            data.amino7,
            data.amino8,
            data.amino9,
            data.amino10,
            data.amino11,
            data.amino12,
            data.amino13,
            data.amino14,
            data.amino15,
            data.amino16,
            data.amino17,
            data.amino18,
            data.amino19,
            data.amino20,
            data.amino21
        ]
        let articulo = {
            titulo: data.titulo,
            etiquetas: data.etiquetas,
            tipoSuplemento: data.tipoSuplemento,
            ingredientes: data.ingredientes,
            ingActivo: data.ingAct,
            imagen: data.imagen,
            calorias: data.calorias,
            proteina: data.proteina,
            lipidos: data.lipidos,
            carbohidratos: data.carbohidratos,
            tamano: data.tamano,
            precio: data.precio
        }
        const articuloID=null;
        try{
            articuloID = JSON.parse(sessionStorage.getItem("articuloID"))
        }catch(e){
            console.log(e)
        }
        if (articuloID == null)
            createArticulo(data, articulo, dataAminos);
        else
            updateArticulo(data, articulo, articuloID, dataAminos);

        /* Service.changePage("visualizador"); */
    }

    const createArticulo = (data, articulo, dataAminos) => {
        let perfilAminos = [];
        let perfilOmegas = [];

        let ID;
        Service.postData("articulos/create", articulo).then((result) => {
            ID=result;
        });
        console.log(ID);
        //get ID por atributos
        

        for (let i = 0; i < 20; i++) {
            perfilAminos.push({ articuloID: ID, aminoID: i + 1, cantidad: dataAminos[i] })
        }
        data.omegas.forEach((item) => perfilOmegas.push({ articuloID: ID, omegaID: item }));
        let perfilAG = [
            { articuloID: ID, acidosGrasoID: 1, cantidad: data.DHA },
            { articuloID: ID, acidosGrasoID: 2, cantidad: data.EPA }
        ];

        Service.postData("perfiles_aminos/create", perfilAminos);
        Service.postData("perfiles_omegas/create", perfilOmegas);
        Service.postData("perfiles_acidos_grasos/create", perfilAG);

        sessionStorage.setItem("articuloID", ID);
    }

    const updateArticulo = (data, articulo, articuloID, dataAminos) => {
        let perfilAminos = [];
        let perfilOmegas = [];
        for (let i = 0; i < 20; i++) {
            perfilAminos.push({ articuloID: articuloID, aminoID: i + 1, cantidad: dataAminos[i] })
        }
        data.omegas.forEach((item) => perfilOmegas.push({ articuloID: articuloID, omegaID: item }));
        let perfilAG = [
            { articuloID: articuloID, acidosGrasoID: 1, cantidad: data.DHA },
            { articuloID: articuloID, acidosGrasoID: 2, cantidad: data.EPA }
        ];

        Service.postData("articulos/update", articulo);
        axios.get(api.concat("perfiles_aminoacidos/delete"), articuloID).catch((error) => console.error(error));
        Service.postData("perfiles_aminoacidos/create", perfilAminos);
        axios.get(api.concat("perfiles_omegas/delete"), articuloID).catch((error) => console.error(error));
        Service.postData("perfiles_omegas/create", perfilOmegas);
        axios.get(api.concat("perfiles_acidos_grasos/delete"), articuloID).catch((error) => console.error(error));
        Service.postData("perfiles_acidos_grasos/create", perfilAG);
    }

    const handleDelete = () => {
        const articuloID = JSON.parse(sessionStorage.getItem("articuloID"));
        if (articuloID == null)
            alert("No es posible eliminar el articulo en estos momentos");
        else {
            axios.get(api.concat("perfiles_aminoacidos/delete.php"), articuloID).catch((error) => console.error(error));
            axios.get(api.concat("perfiles_omegas/delete.php"), articuloID).catch((error) => console.error(error));
            axios.get(api.concat("perfiles_acidos_grasos/delete.php"), articuloID).catch((error) => console.error(error));
            axios.get(api.concat("articulos/delete.php"), articuloID).catch((error) => console.error(error)).finally(() => {
                alert("Articulo eliminado exitosamente");
                sessionStorage.removeItem("articuloID");
                Service.changePage("");
            });
        }
    }

    React.useEffect(() => {
        axios.get(api.concat('ingredientes/read.php')).then((response) => {
            response.data.records.forEach((record) => {
                listaIngredientes.push(record);
            })
        }).catch((err) => console.error(err));

    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" spacing={2}  >
                <Grid item>
                    <Card>
                        <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                            <CardContent>
                                <Typography variant="h3" component="div" fontFamily="Lexend Deca">
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
                                        rules={{
                                            required: "Ingrese al menos una etiqueta"
                                        }}
                                    />
                                </FormControl>
                                <FormControl component={"fieldset"}>
                                    <FormLabel id="tipo-suplemento"><Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Tipo de suplemento</Typography></FormLabel>
                                    <Controller name="tipoSuplemento" control={control} render={({ field: { onChange, value } }) => (
                                        <RadioGroup
                                            value={value}
                                            onChange={onChange}
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
                                    <Controller name="ingredientes" control={control} onChange={([, data]) => data} render={({ field: { onChange } }) => (
                                        <Autocomplete
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
                    <InterfazVariable api={api} tipoSuplemento={switchTipo} control={control} watch={watch} setValue={setValue} />
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

    const amino = [];
    const omega = [];
    const acido = [];

    const { api, control, tipoSuplemento, watch, setValue } = props;

    const [loading, setLoading] = React.useState(true);

    const [omegas, setOmegas] = React.useState([]);

    const handleOmegas = (e, newOmegas) => {
        setOmegas(newOmegas);
        setValue("omegas", newOmegas);
    }



    React.useEffect(() => {

        setTimeout(async () => {
            await axios.get(api.concat('aminoacidos/read.php')).then((response) => {
                response.data.records.forEach(record => amino.push(record));
                console.log(amino);
            }).catch((error) => {
                console.error(error);
                amino = null;
            });

            await axios.get(api.concat('omegas/read.php')).then((response) => {
                response.data.records.forEach(record => omega.push(record));
                console.log(omega);
            }).catch((error) => {
                console.error(error);
                omega = null;
            });

            await axios.get(api.concat('acidos_grasos/read.php')).then((response) => {
                response.data.records.forEach(record => acido.push(record));
            }).catch((error) => {
                console.error(error);
                acido = null;
            });

            setLoading(false);
            console.log("coso");
        }, 1500)

    }, []);

    switch (tipoSuplemento) {

        case '1':
            return (
                <Grid item>
                    <Divider variant="fullWidth" />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de aminoacidos</Typography>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {
                            loading ?
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((n) => <Grid item xs={12} md={6}><Skeleton key={n} sx={{ bgcolor: 'grey.400' }} width={150}><Typography>.</Typography></Skeleton></Grid>)
                                :
                                ((amino !== undefined && amino !== null && amino.length > 0) ?
                                    amino.map((item) => <Grid item xs={12} md={6} lg={3}><Controller name={"aminos" + item.aminoID} control={control} render={({ field: { onChange, value } }) => (<TextField key={"aminos-" + item.aminoID} label={item.nombre} type="number" helperText="Por porción" onChange={onChange} value={value} />)} rules={{}} /></Grid>)
                                    :
                                    <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los aminoacidos, intente más tarde.</Typography></Grid>)
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
                    <Controller name="omegas" control={control} defaultValue={[""]} render={() => (
                        <ToggleButtonGroup value={omegas} onChange={(e, newOmegas) => {
                            handleOmegas(e, newOmegas)
                        }}>
                            {
                                loading ?
                                    [1, 2, 3].map((n) => <Grid item xs={12} md={6}><Skeleton sx={{ bgcolor: 'grey.400' }} variant="rectangular" width={150} height={50} /></Grid>)
                                    :
                                    ((omega !== undefined && omega !== null && omega.length > 0) ?
                                        omega.map((item) => <ToggleButton value={item.omegaID} key={item.nombre}><Chip label={item.nombre.charAt(item.nombre.length - 1)} color={omegas.includes(item.omegaID) ? "primary" : "secondary"} variant={omegas.includes(item.omegaID) ? "filled" : "outlined"}></Chip></ToggleButton>)
                                        :
                                        <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los omegas, intente más tarde.</Typography></Grid>)
                            }
                        </ToggleButtonGroup>
                    )}
                        rules={{}}
                    />
                    <Typography variant='h5' component="div" fontFamily="Lexend Deca" color="primary">Perfil de acidos grasos</Typography>
                    <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                        {
                            (acido !== undefined && acido !== null && acido.length > 0) ?
                                acido.map((item) => <Controller name={item.nombre} control={control} render={({ field: { onChange, value } }) => (<TextField label={item.nombre} type="number" helperText="Por porción" onChange={onChange} disabled={omegas.includes(1) ? false : true} />)} rules={{}} />)
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
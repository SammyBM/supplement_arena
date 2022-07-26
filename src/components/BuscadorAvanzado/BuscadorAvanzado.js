import * as React from 'react';
import { Box, Card, CardContent, Checkbox, Divider, FormGroup, FormControlLabel, Grid, Paper, Slider, Stack, Switch, Typography, Tab, FormLabel, Tooltip, ToggleButtonGroup, ToggleButton, Button, Badge, Chip, Skeleton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

import SelectorPredictivo from './SelectorPredictivo';
import ApiContext from '../../contexts/ApiContext';
import { busquedaPerfiles } from '../../MetodosBusqueda';
import Service from '../../Service';

import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';

const descripcionActividad = "Esta herramienta te permite buscar suplementos a tráves de sus caracteristicas en lugar de por su nombre." + '\n' + "Esto resulta especialmente util para usuarios más expermentados o personas que tengan un conocimiento previo en temas de nutriologia o bioquimica."


const tiposSuplemento = [
    { id: '3', tipo: "sustancia especifica" },
    { id: '2', tipo: "omegas" },
    { id: '1', tipo: "proteína" }
];

const listaCertificaciones = [
    { id: 1, nombre: "Labdoor" },
    { id: 2, nombre: "FDA" },
    { id: 3, nombre: "COFEPRIS" }
];

const listaAlergenos = [];

const listaIngredientes = [];

const listaAminoacidos = [];

const listaOmegas = [];

const listaAcidosGrasos = [];

function CamposComunes(props) {

    const { control, watch } = props;

    const cals = watch("calorias");

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAlergeno = (ing) => {
            return ing.alergeno
        }

        setTimeout(async () => {
            await Service.getData("/ingredientes/read").then((res) => {
                res.records.forEach((record) => listaIngredientes.push(record))
                listaIngredientes.filter(checkAlergeno).forEach((record) => listaAlergenos.push(record));
            }).catch((err) => console.error(err));
            await Service.getData("/aminoacidos/read").then((res) => {
                res.records.forEach((record) => listaAminoacidos.push(record))
            }).catch((err) => console.error(err));
            await Service.getData("/omegas/read").then((res) => {
                res.records.forEach((record) => listaOmegas.push(record))
            }).catch((err) => console.error(err));
            await Service.getData("/acidos_grasos/read").then((res) => {
                res.records.forEach((record) => listaAcidosGrasos.push(record))
            }).catch((err) => console.error(err));
            setLoading(false);
        }, 1500);


    }, []);

    const checkboxCertificaciones = listaCertificaciones.map((item) => <FormControlLabel key={item.id} control={<Checkbox />} label={item.nombre}></FormControlLabel>);

    return (
        <>
            {/*Sliders*/}
            <Grid container direction="row" spacing={3} >
                <Grid item xs={0} md={3} lg={1}>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Tamaño de porción</Typography>
                    <Controller name='tamano' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="tamano" value={value} onChange={onChange} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Cantidad de porciones</Typography>
                    <Controller name='cantidad' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="cantidad" value={value} onChange={onChange} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Precio máximo</Typography>
                    <Controller name='precios' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="precios" value={value} onChange={(e, value) => onChange(value)} max={3000} step={10} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={0} lg={1}>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={3} >
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Calorias por porcion</Typography>
                    <Controller name='calorias' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="calorias" value={value} onChange={onChange} min={0} max={200} step={20} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de proteina</Typography>
                    <Controller name='proteina' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="proteina" value={value} onChange={onChange} min={0} max={Math.trunc((cals) / 4)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de lipidos</Typography>
                    <Controller name='lipidos' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="lipidos" value={value} onChange={onChange} min={0} max={Math.trunc((cals) / 9)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de carbohidratos</Typography>
                    <Controller name='carbohidratos' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="carbos" value={value} onChange={onChange} min={0} max={Math.trunc((cals) / 4)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
            </Grid>
            <Divider variant="middle" />

            {/*Checkboxes*/}
            <Grid container spacing={1} direction="row" justifyContent="space-around">
                <Grid item xs={12} md={6}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Alergenos</Typography>
                        <Box>
                            <Controller name='alergenos' control={control} render={({ field: { onChange, value } }) => (
                                <FormGroup
                                    value={value}
                                    onChange={onChange}
                                >
                                    <Grid container spacing={1} direction="row">
                                        {
                                            loading ?
                                                [1, 2, 3, 4, 5, 6].map((n) => <Grid item xs={12} md={6}><Skeleton key={n} sx={{ bgcolor: 'grey.400' }} width={150}><Typography>.</Typography></Skeleton></Grid>)
                                                :
                                                listaAlergenos.map((item) => <Grid item xs={12} md={6}><FormControlLabel key={item.ingredienteID} control={<Checkbox />} label={item.nombre}></FormControlLabel></Grid>)}
                                    </Grid>
                                </FormGroup>
                            )}
                            />
                        </Box>
                    </Stack>
                </Grid>
                <Divider orientation='vertical' variant='middle' />
                {/* <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Certificaciones</Typography>
                        <Box>
                            <Controller name='certificaciones' control={control} render={({ field: { onChange, value } }) => (
                                <FormGroup
                                    value={value}
                                    onChange={onChange}
                                >
                                    {
                                        loading ?
                                            [1, 2, 3, 4, 5, 6].map((n) => <Grid item xs={12} md={6}><Skeleton key={n} sx={{ bgcolor: 'grey.400' }} width={150}><Typography>.</Typography></Skeleton></Grid>)
                                            :
                                            checkboxCertificaciones}
                                </FormGroup>
                            )}
                            />
                        </Box>
                    </Stack>
                </Grid> */}
                <Divider orientation='vertical' variant='middle' />
                <Grid item xs={12} md={6}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                        <Controller name='ingredientes' control={control} render={({ field: { onChange, value } }) => (
                            <FormGroup
                                value={value}
                                onChange={onChange}
                            >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                                    {
                                        loading ?
                                            [1, 2, 3, 4, 5, 6].map((n) => <Grid item xs={12} md={6}><Skeleton key={n} sx={{ bgcolor: 'grey.400' }} width={150}><Typography>.</Typography></Skeleton></Grid>)
                                            :
                                            listaIngredientes.map((value) => <Grid item xs={12} md={6}><FormControlLabel key={value.ingredienteID} control={<Checkbox />} label={value.nombre}></FormControlLabel></Grid>)}
                                </Grid>
                            </FormGroup>
                        )}
                        />
                    </Stack>
                </Grid>
                <Divider orientation='vertical' variant='middle' />
                {/*  <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Presentación</Typography>
                        <Box>
                            <FormGroup>
                                {checkboxCertificaciones}
                            </FormGroup>
                        </Box>
                    </Stack>
                </Grid>*/}
            </Grid>
            <Divider variant="midddle" />
        </>
    )
}

function InterfazBusqueda(props) {

    const { control, id, setValue } = props;

    /* const [protein, setProtein] = React.useState(
        {
            isVegetal: false,
            1: 2,
        }
    ); */

    const [omegas, setOmegas] = React.useState([""]);

    const handleOmegas = (event, newOmegas) => {
        setOmegas(newOmegas);
        setValue("omegas", newOmegas);
    };

    switch (id) {
        case '1':
            return (
                <>
                    {/* <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Origen</Typography>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Tooltip title="Animal">
                                <EggAltTwoToneIcon />
                            </Tooltip>
                            <Switch checked={checked} onChange={handleChange} />
                            <Tooltip title="Vegetal">
                                <LocalFloristTwoToneIcon />
                            </Tooltip>
                        </Stack> 
                    </Stack>*/}
                    <Divider variant="middle" />
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Perfil de aminoacidos</Typography>
                    <Grid container orientation="row" rowSpacing={2} columnSpacing={5}>
                        {
                            (listaAminoacidos !== undefined && listaAminoacidos !== null && listaAminoacidos.length > 0) ?
                                listaAminoacidos.map((item) =>
                                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                                        <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{item.nombre}</Typography>
                                        <Controller key={"amino" + item.aminoID} name={"amino" + item.aminoID} control={control} defaultValue={0} render={({ field: { onChange, value } }) => (
                                            <Slider value={value} onChange={onChange} min={0} max={25} valueLabelDisplay="auto" />
                                        )}
                                        />
                                    </Grid>
                                )
                                :
                                <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los aminoacidos, intente más tarde.</Typography></Grid>
                        }
                    </Grid>
                </>
            );
            break;
        case '2':
            return (
                <>
                    <Divider variant="middle" />
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        {
                            (listaOmegas !== undefined && listaOmegas !== null && listaOmegas.length > 0) ?
                                <>
                                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Tipos de omegas</Typography>
                                    <Controller name="omegas" control={control} render={() => (
                                        <ToggleButtonGroup value={omegas} onChange={(e, newOmegas) => {
                                            handleOmegas(e, newOmegas)
                                        }}>
                                            {
                                                listaOmegas.map((item) => <ToggleButton value={item.omegaID} key={item.nombre}><Chip label={item.nombre.charAt(item.nombre.length - 1)} color={omegas.includes(item.omegaID) ? "primary" : "secondary"} variant={omegas.includes(item.omegaID) ? "filled" : "outlined"}></Chip></ToggleButton>)
                                            }
                                        </ToggleButtonGroup>
                                    )}
                                    />
                                </>
                                :
                                <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los omegas, intente más tarde.</Typography></Grid>
                        }
                    </Stack>
                    <Divider variant="middle" />
                    <Typography variant="h5" component="label" fontFamily="Lexend Deca" color="primary">Distribución de acidos grasos</Typography>
                    <Grid container spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
                        {
                            (listaOmegas !== undefined && listaOmegas !== null && listaOmegas.length > 0) ?
                                listaAcidosGrasos.map((item) => <Grid item xs={12} md={6}>
                                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{item.nombre}</Typography>
                                    <Controller name={item.nombre} key={item.nombre} control={control} render={({ field: { onChange, value } }) => (
                                        <Slider key={item.nombre} value={value} onChange={onChange} defaultValue={0} min={0} max={250} step={10} valueLabelDisplay="auto" disabled={omegas.includes(1) ? false : true} />
                                    )}
                                    />
                                </Grid>
                                )
                                :
                                <Grid item xs={12}><Typography variant="h3" color="secondary">Hubo un error cargando los omegas, intente más tarde.</Typography></Grid>
                        }
                    </Grid>
                </>
            );
            break;
        case '3':
            return (
                <>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Ingrdientes activos</Typography>
                        <SelectorPredictivo />
                    </Stack>
                </>
            );
            break;
        default:
            return (<h2>Algo salió mal</h2>);
            break;
    }
}

export default function BuscadorAvanzado() {
    const api = React.useContext(ApiContext);

    const { control, getValues, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            tipoSuplemento: 1,
            ingredientes: [],
            alergenos: [],
            ingActivo: "",
            calorias: 0,
            proteina: 0,
            lipidos: 0,
            carbohidratos: 0,
            tamano: 0,
            cantidad: 0,
            precios: [0, 1000],
            omegas: []
        }
    });

    const [tipoSup, setTipoSup] = React.useState('3');

    const handleChange = (event, newValue) => {
        setTipoSup(newValue);
        setValue("tipoSuplemento", newValue);
    };

    const submit = () => {
        alert("sumit")
        const data = getValues();
        const dataAminos = [
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
        const omegas = data.omegas;
        const acidos = [{ acidoGradsoID: 1, cantidad: data.DHA }, { acidoGradsoID: 2, cantidad: data.EPA }];
        const articulo = {
            categoriaID: data.tipoSuplemento,
            calorias: data.calorias,
            proteina: data.proteina,
            lipidos: data.lipidos,
            carbohidratos: data.carbohidratos
        }
        let resultados;

        switch (data.tipoSuplemento) {
            case 1:
                resultados = busquedaPerfiles(articulo, null, dataAminos);
                break;
            case 2:
                resultados = busquedaPerfiles(articulo, omegas, null, acidos);
                break;
            case 3:
                resultados = busquedaPerfiles(articulo);
                break;
        }

        sessionStorage.setItem('resultados', JSON.stringify(resultados));

    }

    const pestanasSuplementos = tiposSuplemento.map((item) => <Tab key={item.id} value={item.id} label={item.tipo}></Tab>);
    const panelesSuplementos = tiposSuplemento.map((item) => <TabPanel key={item.id} value={item.id}><InterfazBusqueda id={item.id} control={control} setValue={setValue} /></TabPanel>)

    return (
        <form >
            <Card>
                <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                    <CardContent>
                        <Typography variant="h3" component="div" fontFamily="Lexend Deca">
                            Buscador Avanzado
                        </Typography>
                        <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                    </CardContent>
                </Paper>
            </Card>
            <Box spacing={2} sx={{ my: 2 }}>
                <CamposComunes control={control} watch={watch} />
                <TabContext value={tipoSup}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example">
                            {pestanasSuplementos}
                        </TabList>
                    </Box>
                    {panelesSuplementos}
                </TabContext>
                <Divider variant="middle" />
            </Box>
            <Button onClick={submit} variant='contained' endIcon={<SearchIcon />}>Buscar</Button>
        </form>
    );
}
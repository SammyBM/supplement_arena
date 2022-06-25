import * as React from 'react';
import { Box, Card, CardContent, Checkbox, Divider, FormGroup, FormControlLabel, Grid, Paper, Slider, Stack, Switch, Typography, Tab, FormLabel, Tooltip, ToggleButtonGroup, ToggleButton, Button, Badge, Chip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import EggAltTwoToneIcon from '@mui/icons-material/EggAltTwoTone';
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone';
import PhishingTwoToneIcon from '@mui/icons-material/PhishingTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import SelectorPredictivo from './SelectorPredictivo';
import ApiContext from '../../contexts/ApiContext';

import axios from 'axios';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';

const descripcionActividad = "Esta herramienta te permite buscar suplementos a tráves de sus caracteristicas en lugar de por su nombre." + '\n' + "Esto resulta especialmente util para usuarios más expermentados o personas que tengan un conocimiento previo en temas de nutriologia o bioquimica."


const tiposSuplemento = [
    { id: '1', tipo: "proteina" },
    { id: '2', tipo: "omegas" },
    { id: '3', tipo: "sustancia especifica" }
];

const listaAlergenos = [
    { id: 1, nombre: "lactosa" },
    { id: 2, nombre: "caseina" },
    { id: 3, nombre: "nueces" }
];

const listaCertificaciones = [
    { id: 1, nombre: "Labdoor" },
    { id: 2, nombre: "FDA" },
    { id: 3, nombre: "COFEPRIS" }
];

const listaIngredientes = [
    { id: 1, nombre: "Proteina concentrada de suero de leche" },
    { id: 2, nombre: "Proteina aislada de suero de leche" },
    { id: 3, nombre: "Sacarosa" },
    { id: 4, nombre: "Sucralosa" },
    { id: 5, nombre: "Stevia" },
    { id: 6, nombre: "Goma Xanthan" },
    { id: 7, nombre: "Vainillina" }
];

const listaAminoacidos = [
    { id: 1, nombre: "Serina" },
    { id: 2, nombre: "Treonina" },
    { id: 3, nombre: "Glutamina" },
    { id: 4, nombre: "Asparagina" },
    { id: 5, nombre: "Tirosina" },
    { id: 6, nombre: "Cisteina" },
    { id: 7, nombre: "Glicina" },
    { id: 8, nombre: "Alanina" },
    { id: 9, nombre: "Valina" },
    { id: 10, nombre: "Leucina" },
    { id: 11, nombre: "Isoleucina" },
    { id: 12, nombre: "Metionina" },
    { id: 13, nombre: "Prolina" },
    { id: 14, nombre: "Fenilalanina" },
    { id: 15, nombre: "Triptofano" },
    { id: 16, nombre: "Acido Aspartico" },
    { id: 17, nombre: "Acido Glutamico" },
    { id: 18, nombre: "Lisina" },
    { id: 19, nombre: "Arginina" },
    { id: 20, nombre: "Histidia" }
];

const listaOmegas = [
    { id: 1, tipo: "Omega3", numero: 3 },
    { id: 2, tipo: "Omega6", numero: 6 },
    { id: 3, tipo: "Omega9", numero: 9 }
];

const listaAcidosGrasos = [
    { id: 1, nombre: "DHA" },
    { id: 2, nombre: "EPA" }
];

function CamposComunes(props) {

    const { control } = props;

    const [state, setState] = React.useState(
        {
            tamano: 30,
            cantidad: 20,
            precios: [0, 50],
            calorias: 100,
            proteina: 7,
            lipidos: 3,
            carbohidratos: 4
        }
    );

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    };

    const checkboxAlergenos = listaAlergenos.map((item) => <FormControlLabel control={<Checkbox />} label={item.nombre}></FormControlLabel>);
    const checkboxCertificaciones = listaCertificaciones.map((item) => <FormControlLabel control={<Checkbox />} label={item.nombre}></FormControlLabel>);
    const checkboxIngredientes = listaIngredientes.map((value) => <Grid item xs={3} key={value.id}><FormControlLabel control={<Checkbox />} label={value.nombre}></FormControlLabel></Grid>);

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
                        <Slider key="precios" value={value} onChange={onChange} valueLabelDisplay="auto" />
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
                        <Slider key="proteina" value={value} onChange={onChange} min={0} max={Math.trunc((state.calorias) / 4)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de lipidos</Typography>
                    <Controller name='lipidos' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="lipidos" value={value} onChange={onChange} min={0} max={Math.trunc((state.calorias) / 9)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de carbohidratos</Typography>
                    <Controller name='carbohidratos' control={control} render={({ field: { onChange, value } }) => (
                        <Slider key="carbos" value={value} onChange={onChange} min={0} max={Math.trunc((state.calorias) / 4)} valueLabelDisplay="auto" />
                    )}
                        rules={{
                            required: true
                        }}
                    />
                </Grid>
            </Grid>
            <Divider variant="middle" />

            {/*Checkboxes*/}
            <Grid container spacing={2} direction="row" sx={{ mb: 1 }} justifyContent="space-around">
                <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Alergenos</Typography>
                        <Box>
                            <Controller name='alergenos' control={control} render={({ field: { onChange, value } }) => (
                                <FormGroup
                                    value={value}
                                    onChange={onChange}
                                >
                                    {checkboxAlergenos}
                                </FormGroup>
                            )}
                            />
                        </Box>
                    </Stack>
                </Grid>
                <Divider orientation='vertical' variant='middle' />
                <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Certificaciones</Typography>
                        <Box>
                            <Controller name='certificaciones' control={control} render={({ field: { onChange, value } }) => (
                                <FormGroup
                                    value={value}
                                    onChange={onChange}
                                >
                                    {checkboxCertificaciones}
                                </FormGroup>
                            )}
                            />
                        </Box>
                    </Stack>
                </Grid>
                <Divider orientation='vertical' variant='middle' />
                <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                            {checkboxIngredientes}
                        </Grid>
                    </Stack>
                </Grid>
                <Divider orientation='vertical' variant='middle' />
                <Grid item xs={12} md={6} lg={3}>
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Presentación</Typography>
                        <Box>
                            <FormGroup>
                                {checkboxCertificaciones}
                            </FormGroup>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
            <Divider variant="midddle" />
        </>
    )
}

function InterfazBusqueda(props) {

    const { control, id } = props;

    const [checked, setChecked] = React.useState(true);
    const [protein, setProtein] = React.useState(
        {
            isVegetal: false,
            1: 2,
        }
    );
    const [omegas, setOmegas] = React.useState("");
    const [acidosGrasos, setAcidosGrasos] = React.useState([
        { nombre: "DHA", cantidad: 10 },
        { nombre: "EPA", cantidad: 10 }
    ]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleProtein = (event) => {
        const value = event.target.value;
        setProtein({
            ...protein,
            [event.target.name]: value
        });
    };

    const handleOmegas = (event, newOmegas) => {
        setOmegas(newOmegas);
    };

    const handleAcidosGrasos = (event) => {
        const value = event.target.value;
        setAcidosGrasos(
            {
                ...acidosGrasos,
                [event.target.name]: value
            }
        );
    };

    //Check name, is it really refering to hook?
    const sliderAminoacidos = listaAminoacidos.map((item) => <Grid item xs={12} sm={6} md={3} key={item.id}>
        <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{item.nombre}</Typography>
        <Controller name={"amino" + item.id} control={control} render={({ field: { onChange, value } }) => (
            <Slider key={"amino" + item.id} value={value} onChange={onChange} min={0} max={25} valueLabelDisplay="auto" />
        )}
        />
    </Grid>);

    const botonesOmegas = listaOmegas.map((item) => <ToggleButton value={item.tipo} key={item.id}><Chip label={item.numero} color={omegas.includes(item.tipo) ? "primary" : "secondary"} variant={omegas.includes(item.tipo) ? "filled" : "outlined"}></Chip></ToggleButton>);
    const sliderOmegas = listaAcidosGrasos.map((item) => <Grid item xs={12} md={6}>
        <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{item.nombre}</Typography>
        <Controller name={acidosGrasos.nombre} control={control} render={({ field: { onChange, value } }) => (
            <Slider key={acidosGrasos.nombre} value={value} onChange={onChange} min={0} max={250} step={10} valueLabelDisplay="auto" disabled={omegas.includes("Omega3") ? false : true} />
        )}
        />
    </Grid>);

    switch (id) {
        case '1':
            return (
                <>
                    <Stack direction="column" justifyContent="center" alignItems="center">
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
                    </Stack>
                    <Divider variant="middle" />
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Perfil de aminoacidos</Typography>
                    <Grid container orientation="row" rowSpacing={2} columnSpacing={5}>
                        {sliderAminoacidos}
                    </Grid>
                </>
            );
            break;
        case '2':
            return (
                <>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Origen</Typography>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Tooltip title="Animal">
                                <PhishingTwoToneIcon />
                            </Tooltip>
                            <Switch checked={checked} onChange={handleChange} />
                            <Tooltip title="Vegetal">
                                <LocalFloristTwoToneIcon />
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <Divider variant="middle" />
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Tipos de omegas</Typography>
                        <ToggleButtonGroup value={omegas} onChange={handleOmegas}>
                            {botonesOmegas}
                        </ToggleButtonGroup>
                    </Stack>
                    <Divider variant="middle" />
                    <Typography variant="h5" component="label" fontFamily="Lexend Deca" color="primary">Distribución de acidos grasos</Typography>
                    <Grid container spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
                        {sliderOmegas}
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

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            tipoSuplemento: 1,
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

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const pestanasSuplementos = tiposSuplemento.map((item) => <Tab value={item.id} label={item.tipo}></Tab>);
    const panelesSuplementos = tiposSuplemento.map((item) => <TabPanel value={item.id}><InterfazBusqueda id={item.id} control={control} /></TabPanel>)

    return (
        <>
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
            <br />
            <Box spacing={2}>
                <CamposComunes control={control} />
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example">
                            {pestanasSuplementos}
                        </TabList>
                    </Box>
                    {panelesSuplementos}
                </TabContext>
                <Divider variant="middle" />
            </Box>
            <br />
            <Button type="submit" variant='contained' endIcon={<SearchIcon />}>Buscar</Button>
        </>
    );
}
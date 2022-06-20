import * as React from 'react';
import { Box, Card, CardContent, Checkbox, Divider, FormGroup, FormControlLabel, Grid, Paper, Slider, Stack, Switch, Typography, Tab, FormLabel, Tooltip, ToggleButtonGroup, ToggleButton, Button, Badge, Chip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import EggAltTwoToneIcon from '@mui/icons-material/EggAltTwoTone';
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone';
import PhishingTwoToneIcon from '@mui/icons-material/PhishingTwoTone';

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

function CamposComunes() {
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
        <div>
            {/*Sliders*/}
            <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Tamaño de porción</Typography>
                    <Slider name="tamano" value={state.tamano} onChange={handleChange} valueLabelDisplay="auto" />
                </Box>
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Cantidad de porciones</Typography>
                    <Slider name="cantidad" value={state.cantidad} onChange={handleChange} valueLabelDisplay="auto" />
                </Box>
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Rango de precios</Typography>
                    <Slider name="precios" value={state.precios} onChange={handleChange} valueLabelDisplay="auto" />
                </Box>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Calorias por porcion</Typography>
                    <Slider name="calorias" value={state.calorias} onChange={handleChange} min={0} max={200} step={20} valueLabelDisplay="auto" />
                </Box>
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de proteina</Typography>
                    <Slider name="proteina" value={state.proteina} onChange={handleChange} min={0} max={Math.trunc((state.calorias) / 4)} valueLabelDisplay="auto" />
                </Box>
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de lipidos</Typography>
                    <Slider name="lipidos" value={state.lipidos} onChange={handleChange} min={0} max={Math.trunc((state.calorias) / 9)} valueLabelDisplay="auto" />
                </Box>
                <Box width={200}>
                    <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">Gramos de carbohidratos</Typography>
                    <Slider name="carbohidratos" value={state.carbohidratos} onChange={handleChange} min={0} max={Math.trunc((state.calorias) / 4)} valueLabelDisplay="auto" />
                </Box>
            </Stack>
            <Divider variant="middle" />

            {/*Checkboxes*/}
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} justifyContent="space-around">
                <Stack direction="column" alignItems="flex-start">
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Alergenos</Typography>
                    <Box>
                        <FormGroup>
                            {checkboxAlergenos}
                        </FormGroup>
                    </Box>
                </Stack>
                <Divider orientation='vertical' variant='middle' />
                <Stack direction="column" alignItems="flex-start">
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Certificaciones</Typography>
                    <Box>
                        <FormGroup>
                            {checkboxCertificaciones}
                        </FormGroup>
                    </Box>
                </Stack>
                <Divider orientation='vertical' variant='middle' />
                <Stack direction="column" alignItems="flex-start">
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Ingredientes</Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                        {checkboxIngredientes}
                    </Grid>
                </Stack>
                <Divider orientation='vertical' variant='middle' />
                <Stack direction="column" alignItems="flex-start">
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Presentación</Typography>
                    <Box>
                        <FormGroup>
                            {checkboxCertificaciones}
                        </FormGroup>
                    </Box>
                </Stack>
            </Stack>
            <Divider variant="midddle" />
        </div>
    )
}

function InterfazBusqueda(props) {
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
    const sliderAminoacidos = listaAminoacidos.map((value) => <Grid item xs={12} sm={6} md={3} key={value.id}>
        <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{value.nombre}</Typography>
        <Slider name={value.id} value={protein.cantidad} onChange={handleProtein} min={0} max={25} valueLabelDisplay="auto" />
    </Grid>);

    const botonesOmegas = listaOmegas.map((value) => <ToggleButton value={value.tipo} key={value.id}><Chip label={value.numero} color={omegas.includes(value.tipo) ? "primary" : "secondary"} variant={omegas.includes(value.tipo) ? "filled" : "outlined"}></Chip></ToggleButton>);
    const sliderOmegas = listaAcidosGrasos.map((item) => <Box width={200}>
        <Typography variant="p" noWrap component="div" fontFamily="Lexend Deca">{item.nombre}</Typography>
        <Slider name={acidosGrasos.nombre} value={acidosGrasos.cantidad} onChange={handleAcidosGrasos} min={0} max={250} step={10} valueLabelDisplay="auto" disabled={omegas.includes("Omega3") ? false : true} />
    </Box>);

    switch (props.id) {
        case '1':
            return (
                <div>
                    <CamposComunes />
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
                </div>
            );
            break;
        case '2':
            return (
                <div>
                    <CamposComunes />
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
                    <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Distribución de acidos grasos</Typography>
                    <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
                        {sliderOmegas}
                    </Stack>
                </div>
            );
            break;
        case '3':
            return (
                <div>
                    <CamposComunes />
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5" noWrap component="label" fontFamily="Lexend Deca" color="primary">Ingrdientes activos</Typography>
                        <SelectorPredictivo />
                    </Stack>
                </div>
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
    const panelesSuplementos = tiposSuplemento.map((item) => <TabPanel value={item.id}><InterfazBusqueda id={item.id} /></TabPanel>)

    return (
        <div>
            <Card>
                <Paper elevation={4} sx={{ backgroundColor: "beige" }}>
                    <CardContent>
                        <Typography variant="h3" noWrap component="div" fontFamily="Lexend Deca">
                            Buscador Avanzado
                        </Typography>
                        <Typography variant='p' component="div" color="GrayText">{descripcionActividad}</Typography>
                    </CardContent>
                </Paper>
            </Card>

            {/*https://mui.com/components/tabs/#basic-tabs*/}

            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example">
                            {pestanasSuplementos}
                        </TabList>
                    </Box>
                    {panelesSuplementos}
                </TabContext>
            </Box>
        </div>
    );
}
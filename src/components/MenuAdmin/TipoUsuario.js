import { CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, StyledEngineProvider } from '@mui/material';
import * as React from 'react';
import Service from '../../Service';

function TipoUsuario(props) {
    const [tipo, setTipo] = React.useState(props.usuario.tipoUsuarioID);
    const [comp, setComp] = React.useState(3);
    const [userTypes, setUserTypes] = React.useState([]);
    const [hasChanged, setHasChanged] = React.useState(false);

    const findTipo = (tipo) => {
        return tipo.tipoUsuarioID == props.usuario.tipoUsuarioID;
    }

    const changeValue = (value) => {
        for (let type of userTypes) {
            if (value === type.tipo)
                return type;
        }
    }

    const handleChange = (e) => {
        setTipo(changeValue(e.target.value));
        setHasChanged(true);
        props.toSave(true);
        return;
    }

    const persistData = () => {
        if (!hasChanged)
            return;
        else
            //HTTP PUT tipoUsuarioID -> props.usuario.usuarioID
            Service.postData("usuarios/update",
                {
                    ...props.usuario,
                    tipoUsuarioID: tipo.tipoUsuarioID
                }
            ).then((resp) => {
                console.log(resp);
                //Notificar usuario
            }).catch((err) => {
                console.error("Error: " + err);
                //Notificar usuario
            });
        setHasChanged(false);
        return;
    }

    React.useEffect(() => {
        //HTTP GET tipoUsuarioID & tipoUsuario.tipo
        if (props.forceChange)
            persistData();
        else
            setTimeout(async () => {
                await Service.getData('tipos_usuario/read').then((res) => {
                    setUserTypes(res.records);
                    setTipo(res.records.find(findTipo));
                }).then(() => setComp(1)).catch((err) => {
                    console.error(err);
                    setComp(2);
                })
                if (userTypes.length > 0)
                    setTipo(userTypes.find(findTipo));
            }, 3000)

    }, [props.forceChange]);

    switch (comp) {
        case 1:
            return (<FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                <InputLabel id="selector-tipo">Tipo usuario</InputLabel>
                <Select
                    labelId="selector-tipo"
                    id="selector-tipo"
                    value={tipo !== undefined ? tipo.tipo : props.usuario.tipoUsuarioID}
                    label="Tipo usuario"
                    onChange={handleChange}
                >
                    {userTypes.map(tipo => <MenuItem key={tipo.tipoUsuarioID} value={tipo.tipo}>{tipo.tipo}</MenuItem>)}
                </Select>
            </FormControl>)
        case 2:
            return (<FormControl sx={{ m: 1, minWidth: 90 }} size="small" disabled>
                <InputLabel id="error">Tipo usuario</InputLabel>
                <Select
                    labelId="error"
                    id="error"
                    value={props.usuario.tipoUsuarioID}
                    label="Tipo usuario"
                    onChange={handleChange}
                />
                <FormHelperText>Error al cargar</FormHelperText>
            </FormControl>)
        case 3:
            return <CircularProgress />
        default:
            return null;

    }
}

export default TipoUsuario;
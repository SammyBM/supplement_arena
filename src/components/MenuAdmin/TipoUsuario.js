import * as React from 'react';
import Service from '../../Service';

function TipoUsuario(props) {
    const [tipo, setTipo] = React.useState(props.usuario.tipoUsuarioID);
    const tiposUsuario = [];

    const handleChange = (e) => {
        let prevType = tipo;
        setTipo(e.target.value);

        //HTTP PUT tipoUsuarioID -> props.usuario.usuarioID
        Service.postData("usuarios/update",
            {
                ...props.usuario,
                tipoUsuarioID: tipo
            }
        ).then((resp) => {
            console.log("Se logró!!");
            //Notificar usuario
        }).catch((err) => {
            console.error("Error: " + err);
            setTipo(prevType);
            //Notificar usuario

        });
    }

    React.useEffect(() => {
        //HTTP GET tipoUsuarioID & tipoUsuario.tipo
        //Falta esta parte de API
    }, []);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="selector-tipo">Tipo usuario</InputLabel>
            <Select
                labelId="selector-tipo"
                id="selector-tipo"
                value={tipo}
                label="Tipo usuario"
                onChange={handleChange}
            >
                {tiposUsuario.map(tipo => <MenuItem value={tipo.id}>{tipo.valor}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default TipoUsuario;
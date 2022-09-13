import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import Service from '../../Service';
import SinResultados from '../Errores/SinResultados';

function PanelUsuarios() {
    const [usuarios, setUsuarios] = React.useState([]);
    var columnas = [{ label: "Nombre Usuario" }, { label: "Nombre Completo" }, { label: "Email" }, { label: "Tipo Usuario" }];

    React.useEffect(() => {
        Service.getData('usuarios/read').then((data) => {
            setUsuarios(data.records);
            columnas.map((columna) => {
                columna =
                {
                    ...columna,
                    id: columna.label.trim(),
                    disablePadding: false
                }
            })
        }).catch((err) => console.error(err));
    }, []);

    if (usuarios.length > 0) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {columnas.map((columna) => <TableCell key={columna.id} padding={columna.disablePadding ? 'none' : 'normal'}>{columna.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usuarios.map((usuario) =>
                            <TableRow>
                                <TableCell>{usuario.nombreUsuario}</TableCell>
                                <TableCell>{usuario.nombre + ' ' + usuario.apellido}</TableCell>
                                <TableCell>{usuario.correo}</TableCell>
                                <TableCell>{usuario.tipoUsuarioID}</TableCell>
                                {/* <TableCell><TipoUsuario usuario={usuario}/></TableCell> */}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

        );
    }
    else {
        return <SinResultados />;
    }
}

export default PanelUsuarios;
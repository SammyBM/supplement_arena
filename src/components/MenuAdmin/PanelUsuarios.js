import { Container, Fab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import * as React from 'react';
import Service from '../../Service';
import SinResultados from '../Errores/SinResultados';
import TipoUsuario from './TipoUsuario';

function PanelUsuarios() {
    const [usuarios, setUsuarios] = React.useState([]);
    const [hasChanges, setHasChanges] = React.useState(false);
    const [forceChange, setForceChange] = React.useState(false);

    const MAX_WIDTH = "md";
    const FAB_STYLE = {
        display: { xs: hasChanges ? "block" : "none" },
        position: 'sticky',
        bottom: 20,
        right: 20,
    };
    var columnas = [{ label: "Nombre Usuario" }, { label: "Nombre Completo" }, { label: "Email" }, { label: "Tipo Usuario" }];

    const handleChildrenState = () => {
        console.log(hasChanges);
        for (let usr of usuarios) {
            if (hasChanges) {
                setForceChange(true);
            }
            else
                setForceChange(false);

        }
        setHasChanges(false);
    }

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
            <>
                <Container maxWidth={MAX_WIDTH}>
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
                                        <TableCell><TipoUsuario usuario={usuario} toSave={setHasChanges} forceChange={forceChange} /></TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </Container>
                <Fab sx={FAB_STYLE} color="primary" aria-label='guardar' onClick={handleChildrenState}>
                    <SaveIcon />
                </Fab>
            </>

        );
    }
    else {
        return <SinResultados />;
    }
}

export default PanelUsuarios;
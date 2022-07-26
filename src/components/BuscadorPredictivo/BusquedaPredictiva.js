import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Service from '../../Service';
import { IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const filter = createFilterOptions();

export default function BusquedaPredictiva() {
    const [value, setValue] = React.useState(null);
    let options = [];

    React.useEffect(() => {
        Service.getData("articulos/read").then((data) => {
            options = data.records;
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            options.forEach((option) => pruebaSuplementos.push(option));
        });
    }, []);

    return (
        <>
            <Stack direction="row">
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                nombre: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                nombre: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.nombre);

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="buscador-predictivo"
                    options={pruebaSuplementos}
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
                        return option.titulo;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.titulo}</li>}
                    sx={{ width: 300 }}
                    freeSolo
                    size="small"
                    renderInput={(params) => (
                        <TextField {...params} variant="filled" color='primary' label="Buscar suplementos" />
                    )}
                />
                <IconButton onClick={() => abrirResultado(value)}><SearchIcon /></IconButton>
            </Stack>
        </>
    );
}

const pruebaSuplementos = [];

function abrirResultado(articulo) {
    sessionStorage.setItem("props", JSON.stringify(articulo));
    Service.changePage("visualizador");
}

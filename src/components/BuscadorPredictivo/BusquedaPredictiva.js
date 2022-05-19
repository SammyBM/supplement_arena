import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function BusquedaPredictiva() {
    const [value, setValue] = React.useState(null);

    return (
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
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        nombre: `Add "${inputValue}"`,
                    });
                }

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
                return option.nombre;
            }}
            renderOption={(props, option) => <li {...props}>{option.nombre}</li>}
            sx={{ width: 300 }}
            freeSolo
            size="small"
            renderInput={(params) => (
                <TextField {...params} variant="filled" color='primary' label="Buscar suplementos" />
            )}
        />
    );
}

const pruebaSuplementos = [
    { nombre: "Gold Standard Whey", lab: "Optimum Nutrition" },
    { nombre: "Nitro Tech", lab: "Muscletech" },
    { nombre: "Elite 100% Whey", lab: "Dymatize" },
    { nombre: "Iso 100", lab: "Dymatize" },
    { nombre: "Serious Mass", lab: "Optimum Nutrition" },
    { nombre: "Zeus 100% Whey", lab: "MDN Labs" },
    { nombre: "Gods Whey Protein", lab: "Gods Nutrition" }
];
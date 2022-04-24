import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const listaIngredientes = [
    'Calcio',
    'CBD',
    'Creatina',
    'Creatinina',
    'Hierro',
    'Vitamina A',
    'Vitamina B1',
    'Vitamina B6',
    'Vitamina B12',
    'Magnesio',
    'Manganeso',
    'Zinc'
];

function getStyles(name, ingrediente, theme) {
    return {
        fontWeight:
            ingrediente.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function SelectorPredictivo() {
    const theme = useTheme();
    const [ingrediente, setIngrediente] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setIngrediente(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Ingrediente activo</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={ingrediente}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {listaIngredientes.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, ingrediente, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

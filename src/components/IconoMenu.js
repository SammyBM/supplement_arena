import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';


export default function IconoMenu(props) {
    switch (props.id) {
        case "buscadorAvanzado":
            return <ManageSearchIcon sx={{ color: "#6C6960" }} />;
            break;
        case "buscadorSimple":
            return <SearchIcon sx={{ color: "#6C6960" }} />;
            break;
        case "editor":
            return <EditIcon sx={{ color: "#6C6960" }} />;
            break;
        case "novedades":
            return <NewspaperIcon sx={{ color: "#6C6960" }} />;
            break;
        case "reportes":
            return <SummarizeIcon sx={{ color: "#6C6960" }} />;
            break;
        default:
            return <ErrorIcon sx={{ color: "#6C6960" }} />;
            break;
    }
}
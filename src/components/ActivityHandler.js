import * as React from 'react';
import LandingPage from "./LandingPage";
import Login from './Login';
import EditorArticulos from './EditorArticulos';
import CentroNovedades from './CentroNovedades';
import RegistroUsuario from './RegistroUsuario';
import BuscadorAvanzado from './BuscadorAvanzado';
import CentroReportes from './CentroReportes';
import BuscadorSimple from './BuscadorSimple';
import VisualizadorArticulos from './VisualizadorArticulos';
import ResultadosBusqueda from './ResultadosBusqueda/ResultadosBusqueda';


export default function ActivityHandler(props) {
    switch (props.activity) {
        case "landing":
            return <LandingPage />;
            break;
        case "login":
            return <Login funcionMenu={props.funcionMenu} /> //En progreso
            break;
        case "registro":
            return <RegistroUsuario funcionMenu={props.funcionMenu} />; //Falta
            break;
        case "buscadorAvanzado":
            return <BuscadorAvanzado funcionMenu={props.funcionMenu} />; //Falta
            break;
        case "buscadorSimple":
            return <BuscadorSimple />;
            break;
        case "resultados":
            return <ResultadosBusqueda funcionMenu={props.funcionMenu} />;
            break;
        case "editor":
            return <EditorArticulos />; //Falta
            break;
        case "visualizador":
            return <VisualizadorArticulos />;
            break;
        case "novedades":
            return <CentroNovedades />; //Falta
            break;
        case "reportes":
            return <CentroReportes />; //Falta
            break;
        default:
            return <h1>holo</h1>;
            break;
    }
}
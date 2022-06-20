import * as React from 'react';
import LandingPage from "./LandingPage/LandingPage";
import Login from './MenuUsuario/Login';
import EditorArticulos from './EditorArticulos/EditorArticulos';
import CentroNovedades from './Novedades/CentroNovedades';
import RegistroUsuario from './MenuUsuario/RegistroUsuario';
import BuscadorAvanzado from './BuscadorAvanzado/BuscadorAvanzado';
import CentroReportes from './Reportes/CentroReportes';
import BuscadorSimple from './BuscadorSimple/BuscadorSimple';
import VisualizadorArticulos from './VisualizadorArticulos/VisualizadorArticulos';
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
            return <BuscadorSimple funcionMenu={props.funcionMenu} />;
            break;
        case "resultados":
            return <ResultadosBusqueda funcionMenu={props.funcionMenu} resultados={props.resultados === null ? undefined : props.resultados} />; //Falta }/>;
            break;
        case "editor":
            return <EditorArticulos articulo={props.articulo === null ? undefined : props.articulo} />; //Falta
            break;
        case "visualizador":
            return <VisualizadorArticulos articulo={props.articulo === null ? undefined : props.articulo} />;
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
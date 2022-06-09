import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import { themeOptions } from './Theme';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { ApiProvider } from './contexts/ApiContext';
import { UserProvider } from './contexts/UserContext';

const theme = createTheme(themeOptions);

//const api = "http://localhost/xampp/api_rest/";
const api = "http://localhost/api/";

function App() {

  const [user, setUser] = React.useState({
    usuarioID: "",
    tipoUsuarioID: "",
    nombre: "",
    nombreUsuario: "",
    fechaNacimiento: ""
  });
  const usuario = { user, setUser };

  const [loggedIn, setLoggedIn] = React.useState(true);

  /*
  {
    credentials: "unlogged" / "logged" / "mod" / "admin"
    username: ""
  }
  */

  const logIn = () => {
    setLoggedIn = !loggedIn;
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ApiProvider value={api}>
          <UserProvider value={usuario}>
            <MenuDrawer login={loggedIn} actividad="landing">
            </MenuDrawer>
          </UserProvider>
        </ApiProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

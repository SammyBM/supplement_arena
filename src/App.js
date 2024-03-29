import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import { themeOptions } from './Theme';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { ApiProvider } from './contexts/ApiContext';
import { UserProvider } from './contexts/UserContext';
import { ROUTES } from './constantes';

const theme = createTheme(themeOptions);

const api = ROUTES.API_ROUTE;
//const api = "http://localhost/api/";

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [user, setUser] = React.useState({
    usuarioID: "",
    tipoUsuarioID: 1,
    nombre: "",
    nombreUsuario: "",
    fechaNacimiento: ""
  });
  const usuario = { user, setUser };

  /*
  {
    credentials: "unlogged" / "logged" / "mod" / "admin"
    username: ""
  }
  */

  const logIn = () => {
    setLoggedIn = !loggedIn;
  };

  let cors = require('cors')

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ApiProvider value={api}>
          <UserProvider value={usuario}>
            <MenuDrawer >
            </MenuDrawer>
          </UserProvider>
        </ApiProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;

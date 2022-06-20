import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import { themeOptions } from './Theme';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

const theme = createTheme(themeOptions);

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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ApiProvider value={api}>
          <UserProvider value={usuario}>
            <MenuDrawer  actividad="landing">
              
            </MenuDrawer>
          </UserProvider>
        </ApiProvider>
      </ThemeProvider>

    </div>
  );
}
function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}
export default App;

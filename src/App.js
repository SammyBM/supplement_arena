import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import { themeOptions } from './Theme';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { ApiProvider } from './components/ApiContext';

const theme = createTheme(themeOptions);

const api = "http://localhost/xampp/api_rest/";
//const api = "http://localhost/api";

function App() {

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
          <MenuDrawer login={loggedIn} actividad="landing">
            <h1>hi</h1>
          </MenuDrawer>
        </ApiProvider>
      </ThemeProvider>

    </div>
  );
}

export default App;

import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/MenuDrawer';
import MenuDrawer from './components/MenuDrawer';
import { themeOptions } from './Theme';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

const theme = createTheme(themeOptions);

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
        <MenuDrawer login={loggedIn} actividad="landing">
          <h1>hi</h1>
        </MenuDrawer>
      </ThemeProvider>

    </div>
  );
}

export default App;

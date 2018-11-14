import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login";
import Tasks from './containers/Tasks';
import store from './store';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#f5a730',
      dark: '#424242'
    },
    secondary: {
      main: '#424242',
    },
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path="/Login" component={Login} />
              <Route path="/" component={Tasks}/>
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
export default App;

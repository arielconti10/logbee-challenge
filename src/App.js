import React, { Component } from 'react';
import './App.css';
import Login from "./containers/Login";
import Tasks from './containers/Tasks';
import store from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f5a730',
    },
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <BrowserRouter>
              <Switch>
                <Route path="/Login" component={Login} />
                <Route path="/" component={Tasks}/>
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

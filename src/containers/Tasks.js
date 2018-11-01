import React, {Component} from 'react';
import '../App.css';
import {AppBar, Toolbar, Grid, Button, Paper} from '@material-ui/core';
import bee from '../bee.svg';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';
import { connect } from 'react-redux';
import { fetchUser, fetchTasks, logout } from '../actions/index';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Map from '../components/Map';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Tasks extends Component {
  state = {
    completed: 0,
    buffer: 10,

  };

  componentWillMount() {
    this.props.fetchTasks();
    this.props.fetchUser();
    if (this.props.user.loading === false && this.props.user.email === undefined) {
      this.props.history.replace('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loading === false && nextProps.user.email === undefined) {
      this.props.history.replace('/login');
    }
  }

  render(){
    return(
      <React.Fragment>
        <CssBaseline/>

        {this.props.user.loading ? <LinearProgress /> :
          <main>
            <AppBar color='dark' position="static">
              <Toolbar>
                <Grid
                  justify="space-between" // Add it here :)
                  container
                  spacing={24}
                >
                  <Grid item>
                    <img src={bee} alt='logo-bee' width='35' />
                  </Grid>
                  <Grid item>
                    <Button variant='contained' color="primary" onClick={() => {
                      this.props.logout();
                    }}>Sair</Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
              <Grid>
                <Grid item xs='9'>
                  <Map
                    viewport={this.state.viewport}
                    tasks={this.props.tasks ? this.props.tasks : ''}
                    navStyle={navStyle}
                  />
                </Grid>
              </Grid>
          </main>
        }
        </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    tasks: state.tasks,
  };
}

export default withStyles(styles)(connect(mapStateToProps, {fetchUser, fetchTasks, logout})(Tasks));
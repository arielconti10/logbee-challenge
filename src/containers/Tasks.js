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
import {TOKEN} from '../config/mapbox';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import TaskPin from '../components/task-pin'
import TaskInfo from '../components/task-info'

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
    viewport: {
      latitude: -23.5489,
      longitude: -46.6388,
      zoom: 10,
    },
    popupInfo: null
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

  _updateViewport = (viewport) => {
    this.setState({viewport});
  };

  _renderTaskMarker = (task, index) => {
    return (
      <Marker key={`marker-${index}`}
              longitude={task[1].longitude}
              latitude={task[1].latitude} >
        <TaskPin size={20} onClick={() => this.setState({popupInfo: task[1]})} />
      </Marker>
    );
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={5}
             anchor="top"
             longitude={popupInfo.longitude}
             latitude={popupInfo.latitude}
             onClose={() => this.setState({popupInfo: null})} >
        <TaskInfo info={popupInfo} />
      </Popup>
    );
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
                  <MapGL
                    {...this.state.viewport}
                    mapboxApiAccessToken={TOKEN}
                    width="100vw"
                    height="92vh"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this._updateViewport}
                  >
                    { this.props.tasks ? Object.entries(this.props.tasks).map(this._renderTaskMarker) : ''}
                    {this._renderPopup()}

                    <div className="nav" style={navStyle}>
                      <NavigationControl onViewportChange={this._updateViewport} />
                    </div>

                  </MapGL>
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
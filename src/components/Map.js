import React, {Component} from 'react'
import {TOKEN} from '../config/mapbox';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import TaskPin from '../components/task-pin'
import TaskInfo from '../components/task-info'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

export default class Map extends Component {
  state = {
    popupInfo: null,
    viewport: {
      latitude: -23.5489,
      longitude: -46.6388,
      zoom: 10,
    },
  };

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
  _renderTaskItem = (task, index) => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <List key={index}>
        <ListItemText
          dense="true"
          primary={task[1].name}
          aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          onClick={this._renderPopOver} />

        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {task[1].name}
        </Popover>
      </List>
    )
  };
  render() {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <MapGL
              {...this.state.viewport}
              mapboxApiAccessToken={TOKEN}
              width="100vw"
              height="100vh"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={this._updateViewport}
            >
              { this.props.tasks ? Object.entries(this.props.tasks).map(this._renderTaskMarker) : ''}
              {this._renderPopup()}

              <div className="nav" style={this.props.navStyle}>
                <NavigationControl onViewportChange={this._updateViewport} />
              </div>

            </MapGL>
          </Grid>
        </Grid>
      </div>
    );
  }

}
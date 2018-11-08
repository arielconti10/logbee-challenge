import React, {Component} from 'react'
import {TOKEN} from '../config/mapbox';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import TaskPin from '../components/task-pin'
import TaskInfo from '../components/task-info'


export default class Map extends Component {
  state = {
    popupInfo: null,
    viewport: {
      latitude: -23.590287439384415,
      longitude: -46.63539966201029,
      zoom: 11,
      bearing: 0,
      pitch: 0,
      completed: 0,
      buffer: 10,
    },
  };

  _updateViewport = (viewport) => {
    this.setState({viewport});
  };
  _renderTaskMarker = (task, index) => {
    return (
      <Marker key={`marker-${index}`}
              longitude={task[1].longitude}
              latitude={task[1].latitude}>
        <TaskPin size={20} onClick={() => this.setState({popupInfo: task[1]})}/>
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
             onClose={() => this.setState({popupInfo: null})}>
        <TaskInfo info={popupInfo}/>
      </Popup>
    );
  }


  render() {
    return (
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={TOKEN}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
        >
          {this.props.tasks ? Object.entries(this.props.tasks).map(this._renderTaskMarker) : ''}
          {this._renderPopup()}
          <div className="nav" style={this.props.navStyle}>
            <NavigationControl onViewportChange={this._updateViewport}/>
          </div>
        </MapGL>
    );
  }

}
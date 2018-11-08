import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskInfo from '../components/task-info'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';
import {Popup} from "react-map-gl";

class TaskList extends Component{
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      popOverInfo: null,
    }
  }

  _renderTaskItem = (task, index) => {
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
      <List key={index}>
        <ListItemText
          dense="true"
          primary={task[1].name}
          aria-owns={open ? 'simple-popper' : null}
          aria-haspopup="true"
          onClick={(event) => this.setState({anchorEl: event.currentTarget, popOverInfo: task[1]})}/>

      </List>
    )
  };

  _renderPopOver = () => {

    const {anchorEl} = this.state;
    const {popOverInfo} = this.state;
    const open = Boolean(anchorEl);
    return popOverInfo &&(
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popOverInfo.longitude}
        latitude={popOverInfo.latitude}
        onClose={() => this.setState({popOverInfo: null})}
      >
        <TaskInfo info={popOverInfo}/>
      </Popup>
    )
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render (){
    return (
      <List>
        { Object.entries(this.props.tasks).map(this._renderTaskItem) }
        { this._renderPopOver() }
      </List>
    )
  }
}

export default withStyles(styles)(TaskList)
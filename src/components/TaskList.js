import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskInfo from '../components/task-info'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover';
import styles from '../styles';
import { Popup } from "react-map-gl";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      popOverInfo: null,
    }
  }

  _renderTaskItem = (item, index) => {
    return (
      <div key={index}>
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography >{item[1].name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TaskInfo info={item[1]} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  };


  render() {
    return (
      <List>
        {
            this.props.tasks.map((item, key) => 
              this._renderTaskItem(item, key)              
            )
        }
      </List>
    )
  }
}

export default withStyles(styles)(TaskList)
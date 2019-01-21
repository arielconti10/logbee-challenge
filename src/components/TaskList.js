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

  _renderTaskItem = (task, index) => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div key={index}>


      </div>

      // <List key={index}>
      //   <ListItemText
      //     dense="true"
      //     primary={task[1].name}
      //     aria-owns={open ? 'simple-popper' : null}
      //     aria-haspopup="true"
      //     onClick={(event) => this.setState({ anchorEl: event.currentTarget, popOverInfo: task[1] })} />
      // </List>
    )
  };

  _renderPopOver = () => {
    const { anchorEl } = this.state;
    const { popOverInfo } = this.state;
    const open = Boolean(anchorEl);
    return popOverInfo && (
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => this.setState({ popOverInfo: null, anchorEl: null })}
      >
        <TaskInfo info={popOverInfo} />
      </Popover>
    )
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
      <List>
        {
          !this.props.tasks.filtered ?
            Object.entries(this.props.tasks.list).map((item, key) => 
              <ExpansionPanel key={key}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography >{item[1].name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TaskInfo info={item[1]} />
                </ExpansionPanelDetails>
                {/* {
            !this.props.tasks.filtered
              ? Object.entries(this.props.tasks.list).map(this._renderTaskItem)
              : Object.entries(this.props.tasks.filtered).map(this._renderTaskItem)
          } */}
              </ExpansionPanel>
            
            )
            : ''
        }
        {/* {this._renderPopOver()} */}
      </List>
    )
  }
}

export default withStyles(styles)(TaskList)
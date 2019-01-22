import React, { Component } from 'react';
import '../App.css';
import { AppBar, Toolbar, Grid, Button, Paper, LinearProgress } from '@material-ui/core';
import bee from '../bee.svg';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';
import { connect } from 'react-redux';
import { fetchUser, fetchTasks, logout, searchTask } from '../actions/index';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Map from '../components/Map';
import TaskList from '../components/TaskList';
import FilterForm from '../components/FilterForm';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      buffer: 10,
      taskFilter: "",
      tasks:[],
    };

    this._filterTasks = this._filterTasks.bind(this);
  }

  _filterTasks(taskFilter) {
    let filteredTasks = this.state.tasks;
    filteredTasks = filteredTasks.filter((task) => {
      let taskName = task[1].name;
      return taskName.indexOf(taskFilter) !== -1 
    });
    
    this.setState({filteredTasks});
    
  }


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

    if (nextProps.tasks.list) {
      let tasks = Object.entries(nextProps.tasks.list).map((task) => {
        return task;
      })

      return this.setState({
        tasks: tasks
      });
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        {this.props.user.loading ? <LinearProgress /> :
          <main>
            <AppBar color='secondary' position="static">
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
            <Paper>
              {
                this.props.tasks.list !== undefined && Object.keys(this.props.tasks.list).length > 1 ?
                  <Grid container spacing={16}>
                    <Grid item xs={9}>
                      <Map
                        tasks={this.props.tasks.list ? this.props.tasks.list : ''}
                        navStyle={navStyle}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FilterForm onChange={this._filterTasks}/>
                      <TaskList tasks={
                        this.state.filteredTasks ? this.state.filteredTasks 
                        : (this.state.tasks ? this.state.tasks : '')} 
                      />
                    </Grid>
                  </Grid>
                  : <LinearProgress />
              }
            </Paper>
          </main>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    tasks: state.tasks,
  };
}

export default withStyles(styles)(connect(mapStateToProps, { fetchUser, fetchTasks, logout, searchTask })(Tasks));
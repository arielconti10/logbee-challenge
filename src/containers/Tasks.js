import React, {Component} from 'react';
import '../App.css';
import {AppBar, Toolbar, Grid, Button} from '@material-ui/core';
import bee from '../bee.svg';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import styles from '../styles';
import { connect } from 'react-redux';
import { fetchUser, logout } from '../actions/index';
class Tasks extends Component {

  componentWillMount() {
    // this.props.getPosts();
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
    const {classes} = this.props;
    return(
      <React.Fragment>
        <AppBar color='dark' position="static">
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <img src={bee} width={35} />
              </Grid>
              <Grid item>
                <Button variant='contained' color="primary" className={classes.grow}>Sair</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {user: state.user};
}

export default withStyles(styles)(connect(mapStateToProps, {fetchUser, logout})(Tasks));
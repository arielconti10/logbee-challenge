import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles';
import logo from '../logo-light.png';
import {login, fetchUser} from '../actions/index';
import {connect} from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password)
      .catch(err => {
      this.setState({
        error: err
      });
    });

  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.layout}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <img width='200' alt='logo' src={logo}/>
          <form onSubmit={event => { this.submitLogin(event);}} className={classes.form}>
            <FormControl error={!!this.state.error} margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email" name="email" autoComplete="email" autoFocus  onChange={(event) => this.setState({ email: event.target.value })}/>
              {this.state.error ? <FormHelperText id="component-error-text">{this.state.error.message}</FormHelperText> : ''}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => this.setState({ password: event.target.value })}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user};
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, {login, fetchUser})(Login));
import React, { Component } from 'react'
import { InputLabel, Input, InputAdornment, FormControl } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class filterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskFilter: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      taskFilter: e.target.value
    })

    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <FormControl >
        <InputLabel htmlFor="input-with-icon-adornment">Pesquisar</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          value={this.state.taskFilter} 
          onChange={this.handleChange} /> 
      </FormControl>
    )
  }
}

export default filterForm
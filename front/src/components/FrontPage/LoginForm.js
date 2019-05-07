import React, {Component, useState} from 'react';
import { Link, withRouter} from 'react-router-dom';
import {Button, Input, FormControl, TextField, Grid, InputLabel, InputAdornment} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleChange(event) {
    console.log('user was changed', event.value);
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    console.log('password was changed', event.value);
    this.setState({password: event.target.value});
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    event.preventDefault();

    const url = 'http://media.mw.metropolia.fi/wbma/login';
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

    console.log('Login is successful.', data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    }).
        then(res => res.json()).
        catch(error => console.error('Error:', error)).
        then(response => {
          console.log('Success', response);
          window.localStorage.setItem('token', response.token);
          console.log(window.localStorage.getItem('token'));
        });

    if (localStorage.user !== 'undefined') {
      console.log(window.localStorage.getItem('token'));

    } else {
      console.log('error');
    }
  };

  render() {

    if (!this.props.show) {
      return null;
    }

    return (
        <form onSubmit={this.handleSubmit}>

          <div className="modal">
            {this.props.children}
              <TextField
                  variant="outlined"
                  type="text"
                  label="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  style={{
                    marginTop: 15,
                    marginLeft: 5,
                    width: "100%",
                  }}
              />

              <TextField
                  variant="outlined"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  style={{
                    marginTop: "15px",
                    marginLeft: "5px",
                    width: "100%",
                  }}
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    ),
                  }}
              />
            <hr/>
              <Button type={"submit"} variant={"contained"}
                      style={{
                        borderRadius: "35px",
                        backgroundColor: "lightslategrey",
                        padding: "15px 20px",
                        fontSize: "20px",
                        width: "125px",
                        margin: "25px 0 5px 62%"
                      }}
                      >Sign In</Button>

            <Button variant={"contained"}
                    style={{
                      borderRadius: "35px",
                      margin: "-105px 0 0 0",
                      width: "125px",
                      padding: "15px 15px",
                      fontSize: "20px",
                    }}
                    className="close"
                    onClick={this.props.onClose}>
              Close
            </Button>


          </div>
          </form>

    );

  }
}


export default withRouter(LoginForm);

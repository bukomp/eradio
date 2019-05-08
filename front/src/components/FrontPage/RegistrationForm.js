import React, { Component } from 'react';
import {Button, TextField, InputAdornment} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      showPassword: false,
      checked: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleChange(event) {
    console.log('email was changed', event.target.value);
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    console.log('password was changed', event.target.value);
    this.setState({password: event.target.value});
  }

  handleEmailChange(event) {
    console.log('email was changed', event.target.value);
    this.setState({email: event.target.value});
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const url = 'http://media.mw.metropolia.fi/wbma/users';
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    console.log('form is submitted.', data);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    }).
        then(res => res.json()).
        catch(error => console.error('Error:', error)).
        then(response => console.log('Success', response));
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    const { checked } = this.state;

    return (

        <form onSubmit={this.handleSubmit}>
          <div className="modal">
            {this.props.children}

            <p>Like..listen..enjoy and register</p>

              <TextField
                  variant="outlined"
                  label="Username"
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  style={{
                    marginTop: "15px",
                    marginLeft: "5px",
                    width: "97%"
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
                    width: "97%"
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


              <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  style={{
                    marginTop: "15px",
                    marginLeft: "5px",
                    width: "97%"
                  }}
              />
<hr/>
              <Button type={"submit"} variant={"contained"}
                      style={{
                        borderRadius: 35,
                        backgroundColor: "lightslategrey",
                        padding: "14px 20px",
                        fontSize: "20px",
                        width: "130px",
                        margin: "25px 0 0 62%"
                      }}>Save</Button>

            <Button
                variant={"contained"}
                style={{
                  borderRadius: "35px",
                  margin: "-90px 0 0 0",
                  width: "125px",
                  padding: "15px 20px",
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

export default RegistrationForm;

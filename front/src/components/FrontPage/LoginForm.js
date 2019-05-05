import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core';


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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

          <div className="modal">
            {this.props.children}
            <Button variant={"contained"}
                    style={{
                      borderRadius: 35,
                      margin: "0 0 30px 85%"
                    }}
                    className="close"
                    onClick={this.props.onClose}>
              X
            </Button>

            <form onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  required
              />
              <Button variant={"contained"}
                      style={{
                        borderRadius: 35,
                        backgroundColor: "lightslategrey",
                        padding: "14px 20px",
                        fontSize: "18px",
                        width: "130px",
                        margin: "25px 0 5px 55%"
                      }}
                      className="submit" type="submit">Sign In</Button>

            </form>

          </div>



    );

  }
}

export default withRouter(LoginForm);

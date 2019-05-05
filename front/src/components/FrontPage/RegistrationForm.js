import React, { Component } from 'react';
import {Button} from '@material-ui/core';


class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
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


    return (
        <React.Fragment>
          <div className="modal">
            {this.props.children}
            <Button
                variant={"contained"}
                style={{
                  borderRadius: 35,
                  margin: "0 0 30px 85%"
                }}
                className="close"
                onClick={this.props.onClose}>
              X
            </Button>
            <p>Like..listen..enjoy and register</p>

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
              <input
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  required
              />

              <Button variant={"contained"}
                      style={{
                        borderRadius: 35,
                        backgroundColor: "lightslategrey",
                        padding: "14px 20px",
                        fontSize: "18px",
                        width: "150px",
                        margin: "25px 0 5px 60%"
                      }}>Save</Button>

            </form>

          </div>

        </React.Fragment>

    );
  }
}

export default RegistrationForm;

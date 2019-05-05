import React, { Component } from 'react';

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
            <button
                onClick={this.props.onClose}>
              X
            </button>

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

              <button>Save</button>

            </form>

          </div>

        </React.Fragment>

    );
  }
}

export default RegistrationForm;

import React, { Component } from 'react';
import './style.css'

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
        this.setState({password:event.target.value});
      }

      handleSubmit = event => {
        event.preventDefault();
        const url = "http://media.mw.metropolia.fi/wbma/login";
        const data = {username: this.state.username, password: this.state.password, email: this.state.email};
        console.log('Login is successful.', data);
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success', response);
          window.localStorage.setItem('token',response.token);
          console.log(window.localStorage.getItem('token'));

        });

        if (localStorage.user !== "undefined") {
          console.log(window.localStorage.getItem('token'));

        } else {
          console.log('error');
        }
      };




      render(){
        return(
            <div className="center">
              <div className="card">
                <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
              />
              <button>Login</button>
            </form>
              </div>
            </div>
        )
      }
    }

export default LoginForm;

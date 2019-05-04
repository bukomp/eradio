import React, { Component } from 'react';
import { Link} from 'react-router-dom';
class FrontOffice extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    const modalStyle = {
      backgroundColor: 'whitesmoke',
      borderRadius: 5,
      borderColor: "black",
      borderStyle: "solid",
      maxWidth: 400,
      minHeight: 300,
      marginLeft: 650,
      marginTop: 0,
      padding: 15
    };

    return(
      <div>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <button className="close"
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
            <button type="submit">Sign In</button>

          </form>
          <Link to="/register">

            <p>Be an active listener. Register here.</p>

          </Link>

        </div>

      </div>
    );
  }
}

export default FrontOffice;
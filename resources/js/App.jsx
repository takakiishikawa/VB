import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  logout = () => {
    axios.post('/logout',{},{
      withCredentials: true
    }).then(response => {
      window.location.href = '/login';
    }
    ).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>Page Title</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default App;

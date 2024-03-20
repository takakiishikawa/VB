import React, { Component } from 'react';
import axios from 'axios';
import MajorSegment from './major-segment';

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
        <MajorSegment />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import PatientViewer from'./containers/PatientViewer'
import DoctorViewer from'./containers/DoctorViewer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <PatientViewer/>
      </div>
    );
  }
}

export default App;

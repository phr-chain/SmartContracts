import React, { Component } from 'react';

import PatientViewer from'./containers/PatientViewer'
import LoginViewer from './containers/LoginViewer'


class App extends Component {
  loginView = 0;
  dashBoardView = 1;

  constructor() {
    super();
    this.state = {
      privateKey: '',
      publicKey: '',
      currentView: this.loginView,
    }
  }
  render() {
    if (this.state.currentView == this.loginView) {
      return (
        <LoginViewer
          privateKey={this.state.privateKey}
          publicKey={this.state.publicKey}
          onPrivateKeyChanged={key => this.setState({ privateKey: key })}
          onPublicKeyChanged={key => this.setState({ publicKey: key })}
          onLogin={() => this.setState({ currentView: this.dashBoardView })}
        />
      );
    } else if (this.state.logincurrentView == this.dashBoardView) {

      return (
        <PatientViewer/>
      );
    } else {
      return <div></div>
    }

  }
}

export default App;

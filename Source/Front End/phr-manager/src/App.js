import React, { Component } from 'react';

//import PatientViewer from'./containers/PatientViewer'
import LoginViewer from'./containers/LoginViewer'


class App extends Component {
  constructor(){
    super();
    this.state = {
      privateKey:'',
      publicKey: ''
    }
  }
  render() {
    return (
        <LoginViewer
         privateKey={this.state.privateKey}
         publicKey = {this.state.publicKey}
         onPrivateKeyChanged = {key => this.setState({privateKey: key})}
         onPublicKeyChanged = {key => this.setState({publicKey: key})}
         />
    );
  }
}

export default App;

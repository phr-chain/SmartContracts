import React, { Component } from 'react';
import { Row, Col, Button } from 'antd'
import 'antd/lib/button/style/css';
var ipfsAPI = require('ipfs-api')

class PatientViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ipfsURL: ''
        };
    }

    uploadFile = (e) => {
        var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'}) 

    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(e.target.files[0]);
  //  var fileData = fileReader.result;

    fileReader.onload =  () => {
      var data = fileReader.result
      var buffer = Buffer.from(data)
      var content = []
      content.push({
        path: "file 1",
        content: buffer
      })

      ipfs.files.add(content, (err, res) => {
        this.setState({ipfsURL:`https://gateway.ipfs.io/ipfs/${res[0].hash}`, fileName:res[0].path});
        
      });
    }

    }
    render() {
        return (
            <Row >
                <Col>
                    <input type="file" onChange={this.uploadFile} />
                    
                </Col>
                <div>
                    <a href={this.state.ipfsURL}>{this.state.fileName}</a>
                    </div>
            </Row>
        );
    }
}

export default PatientViewer;